/**
 * Smooth-scrolls the hero buttons to their section
 * @param {React.MouseEvent<HTMLAnchorElement>} e
 */
const handleLinkClick = (e) => {
  e.preventDefault();
  const targetId = e.currentTarget.getAttribute('href').slice(1);
  document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Chesley Guo</h1>
        <p className="hero-subtitle">UC Berkeley Student | Frontend & AI Developer</p>
        <p className="hero-tagline">
          Building modern, accessible, and data-driven web applications at the intersection of design and intelligence.
        </p>
        <div className="hero-buttons">
          <a href="#projects" className="btn btn-primary" onClick={handleLinkClick}>
            View Projects
          </a>
          <a href="#contact" className="btn btn-secondary" onClick={handleLinkClick}>
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
