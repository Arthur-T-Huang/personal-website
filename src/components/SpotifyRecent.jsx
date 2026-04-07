import { useState, useEffect } from 'react'
import { getRecentlyPlayed } from '../lib/spotify'

function SpotifyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  )
}

function timeAgo(date) {
  const mins = Math.floor((Date.now() - date) / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export default function SpotifyRecent() {
  const [tracks, setTracks] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'error'

  useEffect(() => {
    getRecentlyPlayed()
      .then((data) => { setTracks(data); setStatus('ready') })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <div className="spotify-recent">
      <div className="spotify-header">
        <span className="spotify-icon"><SpotifyIcon /></span>
        <span className="spotify-label">Recently Played</span>
      </div>

      {status === 'loading' && (
        <div className="spotify-state">
          {[...Array(4)].map((_, i) => (
            <div className="spotify-skeleton" key={i}>
              <div className="skeleton-art" />
              <div className="skeleton-text">
                <div className="skeleton-line" style={{ width: '70%' }} />
                <div className="skeleton-line" style={{ width: '45%' }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {status === 'error' && (
        <div className="spotify-empty">
          Could not load tracks — check your API credentials.
        </div>
      )}

      {status === 'ready' && (
        <ul className="spotify-tracks">
          {tracks.map((track) => (
            <li key={track.id} className="spotify-track">
              <a href={track.url} target="_blank" rel="noreferrer" className="spotify-track-link">
                <img
                  src={track.albumArt}
                  alt={track.album}
                  className="spotify-art"
                />
                <div className="spotify-info">
                  <span className="spotify-name">{track.name}</span>
                  <span className="spotify-artist">{track.artist}</span>
                </div>
                <span className="spotify-time">{timeAgo(track.playedAt)}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
