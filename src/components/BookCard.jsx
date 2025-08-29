import React, { useMemo, useState } from 'react'
import { Heart, ExternalLink, Calendar, User, Tag, BookOpen, Star } from 'lucide-react'

const BookCard = ({ book, viewMode, isFavorite = false, onToggleFavorite }) => {
  const [imageIndex, setImageIndex] = useState(0)

  // Build a list of possible cover URLs to try in order
  const candidateImageUrls = useMemo(() => {
    const urls = []
    const sizes = ['L', 'M', 'S']

    // Try by cover id
    if (book.cover_i) {
      sizes.forEach(size => {
        urls.push(`https://covers.openlibrary.org/b/id/${book.cover_i}-${size}.jpg`)
      })
    }

    // Try by ISBN if available
    if (book.isbn && book.isbn.length > 0) {
      const firstIsbn = book.isbn[0]
      sizes.forEach(size => {
        urls.push(`https://covers.openlibrary.org/b/isbn/${firstIsbn}-${size}.jpg`)
      })
    }

    // Fallback to placeholder at the end
    urls.push('/placeholder-cover.svg')
    return urls
  }, [book.cover_i, book.isbn])

  const currentImageUrl = candidateImageUrls[Math.min(imageIndex, candidateImageUrls.length - 1)]

  const handleImageError = () => {
    // Advance to the next candidate URL
    setImageIndex(prev => Math.min(prev + 1, candidateImageUrls.length - 1))
  }

  const toggleFavorite = () => {
    onToggleFavorite?.(book)
  }

  const getAuthorDisplay = () => {
    if (!book.author_name || book.author_name.length === 0) {
      return 'Unknown Author'
    }
    return book.author_name.join(', ')
  }

  const getYearDisplay = () => {
    if (book.first_publish_year) {
      return book.first_publish_year
    }
    if (book.publish_year && book.publish_year.length > 0) {
      return book.publish_year[0]
    }
    return 'Unknown Year'
  }

  const getSubjects = () => {
    if (!book.subject || book.subject.length === 0) {
      return []
    }
    return book.subject.slice(0, 3)
  }

  const getEditionCount = () => {
    if (book.edition_count) {
      return `${book.edition_count} edition${book.edition_count > 1 ? 's' : ''}`
    }
    return ''
  }

  if (viewMode === 'list') {
    return (
      <div className="card p-6 hover:shadow-lg transition-all duration-200">
        <div className="flex space-x-6">
          {/* Book Cover */}
          <div className="flex-shrink-0">
            <img
              src={currentImageUrl}
              alt={`Cover of ${book.title}`}
              onError={handleImageError}
              loading="lazy"
              className="w-24 h-32 object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Book Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                  {book.title}
                </h3>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{getAuthorDisplay()}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{getYearDisplay()}</span>
                    {getEditionCount() && (
                      <span className="text-gray-500">• {getEditionCount()}</span>
                    )}
                  </div>

                  {book.language && book.language.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <Tag className="h-4 w-4" />
                      <span>{book.language.join(', ')}</span>
                    </div>
                  )}
                </div>

                {/* Subjects */}
                {getSubjects().length > 0 && (
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-2">
                      {getSubjects().map((subject, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col items-end space-y-2 ml-4">
                <button
                  onClick={toggleFavorite}
                  className={`p-2 rounded-full transition-colors ${isFavorite
                    ? 'text-red-500 hover:text-red-600'
                    : 'text-gray-400 hover:text-red-500'
                    }`}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>

                <a
                  href={`https://openlibrary.org${book.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid View
  return (
    <div className="card p-4 hover:shadow-lg transition-all duration-200 group">
      {/* Book Cover */}
      <div className="relative mb-4">
        <img
          src={currentImageUrl}
          alt={`Cover of ${book.title}`}
          onError={handleImageError}
          loading="lazy"
          className="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-200"
        />

        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className={`absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm transition-all duration-200 ${isFavorite
            ? 'text-red-500 hover:text-red-600'
            : 'text-gray-400 hover:text-red-500'
            }`}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* External Link */}
        <a
          href={`https://openlibrary.org${book.key}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-2 left-2 p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-400 hover:text-primary-600 transition-all duration-200 opacity-0 group-hover:opacity-100"
        >
          <ExternalLink className="h-5 w-5" />
        </a>
      </div>

      {/* Book Info */}
      <div className="space-y-2">
        <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {book.title}
        </h3>

        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex items-center space-x-1">
            <User className="h-3 w-3" />
            <span className="line-clamp-1">{getAuthorDisplay()}</span>
          </div>

          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{getYearDisplay()}</span>
          </div>
        </div>

        {/* Subjects */}
        {getSubjects().length > 0 && (
          <div className="pt-2">
            <div className="flex flex-wrap gap-1">
              {getSubjects().slice(0, 2).map((subject, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full line-clamp-1"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Edition Count */}
        {getEditionCount() && (
          <div className="pt-2 text-xs text-gray-500">
            {getEditionCount()}
          </div>
        )}
      </div>
    </div>
  )
}

export default BookCard
