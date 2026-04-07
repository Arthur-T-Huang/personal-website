export default function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <div className="contact-inner">
          <p className="section-label reveal">Contact</p>
          <h2 className="section-title reveal">Let's Connect</h2>
          <div className="section-rule reveal" style={{ margin: '0 auto 2rem' }} />
          <p className="reveal">
            I'm open to co-op and internship opportunities in software engineering, machine learning, and robotics for
            June – August 2026.
          </p>
          <div className="contact-actions reveal">
            <a href="mailto:huang.arth@northeastern.edu?subject=Let's Connect" className="btn btn-fill">
              <span>Send a Message</span>
            </a>
            <a href="tel:5183645297" className="btn">
              <span>518-364-5297</span>
            </a>
          </div>
          <div className="contact-socials reveal">
            <a href="https://github.com/Arthur-T-Huang" target="_blank" rel="noreferrer" className="social-link">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              github.com/Arthur-T-Huang
            </a>
            <a href="https://www.linkedin.com/in/arthur-t-huang/" target="_blank" rel="noreferrer" className="social-link">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              linkedin.com/in/arthur-t-huang
            </a>
            <a href="mailto:huang.arth@northeastern.edu" className="social-link">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              huang.arth@northeastern.edu
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
