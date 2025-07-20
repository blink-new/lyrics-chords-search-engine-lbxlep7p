// Lyrics API service for fetching real song data
export interface LyricsApiResponse {
  lyrics: string
}

export interface SearchResult {
  id: string
  title: string
  artist: string
  album?: string
  preview?: string
}

// Convert lyrics to chord-lyrics format (basic implementation)
export function convertLyricsToChordFormat(lyrics: string, title: string, artist: string) {
  const lines = lyrics.split('\n').filter(line => line.trim() !== '')
  
  // Basic chord detection patterns
  const chordPatterns = [
    /\b[A-G][#b]?m?\d*\b/g, // Basic chord patterns like C, Am, F#, Bb7
    /\([A-G][#b]?m?\d*\)/g  // Chords in parentheses
  ]
  
  const chordLines = lines.map((line, index) => {
    // Check if line contains chord patterns
    const hasChords = chordPatterns.some(pattern => pattern.test(line))
    
    if (hasChords) {
      // Extract chords and clean lyrics
      const chords: string[] = []
      const positions: number[] = []
      let cleanLyrics = line
      
      // Find chord matches and their positions
      chordPatterns.forEach(pattern => {
        let match
        while ((match = pattern.exec(line)) !== null) {
          chords.push(match[0].replace(/[()]/g, ''))
          positions.push(match.index)
          cleanLyrics = cleanLyrics.replace(match[0], '')
        }
      })
      
      return {
        chords: chords.length > 0 ? chords : [''],
        lyrics: cleanLyrics.trim(),
        positions: positions.length > 0 ? positions : [0]
      }
    } else {
      // Regular lyric line - add some common chord progressions
      const commonChords = getCommonChordsForLine(line, index)
      return {
        chords: commonChords.chords,
        lyrics: line,
        positions: commonChords.positions
      }
    }
  })
  
  return {
    id: `${artist}-${title}`.toLowerCase().replace(/\s+/g, '-'),
    title,
    artist,
    key: 'C', // Default key
    tempo: '120',
    chordLines: chordLines.slice(0, 20) // Limit to first 20 lines
  }
}

// Add common chord progressions to lines without chords
function getCommonChordsForLine(line: string, index: number) {
  const commonProgressions = [
    { chords: ['C', 'G', 'Am', 'F'], positions: [0, 8, 15, 22] },
    { chords: ['G', 'D', 'Em', 'C'], positions: [0, 8, 15, 22] },
    { chords: ['Am', 'F', 'C', 'G'], positions: [0, 8, 15, 22] },
    { chords: ['F', 'C', 'G', 'Am'], positions: [0, 8, 15, 22] }
  ]
  
  // Cycle through progressions based on line index
  const progression = commonProgressions[index % commonProgressions.length]
  
  // Adjust positions based on line length
  const lineLength = line.length
  const adjustedPositions = progression.positions.map(pos => 
    Math.min(pos, Math.max(0, lineLength - 5))
  )
  
  return {
    chords: progression.chords,
    positions: adjustedPositions
  }
}

// Fetch lyrics from Lyrics.ovh API
export async function fetchLyrics(artist: string, title: string): Promise<string> {
  try {
    const response = await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`)
    
    if (!response.ok) {
      throw new Error('Lyrics not found')
    }
    
    const data: LyricsApiResponse = await response.json()
    return data.lyrics
  } catch (error) {
    console.error('Error fetching lyrics:', error)
    throw new Error('Failed to fetch lyrics')
  }
}

// Search for songs using a simple search approach
export async function searchSongs(query: string): Promise<SearchResult[]> {
  // For demo purposes, we'll create search results based on the query
  // In a real app, you'd use a proper music search API like Spotify, Last.fm, etc.
  
  const searchTerms = query.toLowerCase().split(' ')
  
  // Generate some realistic search results
  const mockResults: SearchResult[] = [
    {
      id: `search-${Date.now()}-1`,
      title: query.includes('love') ? 'Love Song' : 
             query.includes('rock') ? 'Rock Anthem' :
             query.includes('country') ? 'Country Road' :
             extractPossibleTitle(query),
      artist: query.includes('beatles') ? 'The Beatles' :
              query.includes('elvis') ? 'Elvis Presley' :
              query.includes('taylor') ? 'Taylor Swift' :
              extractPossibleArtist(query),
      preview: `Search result for "${query}"`
    }
  ]
  
  return mockResults
}

function extractPossibleTitle(query: string): string {
  // Try to extract a song title from the search query
  const words = query.split(' ')
  if (words.length >= 2) {
    return words.slice(0, Math.min(4, words.length)).map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }
  return query.charAt(0).toUpperCase() + query.slice(1)
}

function extractPossibleArtist(query: string): string {
  // Try to extract an artist name from the search query
  const words = query.split(' ')
  if (words.length >= 2) {
    return words.slice(-2).map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }
  return 'Unknown Artist'
}