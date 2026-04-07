import { Link } from 'react-router-dom'
import Slideshow from '../components/Slideshow'
import SpotifyRecent from '../components/SpotifyRecent'

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <p className="section-label reveal">About</p>
            <h2 className="section-title reveal">Getting to Know Me</h2>
            <div className="section-rule reveal" />
            <p className="reveal stagger-1">
              I'm a Computer Science student at Northeastern University concentrating in Artificial Intelligence with a
              minor in Electrical Engineering. I currently serve as a Technology Engineer Co-op at Harvard University IT
              and a Robotics Navigation Researcher at WPI's Aerial-robot Control & Perception Lab, with prior experience
              as an Aerial Robotics Intern at NYU's ARPL and a Teaching Assistant at Khoury College.
            </p>
            <div className="hobbies-section reveal stagger-2">
              <h4>Outside of Work</h4>
              <p style={{ color: 'var(--mid)', fontWeight: 300, fontSize: '0.93rem', lineHeight: 1.7 }}>
                When I'm not coding or researching, you'll find me on the golf course, hitting the ski slopes, exploring
                new destinations around the world, or experimenting in the kitchen. I'm also a big movie fan — my
                all-time favorites are Interstellar, Good Will Hunting, and 21 Jump Street.
              </p>
            </div>
            <div className="awards reveal stagger-3">
              <h4>Honors & Awards</h4>
              {['Northeastern Dean\'s List Scholar', 'John Martinson Honors Scholarship', 'Honors Program, Northeastern University'].map((award) => (
                <div className="award-item" key={award}>
                  <div className="award-dot" />
                  <span>{award}</span>
                </div>
              ))}
            </div>
            <div className="contact-row reveal stagger-4">
              <a href="mailto:huang.arth@northeastern.edu" className="contact-chip">huang.arth@northeastern.edu</a>
              <a href="tel:5183645297" className="contact-chip">518-364-5297</a>
              <Link to="/resume" className="contact-chip resume-chip">
                ⬇ Resume
              </Link>
            </div>
          </div>
          <div className="reveal">
            <Slideshow />
            <p className="spotify-intro">See what I've been listening to lately</p>
            <SpotifyRecent />
          </div>
        </div>
      </div>
    </section>
  )
}
