import { useEffect } from 'react';
import './App.css';

/**
 * Monolithic React Component for Chesley Guo's Interactive Portfolio
 * Migrated from Vanilla JS (Week 6) to React + Vite (Week 7)
 */
function App() {
  // ============================================
  // PART 1: SMOOTH SCROLL & ACTIVE NAV HIGHLIGHT
  // ============================================

  /**
   * Handles smooth scrolling for navigation links
   * @param {React.MouseEvent<HTMLAnchorElement>} e
   */
  const handleNavClick = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    // Close mobile menu if open
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    if (navMenu && navToggle) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
  };

  /**
   * Highlights active nav link based on scroll position
   */
  const handleScroll = () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach((link) => {
          link.classList.remove('active');
        });

        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // ============================================
  // PART 2: PROJECT FILTERING
  // ============================================

  /**
   * Handles project card filtering
   * @param {React.MouseEvent<HTMLButtonElement>} e
   */
  const handleFilterClick = (e) => {
    const filterValue = e.currentTarget.getAttribute('data-filter');
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach((card) => {
      const cardCategory = card.getAttribute('data-category');

      if (filterValue === 'all' || cardCategory === filterValue) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });

    document.querySelectorAll('.filter-btn').forEach((btn) => {
      btn.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
  };

  // ============================================
  // PART 3: MOBILE MENU TOGGLE
  // ============================================

  /**
   * Handles mobile hamburger menu toggle
   */
  const handleMobileMenuToggle = () => {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');

    if (navMenu && navToggle) {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    }
  };

  // ============================================
  // PART 5: FORM VALIDATION
  // ============================================

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const showError = (input, message) => {
    clearError(input);
    const error = document.createElement('span');
    error.className = 'error-message';
    error.textContent = message;

    input.classList.add('error');
    input.classList.remove('success');
    input.parentElement.appendChild(error);
  };

  const clearError = (input) => {
    const error = input.parentElement.querySelector('.error-message');
    if (error) {
      error.remove();
    }
    input.classList.remove('error');
  };

  const showSuccess = (input) => {
    clearError(input);
    input.classList.add('success');
    input.classList.remove('error');
  };

  const handleInputChange = (e) => {
    const input = e.target;
    const value = input.value.trim();

    if (input.id === 'name') {
      if (value.length < 2) {
        showError(input, 'Name must be at least 2 characters');
      } else {
        showSuccess(input);
      }
    } else if (input.id === 'email') {
      if (!isValidEmail(value)) {
        showError(input, 'Please enter a valid email address');
      } else {
        showSuccess(input);
      }
    } else if (input.id === 'message') {
      if (value.length < 10) {
        showError(input, 'Message must be at least 10 characters');
      } else {
        showSuccess(input);
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const messageInput = document.querySelector('#message');

    let isValid = true;

    if (!nameInput || nameInput.value.trim().length < 2) {
      showError(nameInput, 'Name must be at least 2 characters');
      isValid = false;
    } else {
      showSuccess(nameInput);
    }

    if (!emailInput || !isValidEmail(emailInput.value.trim())) {
      showError(emailInput, 'Please enter a valid email address');
      isValid = false;
    } else {
      showSuccess(emailInput);
    }

    if (!messageInput || messageInput.value.trim().length < 10) {
      showError(messageInput, 'Message must be at least 10 characters');
      isValid = false;
    } else {
      showSuccess(messageInput);
    }

    if (isValid) {
      alert('Thank you for reaching out! Your message has been sent.');
      e.currentTarget.reset();
      [nameInput, emailInput, messageInput].forEach((input) => {
        if (input) input.classList.remove('success', 'error');
      });
    }
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav id="navbar">
        <div className="nav-brand">
          <span>Chesley Guo</span>
        </div>
        <ul className="nav-menu">
          <li>
            <a href="#home" className="nav-link active" onClick={handleNavClick}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="nav-link" onClick={handleNavClick}>
              About
            </a>
          </li>
          <li>
            <a href="#skills" className="nav-link" onClick={handleNavClick}>
              Skills
            </a>
          </li>
          <li>
            <a href="#projects" className="nav-link" onClick={handleNavClick}>
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" className="nav-link" onClick={handleNavClick}>
              Contact
            </a>
          </li>
        </ul>
        <div className="nav-toggle" onClick={handleMobileMenuToggle}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Chesley Guo</h1>
          <p className="hero-subtitle">UC Berkeley Student | Frontend & AI Developer</p>
          <p className="hero-tagline">
            Building modern, accessible, and data-driven web applications at the intersection of design and intelligence.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary" onClick={handleNavClick}>
              View Projects
            </a>
            <a href="#contact" className="btn btn-secondary" onClick={handleNavClick}>
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
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

      {/* Skills Section */}
      <section id="skills" className="section section-alt">
        <div className="container">
          <h2>Skills & Technologies</h2>
          <div className="skills-grid">
            <div className="skill-card">
              <div className="skill-header">
                <span className="skill-icon">🚀</span>
                <h3 className="skill-name">JavaScript (ES6+)</h3>
              </div>
              <div className="skill-category">Core Web</div>
              <div className="skill-level">
                <div className="skill-progress" style={{ '--skill-level': '92%' }}></div>
              </div>
              <span className="skill-percentage">92%</span>
            </div>

            <div className="skill-card">
              <div className="skill-header">
                <span className="skill-icon">⚛️</span>
                <h3 className="skill-name">React</h3>
              </div>
              <div className="skill-category">Frontend Framework</div>
              <div className="skill-level">
                <div className="skill-progress" style={{ '--skill-level': '88%' }}></div>
              </div>
              <span className="skill-percentage">88%</span>
            </div>

            <div className="skill-card">
              <div className="skill-header">
                <span className="skill-icon">🎨</span>
                <h3 className="skill-name">CSS3 & Layouts</h3>
              </div>
              <div className="skill-category">Styling</div>
              <div className="skill-level">
                <div className="skill-progress" style={{ '--skill-level': '90%' }}></div>
              </div>
              <span className="skill-percentage">90%</span>
            </div>

            <div className="skill-card">
              <div className="skill-header">
                <span className="skill-icon">🐍</span>
                <h3 className="skill-name">Python & Data</h3>
              </div>
              <div className="skill-category">Programming & ML</div>
              <div className="skill-level">
                <div className="skill-progress" style={{ '--skill-level': '85%' }}></div>
              </div>
              <span className="skill-percentage">85%</span>
            </div>

            <div className="skill-card">
              <div className="skill-header">
                <span className="skill-icon">🛠️</span>
                <h3 className="skill-name">Git & GitHub</h3>
              </div>
              <div className="skill-category">Tools</div>
              <div className="skill-level">
                <div className="skill-progress" style={{ '--skill-level': '86%' }}></div>
              </div>
              <span className="skill-percentage">86%</span>
            </div>

            <div className="skill-card">
              <div className="skill-header">
                <span className="skill-icon">🌐</span>
                <h3 className="skill-name">Node.js & APIs</h3>
              </div>
              <div className="skill-category">Backend Integration</div>
              <div className="skill-level">
                <div className="skill-progress" style={{ '--skill-level': '80%' }}></div>
              </div>
              <span className="skill-percentage">80%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <div className="container">
          <h2>Featured Projects</h2>

          <div className="filter-buttons">
            <button className="filter-btn active" data-filter="all" onClick={handleFilterClick}>
              All Projects
            </button>
            <button className="filter-btn" data-filter="frontend" onClick={handleFilterClick}>
              Frontend
            </button>
            <button className="filter-btn" data-filter="fullstack" onClick={handleFilterClick}>
              Full-Stack
            </button>
            <button className="filter-btn" data-filter="webapp" onClick={handleFilterClick}>
              Web App
            </button>
            <button className="filter-btn" data-filter="design" onClick={handleFilterClick}>
              Design
            </button>
          </div>

          <div className="projects-grid">
            {/* Project 1 */}
            <div className="project-card featured" data-category="fullstack">
              <div className="project-image">
                <img
                  src="https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&w=800&q=80"
                  alt="Cal Student Hub"
                />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href="#" className="project-link">
                      <span>🔗</span> Live Demo
                    </a>
                    <a href="#" className="project-link">
                      <span>💻</span> Code
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">Cal Campus Hub</h3>
                  <span className="project-category">Full-Stack</span>
                </div>
                <p className="project-description">
                  A central dashboard for Berkeley students to aggregate course schedules, campus events, and study group organization in real time.
                </p>
                <div className="project-tags">
                  <span className="project-tag">React</span>
                  <span className="project-tag">Node.js</span>
                  <span className="project-tag">PostgreSQL</span>
                  <span className="project-tag">Tailwind</span>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="project-card" data-category="frontend">
              <div className="project-image">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
                  alt="Berkeley Climate Data Visualizer"
                />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href="#" className="project-link">
                      <span>🔗</span> Live Demo
                    </a>
                    <a href="#" className="project-link">
                      <span>💻</span> Code
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">Climate Viz Dashboard</h3>
                  <span className="project-category">Frontend</span>
                </div>
                <p className="project-description">
                  Interactive data visualization portal tracking microclimate changes across Northern California using dynamic charts.
                </p>
                <div className="project-tags">
                  <span className="project-tag">JavaScript</span>
                  <span className="project-tag">Chart.js</span>
                  <span className="project-tag">CSS3 Grid</span>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="project-card" data-category="webapp">
              <div className="project-image">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
                  alt="AI Study Planner"
                />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href="#" className="project-link">
                      <span>🔗</span> Live Demo
                    </a>
                    <a href="#" className="project-link">
                      <span>💻</span> Code
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">AI Study Assistant</h3>
                  <span className="project-category">Web App</span>
                </div>
                <p className="project-description">
                  A smart task scheduling web application that organizes exam preparation based on active recall algorithms.
                </p>
                <div className="project-tags">
                  <span className="project-tag">JavaScript</span>
                  <span className="project-tag">OpenAI API</span>
                  <span className="project-tag">LocalStorage</span>
                </div>
              </div>
            </div>

            {/* Project 4 */}
            <div className="project-card" data-category="design">
              <div className="project-image">
                <img
                  src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"
                  alt="Design System"
                />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href="#" className="project-link">
                      <span>🔗</span> Live Demo
                    </a>
                    <a href="#" className="project-link">
                      <span>💻</span> Code
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">Berkeley Blue UI Kit</h3>
                  <span className="project-category">Design</span>
                </div>
                <p className="project-description">
                  An accessible component library styled with UC Berkeley's iconic brand palette for modern academic websites.
                </p>
                <div className="project-tags">
                  <span className="project-tag">HTML5</span>
                  <span className="project-tag">CSS Var</span>
                  <span className="project-tag">Figma</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section section-alt">
        <div className="container">
          <h2>Get In Touch</h2>
          <div className="contact-content">
            <p>Feel free to reach out for collaborations, project inquiries, or just to say hello!</p>

            <form id="contact-form" className="contact-form" onSubmit={handleFormSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group form-group-full">
                  <label htmlFor="subject">Subject</label>
                  <input type="text" id="subject" name="subject" />
                </div>

                <div className="form-group form-group-full">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div className="form-group form-group-full">
                  <button type="submit" className="btn btn-primary">
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p>&copy; {new Date().getFullYear()} Chesley Guo. UC Berkeley. All rights reserved.</p>
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
    </>
  );
}

export default App;