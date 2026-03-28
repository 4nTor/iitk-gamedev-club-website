import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
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
      <section className="hero-console rounded-[2rem] border border-white/10 px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        <div className="relative z-10 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_320px] lg:items-stretch">
          <div className="console-panel flex flex-col justify-between gap-8 p-5 sm:p-6">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="console-chip">Bridge Link</span>
                <span className="text-[11px] uppercase tracking-[0.32em] text-slate-500">IIT Kanpur Sector</span>
              </div>

              <div className="mb-6 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.26em] text-slate-500">
                <span className="rounded-md border border-white/10 px-2 py-1">Code</span>
                <span className="rounded-md border border-white/10 px-2 py-1">Art</span>
                <span className="rounded-md border border-white/10 px-2 py-1">Design</span>
                <span className="rounded-md border border-white/10 px-2 py-1">Audio</span>
              </div>

              <h1 className="max-w-4xl text-4xl font-semibold uppercase leading-[0.94] tracking-[0.05em] text-white sm:text-5xl lg:text-6xl">
                Learn. Play. Create.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                A student-run game development club building playable worlds through programming, visual art, sound,
                systems, and experimentation.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link to="/games" className="btn-primary rounded-md px-5 py-3 text-base uppercase tracking-[0.12em]">
                Explore Games
              </Link>
              <Link to="/learning" className="btn-secondary rounded-md px-5 py-3 text-base uppercase tracking-[0.12em]">
                Start Learning
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="console-panel p-5">
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">System Feed</p>
              <div className="mt-5 space-y-4">
                <div className="flex items-start justify-between gap-3 border-b border-white/8 pb-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-accent2">Status</p>
                    <p className="mt-2 text-sm text-slate-300">Student-led studio operations active.</p>
                  </div>
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent2 shadow-[0_0_14px_rgba(181,159,119,0.5)]" />
                </div>
                <div className="flex items-start justify-between gap-3 border-b border-white/8 pb-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-accent2">Focus</p>
                    <p className="mt-2 text-sm text-slate-300">Jams, workshops, prototypes, and campus-built games.</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-accent2">Signal</p>
                  <p className="mt-2 text-sm text-slate-300">Game Development Club transmission stable.</p>
                </div>
              </div>
            </div>

            <div className="console-panel grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl border border-white/8 bg-black/20 px-3 py-4">
                <p className="text-2xl font-semibold text-white">02</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-slate-500">Winners</p>
              </div>
              <div className="rounded-xl border border-white/8 bg-black/20 px-3 py-4">
                <p className="text-2xl font-semibold text-white">06</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-slate-500">Tracks</p>
              </div>
              <div className="rounded-xl border border-white/8 bg-black/20 px-3 py-4">
                <p className="text-2xl font-semibold text-white">01</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-slate-500">Club</p>
              </div>
            </div>
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
        <h2 className="mb-5 text-2xl font-semibold">Inter IIT TechMeet Winners</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {games.map((game) => (
            <Card key={game.title}>
              {game.image ? <img src={game.image} alt={game.title} loading="lazy" className="mb-4 h-44 w-full rounded-xl object-cover" /> : null}
              <h3 className="text-xl font-semibold">{game.title}</h3>
              {game.description ? <p className="mt-2 text-sm text-slate-300">{game.description}</p> : null}
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
