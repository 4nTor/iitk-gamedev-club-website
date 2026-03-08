import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import { learningTracks } from '../utils/content';

const LearningPage = () => {
  return (
    <div>
      <SectionHeader
        title="Learning Roadmaps"
        subtitle="Progressive paths for game dev disciplines. Pick a track and follow the resource stack."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {learningTracks.map((track) => (
          <Card key={track.title}>
            <h2 className="text-xl font-semibold">{track.title}</h2>
            <p className="mt-1 text-sm text-accent">{track.level}</p>
            <ul className="mt-4 space-y-2">
              {track.resources.map(([label, href]) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noreferrer" className="text-sm text-slate-300 hover:text-accent">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LearningPage;