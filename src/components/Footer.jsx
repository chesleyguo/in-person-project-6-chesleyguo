function Footer({ projectCount }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Chesley Guo. UC Berkeley. All rights reserved.</p>
          <p>{projectCount} {projectCount === 1 ? 'project' : 'projects'}</p>
          <div className="social-links">
            <a href="https://github.com" className="social-link" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://linkedin.com" className="social-link" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="mailto:chesleyguo@berkeley.edu" className="social-link">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
