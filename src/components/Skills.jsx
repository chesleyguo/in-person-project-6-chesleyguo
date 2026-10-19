const skills = [
  { name: 'JavaScript (ES6+)', icon: '🚀', category: 'Core Web', level: 92 },
  { name: 'React', icon: '⚛️', category: 'Frontend Framework', level: 88 },
  { name: 'CSS3 & Layouts', icon: '🎨', category: 'Styling', level: 90 },
  { name: 'Python & Data', icon: '🐍', category: 'Programming & ML', level: 85 },
  { name: 'Git & GitHub', icon: '🛠️', category: 'Tools', level: 86 },
  { name: 'Node.js & APIs', icon: '🌐', category: 'Backend Integration', level: 80 }
];

function Skills() {
  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <h2>Skills & Technologies</h2>
        <div className="skills-grid">
          {skills.map((skill) => (
            <div key={skill.name} className="skill-card">
              <div className="skill-header">
                <span className="skill-icon">{skill.icon}</span>
                <h3 className="skill-name">{skill.name}</h3>
              </div>
              <div className="skill-category">{skill.category}</div>
              <div className="skill-level">
                <div className="skill-progress" style={{ '--skill-level': `${skill.level}%` }}></div>
              </div>
              <span className="skill-percentage">{skill.level}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
