import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import SearchSection from './components/SearchSection'
import BookResults from './components/BookResults'
import FavoritesSection from './components/FavoritesSection'
import ProfileSection from './components/ProfileSection'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'
import { searchBooks } from './services/bookService'

function App() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [activeTab, setActiveTab] = useState('search') // 'search' | 'favorites' | 'profile'

  // Favorites state (persisted)
  const [favoriteMap, setFavoriteMap] = useState(() => {
    try {
      const raw = localStorage.getItem('bf:favorites')
      return raw ? JSON.parse(raw) : {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('bf:favorites', JSON.stringify(favoriteMap))
    } catch { }
  }, [favoriteMap])

  const favoriteKeys = Object.keys(favoriteMap)
  const isFavorite = (bookKey) => Boolean(favoriteMap[bookKey])
  const toggleFavorite = (book) => {
    setFavoriteMap((prev) => {
      const next = { ...prev }
      if (next[book.key]) {
        delete next[book.key]
      } else {
        next[book.key] = book
      }
      return next
    })
  }

  const handleSearch = async (searchParams) => {
    setLoading(true)
    setError(null)
    setSearchPerformed(true)

    try {
      const results = await searchBooks(searchParams)
      setBooks(results)
    } catch (err) {
      setError(err.message)
      setBooks([])
    } finally {
      setLoading(false)
    }
  }

  const handleClearResults = () => {
    setBooks([])
    setError(null)
    setSearchPerformed(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header activeTab={activeTab} onNavigate={setActiveTab} />

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'search' && (
          <>
            <SearchSection onSearch={handleSearch} onClear={handleClearResults} />
            {loading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {!loading && !error && searchPerformed && (
              <BookResults
                books={books}
                onClear={handleClearResults}
                hasResults={books.length > 0}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
              />
            )}
            {!loading && !error && !searchPerformed && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📚</div>
                <h2 className="text-2xl font-bold text-gray-700 mb-2">
                  Welcome to Book Finder
                </h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  Discover your next great read! Search by title, author, or subject to find books that match your interests.
                </p>
              </div>
            )}
          </>
        )}

        {activeTab === 'favorites' && (
          <FavoritesSection
            favorites={favoriteKeys.map(k => favoriteMap[k])}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileSection totalFavorites={favoriteKeys.length} lastSearchCount={books.length}
            onGoToSearch={() => setActiveTab('search')} />
        )}
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">
            Built with ❤️ for college students who love to read
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Powered by Open Library API
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
