import React, { useState } from 'react'
import { Search, BookOpen, User, Tag, Filter, X } from 'lucide-react'

const SearchSection = ({ onSearch, onClear }) => {
  const [searchType, setSearchType] = useState('title')
  const [searchQuery, setSearchQuery] = useState('')
  const [advancedFilters, setAdvancedFilters] = useState({
    language: '',
    publishYear: '',
    subject: ''
  })
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    
    const searchParams = {
      type: searchType,
      query: searchQuery.trim(),
      ...advancedFilters
    }
    
    onSearch(searchParams)
  }

  const handleClear = () => {
    setSearchQuery('')
    setAdvancedFilters({
      language: '',
      publishYear: '',
      subject: ''
    })
    setSearchType('title')
    onClear()
  }

  const searchTypes = [
    { value: 'title', label: 'Title', icon: BookOpen },
    { value: 'author', label: 'Author', icon: User },
    { value: 'subject', label: 'Subject', icon: Tag }
  ]

  return (
    <section id="search" className="mb-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Find Your Perfect Book
          </h3>
          <p className="text-gray-600">
            Search by title, author, or subject to discover books that match your interests
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Search Type Selection */}
          <div className="flex justify-center space-x-2">
            {searchTypes.map((type) => {
              const Icon = type.icon
              return (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setSearchType(type.value)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                    searchType === type.value
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-gray-400 text-gray-600'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{type.label}</span>
                </button>
              )
            })}
          </div>

          {/* Main Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search by ${searchType}...`}
              className="input-field pl-12 text-lg"
              required
            />
          </div>

          {/* Advanced Filters Toggle */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center space-x-2 mx-auto text-primary-600 hover:text-primary-700 transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span className="font-medium">
                {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
              </span>
            </button>
          </div>

          {/* Advanced Filters */}
          {showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  value={advancedFilters.language}
                  onChange={(e) => setAdvancedFilters(prev => ({ ...prev, language: e.target.value }))}
                  className="input-field"
                >
                  <option value="">Any Language</option>
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="it">Italian</option>
                  <option value="pt">Portuguese</option>
                  <option value="ru">Russian</option>
                  <option value="zh">Chinese</option>
                  <option value="ja">Japanese</option>
                  <option value="ko">Korean</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Publish Year
                </label>
                <input
                  type="number"
                  value={advancedFilters.publishYear}
                  onChange={(e) => setAdvancedFilters(prev => ({ ...prev, publishYear: e.target.value }))}
                  placeholder="e.g., 2020"
                  min="1800"
                  max="2024"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={advancedFilters.subject}
                  onChange={(e) => setAdvancedFilters(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="e.g., Science Fiction"
                  className="input-field"
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              type="submit"
              className="btn-primary text-lg px-8 py-3 flex items-center justify-center space-x-2"
              disabled={!searchQuery.trim()}
            >
              <Search className="h-5 w-5" />
              <span>Search Books</span>
            </button>
            
            <button
              type="button"
              onClick={handleClear}
              className="btn-secondary text-lg px-8 py-3 flex items-center justify-center space-x-2"
            >
              <X className="h-5 w-5" />
              <span>Clear</span>
            </button>
          </div>
        </form>

        {/* Search Tips */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-3">💡 Search Tips for College Students</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <strong>For Coursework:</strong> Try searching by subject or specific topics you're studying
            </div>
            <div>
              <strong>For Research:</strong> Use author names to find related works and academic sources
            </div>
            <div>
              <strong>For Leisure:</strong> Search by genre or mood to discover new interests
            </div>
            <div>
              <strong>For Projects:</strong> Combine multiple search terms for more specific results
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SearchSection
