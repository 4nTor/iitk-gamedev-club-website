import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import { fetchCsv } from '../utils/csv';

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [renderMondays, setRenderMondays] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    Promise.all([
      fetchCsv('/data/projects.csv'),
      fetchCsv('/data/rendermondays.csv'),
      fetchCsv('/data/events.csv'),
    ])
      .then(([projectRows, renderRows, eventRows]) => {
        setProjects(projectRows.slice(0, 3));
        setRenderMondays(renderRows.slice(0, 4));
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

  const heroRender = renderMondays[0];
  const sideRenders = renderMondays.slice(1, 4);

  return (
    <div className="space-y-14">
      <section className="rounded-3xl border border-slate-700/70 bg-panel/70 bg-grid bg-[size:36px_36px] p-8 shadow-glow sm:p-12">
        <SectionHeader
          title="Studio Centauri"
          subtitle="The Game Development Club at IIT Kanpur where programmers, artists, designers, and storytellers collaborate to ship playable ideas."
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

      <section>
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold">RenderMondays Spotlight</h2>
          <Link to="/rendermondays" className="btn-secondary text-sm">
            View All Weeks
          </Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {heroRender ? (
            <Card className="lg:col-span-2 p-3">
              <img
                src={heroRender.image}
                alt={heroRender.title}
                loading="lazy"
                className="h-72 w-full rounded-2xl object-cover sm:h-96"
              />
              <div className="p-3 sm:p-4">
                <p className="text-sm text-accent">Featured Submission - Week {heroRender.week}</p>
                <h3 className="mt-1 text-2xl font-semibold">{heroRender.title}</h3>
                <p className="text-slate-300">Artwork by {heroRender.artist}</p>
              </div>
            </Card>
          ) : null}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {sideRenders.map((item) => (
              <Card key={`${item.title}-${item.week}`}>
                <img src={item.image} alt={item.title} loading="lazy" className="mb-4 h-40 w-full rounded-xl object-cover" />
                <p className="text-sm text-accent">Week {item.week}</p>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-slate-300">By {item.artist}</p>
              </Card>
            ))}
          </div>
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
        <h2 className="mb-5 text-2xl font-semibold">Featured Student Games</h2>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.title}>
              <img src={project.image} alt={project.title} loading="lazy" className="mb-4 h-44 w-full rounded-xl object-cover" />
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{project.description}</p>
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