import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const links = ['about', 'skills', 'projects', 'experience', 'education', 'contact']

export default function Nav() {
  useEffect(() => {
    const progressBar = document.getElementById('progress-bar')
    const backToTop = document.getElementById('back-to-top')

    function onScroll() {
      const h = document.documentElement
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100
      if (progressBar) progressBar.style.width = pct + '%'

      if (backToTop) {
        backToTop.classList.toggle('visible', h.scrollTop > 400)
      }

      let current = ''
      document.querySelectorAll('section[id]').forEach((s) => {
        if (window.scrollY >= s.offsetTop - 130) current = s.id
      })
      document.querySelectorAll('.nav-links a').forEach((a) => {
        const href = a.getAttribute('href')
        a.classList.toggle('active', href === '#' + current)
        if (!a.classList.contains('active')) a.style.color = ''
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div id="progress-bar" />
      <nav>
        <div className="nav-logo">AH.</div>
        <ul className="nav-links">
          {links.map((id) => (
            <li key={id}>
              <a href={`#${id}`}>{id.charAt(0).toUpperCase() + id.slice(1)}</a>
            </li>
          ))}
          <li>
            <Link to="/resume">Resume</Link>
          </li>
        </ul>
      </nav>
      <button
        id="back-to-top"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </>
  )
}
