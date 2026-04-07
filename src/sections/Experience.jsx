import { experience } from '../data/experience'

const stagger = ['stagger-1', 'stagger-2', 'stagger-3', 'stagger-4']

export default function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <p className="section-label reveal">Background</p>
        <h2 className="section-title reveal">Work Experience</h2>
        <div className="section-rule reveal" />
        <div className="exp-grid">
          {experience.map((job, i) => (
            <div className={`exp-card reveal ${stagger[i] || ''}`} key={job.id}>
              <div className="exp-meta">
                <p className="exp-date">{job.period}</p>
                <p className="exp-location">{job.location}</p>
              </div>
              <div className="exp-content">
                <h3>{job.role}</h3>
                <h4>{job.company}</h4>
                <ul className="exp-bullets">
                  {job.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
