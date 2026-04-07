import { skills } from '../data/skills'

const stagger = ['stagger-1', 'stagger-2', 'stagger-3']

export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <p className="section-label reveal">Expertise</p>
        <h2 className="section-title reveal">Skills & Technologies</h2>
        <div className="section-rule reveal" />
        <div className="skills-grid">
          {skills.map((group, i) => (
            <div className={`skill-group reveal ${stagger[i] || ''}`} key={group.id}>
              <h4>{group.label}</h4>
              {group.items.map((item) => (
                <div className="skill-item" key={item.name}>
                  <img src={item.icon} alt={item.name} />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
