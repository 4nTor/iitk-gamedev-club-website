import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import { fetchCsv } from '../utils/csv';
import { getGamePlayerRoute, normalizeGameBuildPath } from '../utils/games';

const normalizeGame = (game) => ({
  ...game,
  image: game.image || '/images/project-cello.svg',
  play: normalizeGameBuildPath(game.play),
  playerRoute: getGamePlayerRoute(game.play),
});

const GamesPage = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchCsv('/data/games.csv')
      .then((rows) => setGames(rows.map(normalizeGame)))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <SectionHeader title="Club Games" subtitle="Hands-on games, experiments, and playable ideas built by IIT Kanpur students." />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {games.map((game) => (
          <Card key={game.title}>
            <img src={game.image} alt={game.title} loading="lazy" className="mb-4 h-48 w-full rounded-xl object-cover" />
            <h3 className="text-xl font-semibold">{game.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{game.description}</p>
            <div className="mt-4 flex gap-3">
              {game.github ? (
                <a href={game.github} target="_blank" rel="noreferrer" className="btn-secondary text-sm">
                  GitHub
                </a>
              ) : null}
              {game.playerRoute ? (
                <Link to={game.playerRoute} className="btn-primary text-sm">
                  Play
                </Link>
              ) : game.play ? (
                <a href={game.play} target="_blank" rel="noreferrer" className="btn-primary text-sm">
                  Play
                </a>
              ) : null}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GamesPage;