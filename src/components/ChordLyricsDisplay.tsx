import { useState } from 'react'
import { ChevronUp, ChevronDown, RotateCcw, Printer } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'

interface ChordLine {
  chords: string[]
  lyrics: string
  positions: number[] // Position of each chord relative to lyrics
}

interface Song {
  id: string
  title: string
  artist: string
  album?: string
  key: string
  tempo?: string
  year?: number
  chordLines: ChordLine[]
}

interface ChordLyricsDisplayProps {
  song: Song
  onBack: () => void
}

const CHORD_PROGRESSIONS = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
]

export function ChordLyricsDisplay({ song, onBack }: ChordLyricsDisplayProps) {
  const [currentKey, setCurrentKey] = useState(song.key)
  
  const transposeChord = (chord: string, semitones: number): string => {
    if (!chord || chord === '-') return chord
    
    // Extract the root note (handle both sharp and flat)
    const rootMatch = chord.match(/^([A-G][#b]?)/)
    if (!rootMatch) return chord
    
    const root = rootMatch[1]
    const suffix = chord.slice(root.length)
    
    // Find current position in chromatic scale
    let currentIndex = CHORD_PROGRESSIONS.findIndex(note => note === root)
    if (currentIndex === -1) {
      // Handle flat notes
      const flatToSharp: { [key: string]: string } = {
        'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#'
      }
      const sharpEquivalent = flatToSharp[root]
      if (sharpEquivalent) {
        currentIndex = CHORD_PROGRESSIONS.findIndex(note => note === sharpEquivalent)
      }
    }
    
    if (currentIndex === -1) return chord
    
    // Calculate new position
    const newIndex = (currentIndex + semitones + 12) % 12
    return CHORD_PROGRESSIONS[newIndex] + suffix
  }
  
  const transposeAllChords = (chordLines: ChordLine[], semitones: number): ChordLine[] => {
    return chordLines.map(line => ({
      ...line,
      chords: line.chords.map(chord => transposeChord(chord, semitones))
    }))
  }
  
  const getTransposedChords = () => {
    const originalKeyIndex = CHORD_PROGRESSIONS.findIndex(key => key === song.key)
    const currentKeyIndex = CHORD_PROGRESSIONS.findIndex(key => key === currentKey)
    
    if (originalKeyIndex === -1 || currentKeyIndex === -1) return song.chordLines
    
    const semitones = currentKeyIndex - originalKeyIndex
    return transposeAllChords(song.chordLines, semitones)
  }
  
  const transposeUp = () => {
    const currentIndex = CHORD_PROGRESSIONS.findIndex(key => key === currentKey)
    const newIndex = (currentIndex + 1) % 12
    setCurrentKey(CHORD_PROGRESSIONS[newIndex])
  }
  
  const transposeDown = () => {
    const currentIndex = CHORD_PROGRESSIONS.findIndex(key => key === currentKey)
    const newIndex = (currentIndex - 1 + 12) % 12
    setCurrentKey(CHORD_PROGRESSIONS[newIndex])
  }
  
  const resetKey = () => {
    setCurrentKey(song.key)
  }
  
  const renderChordLine = (line: ChordLine, index: number) => {
    const { chords, lyrics, positions } = line
    
    return (
      <div key={index} className="mb-6">
        {/* Chord line */}
        <div className="relative h-8 mb-1">
          {chords.map((chord, chordIndex) => {
            if (!chord || chord === '-') return null
            
            const position = positions[chordIndex] || 0
            return (
              <span
                key={chordIndex}
                className="absolute text-primary font-semibold text-sm"
                style={{ left: `${position * 0.6}em` }}
              >
                {chord}
              </span>
            )
          })}
        </div>
        
        {/* Lyrics line */}
        <div className="text-gray-900 text-base leading-relaxed font-mono">
          {lyrics}
        </div>
      </div>
    )
  }
  
  const transposedChords = getTransposedChords()
  
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white shadow-lg">
        <CardHeader className="border-b bg-gray-50">
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="mb-4"
            >
              ← Back to Search
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {song.title}
              </CardTitle>
              <p className="text-lg text-gray-600 mt-1">by {song.artist}</p>
              {song.album && (
                <p className="text-sm text-gray-500">from "{song.album}"</p>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Key: {currentKey}
              </Badge>
              {song.tempo && (
                <Badge variant="outline">
                  {song.tempo} BPM
                </Badge>
              )}
              {song.year && (
                <Badge variant="outline">
                  {song.year}
                </Badge>
              )}
            </div>
            
            {/* Transpose Controls */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Transpose:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={transposeDown}
                className="h-8 w-8 p-0"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={transposeUp}
                className="h-8 w-8 p-0"
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetKey}
                className="h-8 px-3"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="space-y-2">
            {transposedChords.map((line, index) => renderChordLine(line, index))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}