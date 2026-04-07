import { projects } from '../data/projects'

const stagger = ['stagger-1', 'stagger-2', 'stagger-3']

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <p className="section-label reveal">Work</p>
        <h2 className="section-title reveal">Featured Projects</h2>
        <div className="section-rule reveal" />
        <div className="projects-grid">
          {projects.map((project, i) => (
            <div className={`project-card reveal ${stagger[i] || ''}`} key={project.id}>
              {project.award && <div className="project-award">{project.award}</div>}
              <span className="project-tag">{project.tag}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tech">
                {project.tech.map((t) => (
                  <span className="tech-badge" key={t}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
