import React, { useState } from 'react'
import BookCard from './BookCard'
import { BookOpen, Filter, SortAsc, SortDesc, Grid, List } from 'lucide-react'

const BookResults = ({ books, onClear, hasResults, isFavorite, onToggleFavorite }) => {
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('relevance')
  const [sortOrder, setSortOrder] = useState('desc')

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  const getSortedBooks = () => {
    if (!books.length) return []

    return [...books].sort((a, b) => {
      let aValue, bValue

      switch (sortBy) {
        case 'title':
          aValue = a.title?.toLowerCase() || ''
          bValue = b.title?.toLowerCase() || ''
          break
        case 'author':
          aValue = a.author_name?.[0]?.toLowerCase() || ''
          bValue = b.author_name?.[0]?.toLowerCase() || ''
          break
        case 'year':
          aValue = a.first_publish_year || 0
          bValue = b.first_publish_year || 0
          break
        default:
          return 0
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
  }

  const sortedBooks = getSortedBooks()

  if (!hasResults) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-bold text-gray-700 mb-2">
          No books found
        </h3>
        <p className="text-gray-600 mb-6">
          Try adjusting your search terms or filters to find more results.
        </p>
        <button
          onClick={onClear}
          className="btn-primary"
        >
          Start New Search
        </button>
      </div>
    )
  }

  return (
    <section className="space-y-6">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <BookOpen className="h-6 w-6 text-primary-600" />
          <h3 className="text-2xl font-bold text-gray-800">
            Search Results
          </h3>
          <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
            {books.length} {books.length === 1 ? 'book' : 'books'} found
          </span>
        </div>

        <button
          onClick={onClear}
          className="btn-secondary"
        >
          New Search
        </button>
      </div>

      {/* Controls */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">View:</span>
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-l-lg transition-colors ${viewMode === 'grid'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-r-lg transition-colors ${viewMode === 'list'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <div className="flex space-x-2">
              {[
                { value: 'relevance', label: 'Relevance' },
                { value: 'title', label: 'Title' },
                { value: 'author', label: 'Author' },
                { value: 'year', label: 'Year' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSort(option.value)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${sortBy === option.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {sortBy !== 'relevance' && (
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                {sortOrder === 'asc' ? (
                  <SortAsc className="h-4 w-4 text-gray-600" />
                ) : (
                  <SortDesc className="h-4 w-4 text-gray-600" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
        {sortedBooks.map((book, index) => (
          <BookCard
            key={`${book.key}-${index}`}
            book={book}
            viewMode={viewMode}
            isFavorite={isFavorite?.(book.key)}
            onToggleFavorite={() => onToggleFavorite?.(book)}
          />
        ))}
      </div>

      {/* Results Summary */}
      <div className="text-center py-8">
        <p className="text-gray-600">
          Showing {sortedBooks.length} of {books.length} results
        </p>
        {books.length > 20 && (
          <p className="text-sm text-gray-500 mt-2">
            Tip: Use more specific search terms to narrow down results
          </p>
        )}
      </div>
    </section>
  )
}

export default BookResults
