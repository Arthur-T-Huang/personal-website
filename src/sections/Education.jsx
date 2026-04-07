export default function Education() {
  return (
    <section id="education">
      <div className="container">
        <p className="section-label reveal">Education</p>
        <h2 className="section-title reveal">Academic Background</h2>
        <div className="section-rule reveal" />
        <div className="edu-card reveal">
          <div className="edu-left">
            <h3>Northeastern University</h3>
            <h4>B.S. Computer Science — Concentration: Artificial Intelligence &nbsp;·&nbsp; Minor: Electrical Engineering</h4>
            <div className="edu-badges">
              {[
                { label: 'Honors Program', variant: 'cobalt' },
                { label: "Dean's List Scholar", variant: 'cobalt' },
                { label: 'John Martinson Honors Scholarship', variant: 'cobalt' },
                { label: '1st Place ViTAL Hackathon', variant: 'gold' },
              ].map(({ label, variant }) => (
                <span key={label} className={`edu-badge edu-badge-${variant}`}>{label}</span>
              ))}
            </div>
            <div className="edu-courses">
              <h5>Relevant Coursework</h5>
              <p>Program Design & Implementation II, Introduction to Databases, Foundations of Data Science, Fundamentals of CS I & II, Foundations of Cyber Security, Discrete Structures</p>
            </div>
          </div>
          <div className="edu-right">
            <div className="gpa">3.93</div>
            <div className="gpa-label">GPA / 4.0</div>
            <div className="grad">Expected May 2028</div>
            <div style={{ marginTop: '1rem', fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              Boston, MA
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
