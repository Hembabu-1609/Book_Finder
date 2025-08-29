import React from 'react'
import { BookOpen } from 'lucide-react'

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        {/* Animated Book Icon */}
        <div className="animate-bounce-gentle">
          <BookOpen className="h-16 w-16 text-primary-600" />
        </div>
        
        {/* Spinning Ring */}
        <div className="absolute inset-0 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
      
      <div className="mt-6 text-center">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Searching for books...
        </h3>
        <p className="text-gray-500">
          This might take a few moments
        </p>
      </div>
      
      {/* Loading Dots */}
      <div className="flex space-x-2 mt-6">
        <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  )
}

export default LoadingSpinner
