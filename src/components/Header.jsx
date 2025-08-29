import React from 'react'
import { BookOpen, Search, Heart, User } from 'lucide-react'

const Header = ({ activeTab = 'search', onNavigate = () => { } }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        {/* Main Navigation */}
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-2 rounded-lg">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                Book Finder
              </h1>
              <p className="text-sm text-gray-600">Your literary companion</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button onClick={() => onNavigate('search')} className={`flex items-center space-x-2 transition-colors ${activeTab === 'search' ? 'text-primary-700' : 'text-gray-600 hover:text-primary-600'}`}>
              <Search className="h-5 w-5" />
              <span>Search</span>
            </button>
            <button onClick={() => onNavigate('favorites')} className={`flex items-center space-x-2 transition-colors ${activeTab === 'favorites' ? 'text-primary-700' : 'text-gray-600 hover:text-primary-600'}`}>
              <Heart className="h-5 w-5" />
              <span>Favorites</span>
            </button>
            <button onClick={() => onNavigate('profile')} className={`flex items-center space-x-2 transition-colors ${activeTab === 'profile' ? 'text-primary-700' : 'text-gray-600 hover:text-primary-600'}`}>
              <User className="h-5 w-5" />
              <span>Profile</span>
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="py-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Discover Your Next
            <span className="block bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Great Read
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Whether you're studying for class, exploring new interests, or just looking for entertainment,
            find the perfect book for every moment of your college journey.
          </p>

          {/* Quick Stats */}
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-primary-600" />
              <span>Millions of books</span>
            </div>
            <div className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-accent-600" />
              <span>Advanced search</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-500" />
              <span>Save favorites</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
