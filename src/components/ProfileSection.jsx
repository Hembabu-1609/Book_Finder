import React from 'react'
import { User, Heart, Search } from 'lucide-react'

const ProfileSection = ({ totalFavorites = 0, lastSearchCount = 0, onGoToSearch }) => {
    return (
        <section id="profile" className="max-w-3xl mx-auto">
            <div className="card p-8">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary-100 text-primary-700"><User className="h-6 w-6" /></div>
                    <h3 className="text-2xl font-bold text-gray-800">Your Profile</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                        <div className="flex items-center space-x-2 text-gray-600 mb-2"><Heart className="h-5 w-5 text-red-500" /><span>Favorites</span></div>
                        <div className="text-3xl font-bold">{totalFavorites}</div>
                        <div className="text-sm text-gray-500">Books saved</div>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                        <div className="flex items-center space-x-2 text-gray-600 mb-2"><Search className="h-5 w-5 text-primary-600" /><span>Last Search</span></div>
                        <div className="text-3xl font-bold">{lastSearchCount}</div>
                        <div className="text-sm text-gray-500">Results in last search</div>
                    </div>
                </div>

                <div className="mt-8 text-sm text-gray-600">
                    <p>Use the Favorites tab to manage saved books. Click the heart on any book to add or remove it from your list.</p>
                </div>

                <div className="mt-6">
                    <button onClick={onGoToSearch} className="btn-primary">Go to Search</button>
                </div>
            </div>
        </section>
    )
}

export default ProfileSection
