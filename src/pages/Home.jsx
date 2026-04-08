import { useEffect } from 'react'
import { useScrollReveal, useSectionTitleReveal } from '../hooks/useScrollReveal'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Skills from '../sections/Skills'
import Projects from '../sections/Projects'
import Experience from '../sections/Experience'
import Education from '../sections/Education'
import Contact from '../sections/Contact'

export default function Home() {
  useScrollReveal()
  useSectionTitleReveal()

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
    </>
  )
}
