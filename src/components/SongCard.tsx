import { Music2, User, Album } from 'lucide-react'
import { Card, CardContent } from './ui/card'

interface Song {
  id: string
  title: string
  artist: string
  album?: string
  key?: string
  tempo?: string
  year?: number
}

interface SongCardProps {
  song: Song
  onClick: (song: Song) => void
}

export function SongCard({ song, onClick }: SongCardProps) {
  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] bg-white border-gray-200"
      onClick={() => onClick(song)}
    >
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Music2 className="h-6 w-6 text-primary" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-gray-900 truncate">
              {song.title}
            </h3>
            
            <div className="flex items-center space-x-1 mt-1">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600 truncate">{song.artist}</span>
            </div>
            
            {song.album && (
              <div className="flex items-center space-x-1 mt-1">
                <Album className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500 truncate">{song.album}</span>
              </div>
            )}
            
            <div className="flex items-center space-x-4 mt-3">
              {song.key && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/20 text-accent-foreground">
                  Key: {song.key}
                </span>
              )}
              {song.tempo && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {song.tempo} BPM
                </span>
              )}
              {song.year && (
                <span className="text-xs text-gray-500">{song.year}</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}