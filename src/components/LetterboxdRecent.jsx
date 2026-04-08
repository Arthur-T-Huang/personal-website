import { useState, useEffect } from 'react'

function FilmIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"/>
    </svg>
  )
}

function Stars({ rating }) {
  if (!rating) return null
  const full  = Math.floor(rating)
  const half  = rating % 1 >= 0.5
  const empty = 5 - full - (half ? 1 : 0)
  return (
    <span className="lb-stars" aria-label={`${rating} out of 5`}>
      {'★'.repeat(full)}
      {half ? '½' : ''}
      {'☆'.repeat(empty)}
    </span>
  )
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function LetterboxdRecent() {
  const [films, setFilms]   = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetch('/api/letterboxd/recent')
      .then(r => r.json())
      .then(data => {
        if (!Array.isArray(data)) throw new Error('bad response')
        setFilms(data.slice(0, 6))
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <div className="lb-recent">
      <div className="lb-header">
        <span className="lb-icon"><FilmIcon /></span>
        <span className="lb-label">Favourite Films</span>
      </div>

      {status === 'loading' && (
        <div className="spotify-state">
          {[...Array(4)].map((_, i) => (
            <div className="spotify-skeleton" key={i}>
              <div className="skeleton-art" />
              <div className="skeleton-text">
                <div className="skeleton-line" style={{ width: '65%' }} />
                <div className="skeleton-line" style={{ width: '40%' }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {status === 'error' && (
        <div className="spotify-empty">Could not load films.</div>
      )}

      {status === 'ready' && (
        <ul className="lb-films">
          {films.map((film, i) => (
            <li key={i} className="lb-film">
              <a href={film.link} target="_blank" rel="noreferrer" className="lb-film-link">
                {film.poster
                  ? <img src={film.poster} alt={film.title} className="lb-poster" />
                  : <div className="lb-poster lb-poster-placeholder"><FilmIcon /></div>
                }
                <div className="lb-info">
                  <span className="lb-title">{film.title}{film.year ? ` (${film.year})` : ''}</span>
                  <Stars rating={film.rating} />
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
