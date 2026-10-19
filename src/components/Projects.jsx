// State: which filter is active? -> activeFilter (string, starts 'all'); the filtered list is derived, not stored
// The projects array lives in App's state; new projects go up through onAddProject
import { useState } from 'react';

const FILTERS = [
  { value: 'all', label: 'All Projects' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'fullstack', label: 'Full-Stack' },
  { value: 'webapp', label: 'Web App' },
  { value: 'design', label: 'Design' }
];

const CATEGORIES = FILTERS.filter((f) => f.value !== 'all');

const getCategoryLabel = (category) =>
  CATEGORIES.find((c) => c.value === category)?.label ?? category;

function Projects({ projects, onAddProject }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState(CATEGORIES[0].value);
  const [titleError, setTitleError] = useState('');

  // Derived from projects + activeFilter on every render, never stored in state
  const filteredProjects =
    activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter);

  const handleAddProject = (e) => {
    e.preventDefault();

    if (newTitle.trim() === '') {
      setTitleError('Title is required');
      return;
    }

    onAddProject({
      id: Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      description: '',
      tags: []
    });
    setNewTitle('');
    setTitleError('');
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2>Featured Projects</h2>

        <form className="add-project-form" onSubmit={handleAddProject} noValidate>
          <div className="form-group">
            <label htmlFor="new-project-title">Project title</label>
            <input
              type="text"
              id="new-project-title"
              className={titleError ? 'error' : ''}
              value={newTitle}
              onChange={(e) => {
                setNewTitle(e.target.value);
                setTitleError('');
              }}
            />
            {titleError && <span className="error-message">{titleError}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="new-project-category">Category</label>
            <select
              id="new-project-category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            >
              {CATEGORIES.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Add Project
          </button>
        </form>

        <div className="filter-buttons">
          {FILTERS.map(({ value, label }) => (
            <button
              key={value}
              className={`filter-btn ${activeFilter === value ? 'active' : ''}`}
              onClick={() => setActiveFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>

        <p className="project-count">
          Showing {filteredProjects.length} of {projects.length} projects
        </p>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`project-card ${project.featured ? 'featured' : ''}`}
            >
              {project.image && (
                <div className="project-image">
                  <img src={project.image} alt={project.imageAlt} />
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
              )}
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-category">{getCategoryLabel(project.category)}</span>
                </div>
                {project.description && <p className="project-description">{project.description}</p>}
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
