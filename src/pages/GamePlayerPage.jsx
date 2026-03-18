import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import { fetchCsv } from '../utils/csv';
import { getGameSlugFromPath } from '../utils/games';

const GamePlayerPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetchCsv('/data/projects.csv')
      .then((rows) => {
        const matchedProject = rows.find((entry) => getGameSlugFromPath(entry.play) === slug);
        setProject(matchedProject || null);
      })
      .catch((error) => console.error(error));
  }, [slug]);

  const gameSrc = `/games/${slug}/index.html`;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <SectionHeader
          title={project?.title || 'Game Player'}
          subtitle={project?.description || 'Play the embedded WebGL build without leaving the Studio Centauri website.'}
        />
        <div className="flex gap-3">
          <Link to="/projects" className="btn-secondary">
            Back to Projects
          </Link>
        </div>
      </div>

      <Card className="overflow-hidden p-3 sm:p-4">
        <div className="aspect-[16/10] min-h-[480px] overflow-hidden rounded-2xl border border-slate-800 bg-black">
          <iframe title={project?.title || slug} src={gameSrc} className="h-full w-full" allowFullScreen />
        </div>
      </Card>
    </div>
  );
};

export default GamePlayerPage;