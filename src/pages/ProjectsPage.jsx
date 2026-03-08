import { useEffect, useState } from 'react';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import { fetchCsv } from '../utils/csv';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchCsv('/data/projects.csv')
      .then(setProjects)
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <SectionHeader
        title="Club Projects"
        subtitle="Hands-on games and tools built by IITK students. Update projects by editing /public/data/projects.csv."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.title}>
            <img src={project.image} alt={project.title} loading="lazy" className="mb-4 h-48 w-full rounded-xl object-cover" />
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{project.description}</p>
            <div className="mt-4 flex gap-3">
              <a href={project.github} target="_blank" rel="noreferrer" className="btn-secondary text-sm">
                GitHub
              </a>
              <a href={project.play} target="_blank" rel="noreferrer" className="btn-primary text-sm">
                Play
              </a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;