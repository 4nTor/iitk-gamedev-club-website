import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import { fetchCsv } from '../utils/csv';

const winningGameTitles = new Set(['cell - o', 'cell-o', 'ignition evade']);

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    Promise.all([fetchCsv('/data/projects.csv'), fetchCsv('/data/events.csv')])
      .then(([projectRows, eventRows]) => {
        const winningGames = projectRows.filter((project) => winningGameTitles.has(project.title.toLowerCase()));
        setProjects(winningGames);
        setEvents(eventRows);
      })
      .catch((error) => console.error(error));
  }, []);

  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return events
      .filter((event) => new Date(event.date) >= now)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3);
  }, [events]);

  return (
    <div className="space-y-14">
      <section className="rounded-3xl border border-slate-700/70 bg-panel/70 bg-grid bg-[size:36px_36px] p-8 shadow-glow sm:p-12">
        <SectionHeader
          title="Game Development Club"
          subtitle="Game Development Club, IIT Kanpur is where programmers, artists, designers, and storytellers collaborate to ship playable ideas."
        />
        <div className="mb-6 text-sm uppercase tracking-[0.16em] text-slate-400">Learn.Play.Create.</div>
        <div className="flex flex-wrap gap-4">
          <Link to="/projects" className="btn-primary">
            Explore Projects
          </Link>
          <Link to="/learning" className="btn-secondary">
            Start Learning
          </Link>
          <a href="#about-us" className="btn-secondary">
            About Us
          </a>
        </div>
      </section>

      <section id="about-us" className="scroll-mt-28">
        <h2 className="mb-5 text-2xl font-semibold">About Us</h2>
        <Card className="space-y-5 text-slate-300">
          <p>
            Game development has evolved tremendously over the years, transforming from simple pixel-based games to
            complex, immersive experiences. Today, game development encompasses various domains, each crucial to
            creating engaging and visually stunning games. From game design, which lays the foundation for gameplay
            mechanics, to programming that brings these ideas to life, every aspect is vital. Shaders add depth and
            realism to game graphics, enhancing visual appeal, while game AI creates intelligent, adaptive characters
            that challenge and entertain players. Sound design and narrative writing further enrich the gaming
            experience, making game development a multidisciplinary field that blends art and technology.
          </p>
          <p>
            The Game Development Club at IIT Kanpur actively fosters this creativity and innovation. The club conducts
            regular workshops and bootcamps, welcoming newcomers to explore the world of game development. Through
            brainstorming sessions and collaborative game-making activities, members refine their skills and bring
            their ideas to life. The club also participates in various game jams, where members compete and win
            prizes, demonstrating their talent on national and international platforms. The club also proudly
            represents IIT Kanpur in the Inter-IIT Tech Meet, where last year, the team secured a bronze medal,
            showcasing their game development prowess.
          </p>
          <p>
            Looking forward, the Game Development Club is now venturing into the exciting realms of the metaverse,
            exploring the potential of AR and VR technologies. By developing games that push the boundaries of
            reality, the club is at the forefront of this emerging field, offering members the chance to be part of
            the future of game development.
          </p>
        </Card>
      </section>

      <section>
        <h2 className="mb-5 text-2xl font-semibold">Inter IIT TechMeet Winners</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.title}>
              {project.image ? (
                <img src={project.image} alt={project.title} loading="lazy" className="mb-4 h-44 w-full rounded-xl object-cover" />
              ) : null}
              <h3 className="text-xl font-semibold">{project.title}</h3>
              {project.description ? <p className="mt-2 text-sm text-slate-300">{project.description}</p> : null}
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-5 text-2xl font-semibold">Upcoming Events</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {upcomingEvents.map((event) => (
            <Card key={`${event.title}-${event.date}`}>
              <p className="text-sm text-accent">{new Date(event.date).toDateString()}</p>
              <h3 className="mt-2 text-lg font-semibold">{event.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{event.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-5 text-2xl font-semibold">Quick Links to Learning Roadmaps</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {['Unity', 'Godot', 'AR/VR', 'Rendering', 'Game Art', 'Sound Design'].map((track) => (
            <Link key={track} to="/learning" className="card text-center text-lg font-semibold">
              {track}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;