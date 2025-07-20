// Sample song data for demonstration
export interface ChordLine {
  chords: string[]
  lyrics: string
  positions: number[] // Position of each chord relative to lyrics
}

export interface Song {
  id: string
  title: string
  artist: string
  album?: string
  key: string
  tempo?: string
  year?: number
  chordLines: ChordLine[]
}

export const sampleSongs: Song[] = [
  {
    id: '1',
    title: 'Amazing Grace',
    artist: 'Traditional',
    key: 'G',
    tempo: '90',
    year: 1779,
    chordLines: [
      {
        chords: ['G', '', 'G7', 'C'],
        lyrics: 'Amazing grace how sweet the sound',
        positions: [0, 0, 15, 25]
      },
      {
        chords: ['G', '', 'D', 'G'],
        lyrics: 'That saved a wretch like me',
        positions: [0, 0, 12, 25]
      },
      {
        chords: ['G', '', 'G7', 'C'],
        lyrics: 'I once was lost but now am found',
        positions: [0, 0, 18, 28]
      },
      {
        chords: ['G', 'D', '', 'G'],
        lyrics: 'Was blind but now I see',
        positions: [0, 10, 0, 22]
      }
    ]
  },
  {
    id: '2',
    title: 'House of the Rising Sun',
    artist: 'Traditional',
    key: 'Am',
    tempo: '120',
    year: 1964,
    chordLines: [
      {
        chords: ['Am', 'C', 'D', 'F'],
        lyrics: 'There is a house in New Orleans',
        positions: [0, 8, 15, 25]
      },
      {
        chords: ['Am', 'C', 'E', 'Am'],
        lyrics: 'They call the Rising Sun',
        positions: [0, 8, 18, 25]
      },
      {
        chords: ['Am', 'C', 'D', 'F'],
        lyrics: 'And it\'s been the ruin of many a poor boy',
        positions: [0, 8, 15, 35]
      },
      {
        chords: ['Am', 'E', '', 'Am'],
        lyrics: 'And God I know I\'m one',
        positions: [0, 8, 0, 22]
      }
    ]
  },
  {
    id: '3',
    title: 'Wonderwall',
    artist: 'Oasis',
    album: '(What\'s the Story) Morning Glory?',
    key: 'G',
    tempo: '87',
    year: 1995,
    chordLines: [
      {
        chords: ['Em7', 'G', 'D', 'C'],
        lyrics: 'Today is gonna be the day',
        positions: [0, 8, 15, 22]
      },
      {
        chords: ['Em7', 'G', 'D', 'C'],
        lyrics: 'That they\'re gonna throw it back to you',
        positions: [0, 8, 15, 32]
      },
      {
        chords: ['Em7', 'G', 'D', 'C'],
        lyrics: 'By now you should\'ve somehow',
        positions: [0, 8, 15, 25]
      },
      {
        chords: ['Em7', 'G', 'D', 'C'],
        lyrics: 'Realized what you gotta do',
        positions: [0, 8, 15, 25]
      }
    ]
  },
  {
    id: '4',
    title: 'Let It Be',
    artist: 'The Beatles',
    album: 'Let It Be',
    key: 'C',
    tempo: '73',
    year: 1970,
    chordLines: [
      {
        chords: ['C', 'G', 'Am', 'F'],
        lyrics: 'When I find myself in times of trouble',
        positions: [0, 8, 15, 30]
      },
      {
        chords: ['C', 'G', 'F', 'C'],
        lyrics: 'Mother Mary comes to me',
        positions: [0, 8, 18, 25]
      },
      {
        chords: ['C', 'G', 'Am', 'F'],
        lyrics: 'Speaking words of wisdom',
        positions: [0, 8, 15, 25]
      },
      {
        chords: ['C', 'G', 'F', 'C'],
        lyrics: 'Let it be',
        positions: [0, 8, 12, 15]
      }
    ]
  },
  {
    id: '5',
    title: 'Hotel California',
    artist: 'Eagles',
    album: 'Hotel California',
    key: 'Bm',
    tempo: '75',
    year: 1976,
    chordLines: [
      {
        chords: ['Bm', '', 'F#', ''],
        lyrics: 'On a dark desert highway',
        positions: [0, 0, 12, 0]
      },
      {
        chords: ['A', '', 'E', ''],
        lyrics: 'Cool wind in my hair',
        positions: [0, 0, 12, 0]
      },
      {
        chords: ['G', '', 'D', ''],
        lyrics: 'Warm smell of colitas',
        positions: [0, 0, 12, 0]
      },
      {
        chords: ['Em', '', 'F#', ''],
        lyrics: 'Rising up through the air',
        positions: [0, 0, 15, 0]
      }
    ]
  }
]