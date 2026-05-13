import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let stars = []
    let W, H
    let animId

    function resize() {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }

    function initStars() {
      stars = []
      for (let i = 0; i < 400; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.8 + 0.2,
          gold: Math.random() < 0.25,
          speed: Math.random() * 0.18 + 0.01,
          opacity: Math.random() * 0.7 + 0.15,
          twinkle: Math.random() * Math.PI * 2,
        })
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)
      stars.forEach((s) => {
        s.twinkle += 0.011
        const op = s.opacity * (0.7 + 0.3 * Math.sin(s.twinkle))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = s.gold ? `rgba(177,163,0,${op})` : `rgba(255,253,251,${op})`
        ctx.fill()
        s.y -= s.speed
        if (s.y < -2) { s.y = H + 2; s.x = Math.random() * W }
      })
      animId = requestAnimationFrame(draw)
    }

    function onResize() { resize(); initStars() }

    resize()
    initStars()
    draw()
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section id="hero">
      <div className="hero-content">
        <h1 className="hero-name">Arthur Huang</h1>
        <p className="hero-title">Northeastern University, Boston, MA</p>
        <div className="hero-divider" />
        <p className="hero-eyebrow">Computer Science · Artificial Intelligence · Electrical Engineering</p>
        <div className="hero-btns">
          <a href="#experience" className="btn btn-fill"><span>View My Experiences</span></a>
          <a href="#contact" className="btn"><span>Get In Touch</span></a>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
      />
    </section>
  )
}
