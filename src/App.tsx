import { useState } from 'react'
import { SearchBar } from './components/SearchBar'
import { SongCard } from './components/SongCard'
import { ChordLyricsDisplay } from './components/ChordLyricsDisplay'
import { sampleSongs, type Song } from './data/sampleSongs'
import { Music, Guitar } from 'lucide-react'

function App() {
  const [searchResults, setSearchResults] = useState<Song[]>([])
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (query: string) => {
    setIsLoading(true)
    setHasSearched(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Filter sample songs based on query
    const results = sampleSongs.filter(song => 
      song.title.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase()) ||
      (song.album && song.album.toLowerCase().includes(query.toLowerCase()))
    )
    
    setSearchResults(results)
    setIsLoading(false)
  }

  const handleSongSelect = (song: Song) => {
    setSelectedSong(song)
  }

  const handleBackToSearch = () => {
    setSelectedSong(null)
  }

  if (selectedSong) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <ChordLyricsDisplay 
          song={selectedSong} 
          onBack={handleBackToSearch}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="flex items-center space-x-2">
              <Music className="h-8 w-8 text-primary" />
              <Guitar className="h-8 w-8 text-accent" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Chord<span className="text-primary">Lyrics</span>
            </h1>
          </div>
          <p className="text-center text-gray-600 mt-2">
            Search for songs and view lyrics with guitar chord notations
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Search Section */}
        <div className="text-center mb-12">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          
          {!hasSearched && (
            <div className="mt-8">
              <p className="text-gray-500 mb-6">
                Try searching for popular songs like "Amazing Grace", "Wonderwall", or "Let It Be"
              </p>
              
              {/* Featured Songs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {sampleSongs.slice(0, 3).map((song) => (
                  <SongCard
                    key={song.id}
                    song={song}
                    onClick={handleSongSelect}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600">Searching for songs...</p>
          </div>
        )}

        {/* Search Results */}
        {hasSearched && !isLoading && (
          <div className="space-y-6">
            {searchResults.length > 0 ? (
              <>
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Search Results
                  </h2>
                  <p className="text-gray-600">
                    Found {searchResults.length} song{searchResults.length !== 1 ? 's' : ''}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((song) => (
                    <SongCard
                      key={song.id}
                      song={song}
                      onClick={handleSongSelect}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Music className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No songs found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try searching with different keywords or browse our featured songs above
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-500">
            <p>© 2024 ChordLyrics. A music search engine for guitarists and musicians.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App