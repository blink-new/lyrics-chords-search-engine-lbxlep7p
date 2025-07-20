import { useState } from 'react'
import { Search, Music } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'

interface SearchBarProps {
  onSearch: (query: string) => void
  isLoading?: boolean
}

export function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder="Search any song: 'Bohemian Rhapsody by Queen' or 'Hotel California'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 pr-24 h-14 text-lg bg-white border-2 border-gray-200 focus:border-primary rounded-xl shadow-sm"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 px-6 bg-primary hover:bg-primary/90 rounded-lg"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            ) : (
              <Music className="h-4 w-4" />
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}