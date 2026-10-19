import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

// App owns the project data; Projects filters and adds to it, Footer shows the count
const initialProjects = [
  {
    id: 1,
    title: 'Cal Campus Hub',
    description:
      'A central dashboard for Berkeley students to aggregate course schedules, campus events, and study group organization in real time.',
    category: 'fullstack',
    image: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Cal Student Hub',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind'],
    featured: true
  },
  {
    id: 2,
    title: 'Climate Viz Dashboard',
    description:
      'Interactive data visualization portal tracking microclimate changes across Northern California using dynamic charts.',
    category: 'frontend',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Berkeley Climate Data Visualizer',
    tags: ['JavaScript', 'Chart.js', 'CSS3 Grid']
  },
  {
    id: 3,
    title: 'AI Study Assistant',
    description:
      'A smart task scheduling web application that organizes exam preparation based on active recall algorithms.',
    category: 'webapp',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'AI Study Planner',
    tags: ['JavaScript', 'OpenAI API', 'LocalStorage']
  },
  {
    id: 4,
    title: 'Berkeley Blue UI Kit',
    description:
      "An accessible component library styled with UC Berkeley's iconic brand palette for modern academic websites.",
    category: 'design',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Design System',
    tags: ['HTML5', 'CSS Var', 'Figma']
  }
];

function App() {
  const [projects, setProjects] = useState(initialProjects);

  const handleAddProject = (newProject) => {
    setProjects((prev) => [...prev, newProject]);
  };

  return (
    <div className="portfolio">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects projects={projects} onAddProject={handleAddProject} />
      <Contact />
      <Footer projectCount={projects.length} />
    </div>
  );
}

export default App;
