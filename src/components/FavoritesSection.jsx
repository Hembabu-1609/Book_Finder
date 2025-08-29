import React from 'react'
import BookCard from './BookCard'
import { Heart, Search } from 'lucide-react'

const FavoritesSection = ({ favorites = [], onToggleFavorite, isFavorite }) => {
    if (!favorites.length) {
        return (
            <section id="favorites" className="max-w-5xl mx-auto">
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">💖</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">No favorites yet</h3>
                    <p className="text-gray-600 mb-6">Save books you love by clicking the heart icon on any result.</p>
                </div>
            </section>
        )
    }

    return (
        <section id="favorites" className="space-y-6 max-w-6xl mx-auto">
            <div className="flex items-center space-x-3">
                <Heart className="h-6 w-6 text-red-500" />
                <h3 className="text-2xl font-bold text-gray-800">Your Favorites</h3>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">{favorites.length}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.map((book, i) => (
                    <BookCard key={`${book.key}-${i}`} book={book} viewMode="grid" isFavorite={true} onToggleFavorite={() => onToggleFavorite(book)} />
                ))}
            </div>
        </section>
    )
}

export default FavoritesSection
