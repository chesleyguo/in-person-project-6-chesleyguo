function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <h2>About Me</h2>
        <div className="about-grid">
          <div className="about-text">
            <p>
              Hello! I'm Chesley Guo, a student at UC Berkeley passionate about software engineering, interactive web applications, and artificial intelligence. I enjoy turning complex data and designs into seamless, high-performance user experiences.
            </p>
            <div className="about-details">
              <div className="detail-item">
                <span className="detail-icon">📍</span>
                <span>Berkeley, CA</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">✉️</span>
                <a href="mailto:chesleyguo@berkeley.edu">chesleyguo@berkeley.edu</a>
              </div>
              <div className="detail-item">
                <span className="detail-icon">🎓</span>
                <span>UC Berkeley</span>
              </div>
            </div>
          </div>
          <div className="about-availability">
            <h3>Currently Open For:</h3>
            <div className="availability-tags">
              <span className="tag tag-available">Software Internships</span>
              <span className="tag tag-available">Research Projects</span>
              <span className="tag tag-available">Open Source</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
