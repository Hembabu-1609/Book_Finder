const OPEN_LIBRARY_API_BASE = 'https://openlibrary.org'

/**
 * Search books using the Open Library API
 * @param {Object} searchParams - Search parameters
 * @param {string} searchParams.type - Search type (title, author, subject)
 * @param {string} searchParams.query - Search query
 * @param {string} searchParams.language - Language filter
 * @param {string} searchParams.publishYear - Publish year filter
 * @param {string} searchParams.subject - Subject filter
 * @returns {Promise<Array>} Array of book objects
 */
export const searchBooks = async (searchParams) => {
  try {
    const { type, query, language, publishYear, subject } = searchParams
    
    // Build search query based on type
    let searchQuery = ''
    switch (type) {
      case 'title':
        searchQuery = `title:${encodeURIComponent(query)}`
        break
      case 'author':
        searchQuery = `author:${encodeURIComponent(query)}`
        break
      case 'subject':
        searchQuery = `subject:${encodeURIComponent(query)}`
        break
      default:
        searchQuery = encodeURIComponent(query)
    }
    
    // Add additional filters
    if (language) {
      searchQuery += `&language=${language}`
    }
    
    if (publishYear) {
      searchQuery += `&first_publish_year=${publishYear}`
    }
    
    if (subject) {
      searchQuery += `&subject=${encodeURIComponent(subject)}`
    }
    
    // Construct API URL
    const apiUrl = `${OPEN_LIBRARY_API_BASE}/search.json?q=${searchQuery}&limit=50&fields=key,title,author_name,first_publish_year,publish_year,cover_i,edition_count,language,subject,number_of_pages_median,isbn,ebook_access,has_fulltext`
    
    console.log('Searching with URL:', apiUrl)
    
    // Make API request
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'BookFinder/1.0 (Educational Project)'
      }
    })
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('No books found matching your search criteria')
      }
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please wait a moment before trying again.')
      }
      throw new Error(`API request failed with status ${response.status}`)
    }
    
    const data = await response.json()
    
    if (!data.docs || data.docs.length === 0) {
      throw new Error('No books found matching your search criteria')
    }
    
    // Process and enhance book data
    const processedBooks = data.docs.map(book => ({
      ...book,
      // Ensure title is always present
      title: book.title || 'Untitled',
      // Clean up author names
      author_name: book.author_name || [],
      // Ensure cover image URL is properly formatted
      cover_i: book.cover_i || null,
      // Add computed fields
      hasCover: !!book.cover_i,
      isEbook: book.ebook_access === 'borrowable' || book.ebook_access === 'public',
      pageCount: book.number_of_pages_median || null
    }))
    
    console.log(`Found ${processedBooks.length} books`)
    return processedBooks
    
  } catch (error) {
    console.error('Error searching books:', error)
    
    // Handle specific error types
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection.')
    }
    
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Unable to connect to the book database. Please try again later.')
    }
    
    // Re-throw the error if it's already processed
    throw error
  }
}

/**
 * Get detailed book information by key
 * @param {string} bookKey - Book key from Open Library
 * @returns {Promise<Object>} Detailed book information
 */
export const getBookDetails = async (bookKey) => {
  try {
    const response = await fetch(`${OPEN_LIBRARY_API_BASE}${bookKey}.json`)
    
    if (!response.ok) {
      throw new Error('Book details not found')
    }
    
    const bookData = await response.json()
    return bookData
    
  } catch (error) {
    console.error('Error fetching book details:', error)
    throw new Error('Unable to fetch book details')
  }
}

/**
 * Get book cover image URL
 * @param {number} coverId - Cover ID from Open Library
 * @param {string} size - Image size (S, M, L)
 * @returns {string} Cover image URL
 */
export const getCoverImageUrl = (coverId, size = 'L') => {
  if (!coverId) return null
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
}

/**
 * Get author information
 * @param {string} authorKey - Author key from Open Library
 * @returns {Promise<Object>} Author information
 */
export const getAuthorInfo = async (authorKey) => {
  try {
    const response = await fetch(`${OPEN_LIBRARY_API_BASE}${authorKey}.json`)
    
    if (!response.ok) {
      throw new Error('Author information not found')
    }
    
    const authorData = await response.json()
    return authorData
    
  } catch (error) {
    console.error('Error fetching author info:', error)
    throw new Error('Unable to fetch author information')
  }
}
