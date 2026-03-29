import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import ScrollReveal from '../components/ScrollReveal';
import { fetchCsv } from '../utils/csv';

const winningGameTitles = new Set(['cell - o', 'cell-o', 'ignition evade']);

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    Promise.all([fetchCsv('/data/games.csv'), fetchCsv('/data/events.csv')])
      .then(([gameRows, eventRows]) => {
        const winningGames = gameRows.filter((game) => winningGameTitles.has(game.title.toLowerCase()));
        setGames(winningGames);
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
      <ScrollReveal
        as="section"
        className="hero-console rounded-[2rem] border border-white/10 px-6 py-10 sm:px-8 sm:py-12 lg:min-h-[78vh] lg:px-10 lg:py-14"
        distance={34}
      >
        <div className="relative z-10 flex min-h-[65vh] max-w-5xl flex-col justify-center">
          <h1 className="max-w-5xl text-[2.05rem] font-semibold uppercase leading-[0.98] tracking-[0.04em] text-white sm:text-[3.35rem] lg:text-[5.1rem]">
            Game Development Club
          </h1>

          <p className="mt-5 text-[1.35rem] uppercase tracking-[0.2em] text-slate-300 sm:text-[1.55rem] lg:text-[1.8rem]">IIT Kanpur</p>

          <p className="mt-4 text-sm uppercase tracking-[0.26em] text-slate-400 sm:text-base lg:text-lg">Learn. Play. Create.</p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/games" className="btn-primary rounded-md px-6 py-4 text-lg uppercase tracking-[0.12em]">
              Explore Games
            </Link>
            <Link to="/learning" className="btn-secondary rounded-md px-6 py-4 text-lg uppercase tracking-[0.12em]">
              Start Learning
            </Link>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" id="about-us" className="scroll-mt-28" distance={26}>
        <h2 className="mb-5 text-2xl font-semibold">About Us</h2>
        <Card className="space-y-5 text-slate-300 hover:translate-y-0 hover:border-white/10 hover:shadow-lg">
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
      </ScrollReveal>

      <ScrollReveal as="section" distance={24}>
        <h2 className="mb-5 text-2xl font-semibold">Inter IIT TechMeet Winners</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {games.map((game, index) => (
            <ScrollReveal key={game.title} delay={index * 110} distance={24}>
              <Card>
                {game.image ? <img src={game.image} alt={game.title} loading="lazy" className="mb-4 h-44 w-full rounded-xl object-cover" /> : null}
                <h3 className="text-xl font-semibold">{game.title}</h3>
                {game.description ? <p className="mt-2 text-sm text-slate-300">{game.description}</p> : null}
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" distance={24}>
        <h2 className="mb-5 text-2xl font-semibold">Upcoming Events</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {upcomingEvents.map((event, index) => (
            <ScrollReveal key={`${event.title}-${event.date}`} delay={index * 90} distance={22}>
              <Card>
                <p className="text-sm text-accent">{new Date(event.date).toDateString()}</p>
                <h3 className="mt-2 text-lg font-semibold">{event.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{event.description}</p>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" distance={24}>
        <h2 className="mb-5 text-2xl font-semibold">Quick Links to Learning Roadmaps</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {['Unity', 'Godot', 'AR/VR', 'Rendering', 'Game Art', 'Sound Design'].map((track, index) => (
            <ScrollReveal key={track} delay={index * 70} distance={20}>
              <Link to="/learning" className="card block text-center text-lg font-semibold">
                {track}
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
};

export default HomePage;
