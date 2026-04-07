import { useEffect } from 'react'

export function useScrollReveal(selector = '.reveal, .reveal-left') {
  useEffect(() => {
    const elements = document.querySelectorAll(selector)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            if (entry.target.classList.contains('section-title')) {
              entry.target.classList.add('in-view')
            }
          }
        })
      },
      { threshold: 0.1 }
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [selector])
}

export function useSectionTitleReveal() {
  useEffect(() => {
    const titles = document.querySelectorAll('.section-title')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in-view')
        })
      },
      { threshold: 0.3 }
    )
    titles.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
