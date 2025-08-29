import React from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'

const ErrorMessage = ({ message, onRetry }) => {
  const getErrorMessage = (msg) => {
    if (msg.includes('network') || msg.includes('fetch')) {
      return 'Network error. Please check your internet connection and try again.'
    }
    if (msg.includes('not found') || msg.includes('404')) {
      return 'No books found matching your search criteria. Try different keywords or filters.'
    }
    if (msg.includes('rate limit') || msg.includes('too many')) {
      return 'Too many requests. Please wait a moment before trying again.'
    }
    return msg || 'An unexpected error occurred. Please try again.'
  }

  const getErrorIcon = (msg) => {
    if (msg.includes('not found') || msg.includes('404')) {
      return '🔍'
    }
    if (msg.includes('network') || msg.includes('fetch')) {
      return '🌐'
    }
    return '⚠️'
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <div className="text-6xl mb-4">
        {getErrorIcon(message)}
      </div>
      
      <h3 className="text-xl font-semibold text-red-800 mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-red-700 mb-6 max-w-md mx-auto">
        {getErrorMessage(message)}
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn-primary flex items-center justify-center space-x-2"
          >
            <RefreshCw className="h-5 w-5" />
            <span>Try Again</span>
          </button>
        )}
        
        <button
          onClick={() => window.location.reload()}
          className="btn-secondary flex items-center justify-center space-x-2"
        >
          <RefreshCw className="h-5 w-5" />
          <span>Refresh Page</span>
        </button>
      </div>
      
      {/* Helpful Tips */}
      <div className="mt-6 p-4 bg-red-100 rounded-lg">
        <h4 className="font-semibold text-red-800 mb-2">💡 Troubleshooting Tips:</h4>
        <ul className="text-sm text-red-700 space-y-1 text-left max-w-md mx-auto">
          <li>• Check your internet connection</li>
          <li>• Try using different search terms</li>
          <li>• Clear your browser cache</li>
          <li>• Wait a few minutes and try again</li>
        </ul>
      </div>
    </div>
  )
}

export default ErrorMessage
