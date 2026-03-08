import { useEffect, useState } from 'react';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import { fetchCsv } from '../utils/csv';

const TeamPage = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchCsv('/data/team.csv')
      .then(setMembers)
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <SectionHeader
        title="Core Team"
        subtitle="Team cards are generated directly from /public/data/team.csv so updates can happen from GitHub without code edits."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {members.map((member) => (
          <Card key={member.name} className="text-center">
            <img
              src={member.photo}
              alt={member.name}
              loading="lazy"
              className="mx-auto mb-4 h-28 w-28 rounded-full border border-slate-600 object-cover"
            />
            <h3 className="text-lg font-semibold">{member.name}</h3>
            <p className="text-sm text-accent">{member.role}</p>
            <div className="mt-3 flex justify-center gap-3 text-sm">
              <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-accent">
                LinkedIn
              </a>
              <a href={member.github} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-accent">
                GitHub
              </a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;