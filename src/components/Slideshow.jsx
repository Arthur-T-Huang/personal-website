import { useState, useEffect, useRef } from 'react'

const images = [
  { src: 'https://i.imgur.com/1wGltie.jpeg', alt: 'Arthur speaking at podium' },
  { src: 'https://i.imgur.com/CznAjuW.jpeg', alt: 'Arthur in European city square' },
  { src: 'https://i.imgur.com/WUMlAZi.jpeg', alt: 'Arthur playing golf' },
  { src: 'https://i.imgur.com/Aon1PIh.jpeg', alt: 'Arthur in Rome' },
  { src: 'https://i.imgur.com/OrgJ1vZ.jpeg', alt: 'Arthur skiing' },
  { src: 'https://i.imgur.com/dyFuiwh.jpeg', alt: 'Arthur at coastal cliffside' },
  { src: 'https://i.imgur.com/OdWRpQE.jpeg', alt: 'Arthur hiking at waterfall' },
  { src: 'https://i.imgur.com/fwl4iBy.jpeg', alt: 'Arthur at Pixar exhibit' },
  { src: 'https://i.imgur.com/rXLrroH.jpeg', alt: 'Arthur at Getty Center overlook' },
]

export default function Slideshow() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)

  function goTo(n) {
    setCurrent(((n % images.length) + images.length) % images.length)
  }

  function resetTimer() {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % images.length), 3500)
  }

  useEffect(() => {
    resetTimer()
    return () => clearInterval(timerRef.current)
  }, [])

  function handlePrev() {
    goTo(current - 1)
    resetTimer()
  }

  function handleNext() {
    goTo(current + 1)
    resetTimer()
  }

  return (
    <div className="slideshow-wrap">
      <div className="slideshow">
        {images.map((img, i) => (
          <img key={img.src} src={img.src} alt={img.alt} className={i === current ? 'active' : ''} />
        ))}
        <div className="slide-arrows">
          <button className="slide-arrow" aria-label="Previous" onClick={handlePrev}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button className="slide-arrow" aria-label="Next" onClick={handleNext}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
      <div className="slide-dots">
        {images.map((_, i) => (
          <div
            key={i}
            className={`slide-dot${i === current ? ' active' : ''}`}
            onClick={() => { goTo(i); resetTimer() }}
          />
        ))}
      </div>
    </div>
  )
}
