import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import { fetchCsv } from '../utils/csv';
import { getGameSlugFromPath } from '../utils/games';

const GamePlayerPage = () => {
  const { slug } = useParams();
  const [game, setGame] = useState(null);
  const [mobile, setMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 960);
  const [portrait, setPortrait] = useState(typeof window !== 'undefined' && window.innerHeight > window.innerWidth);
  const [frameReady, setFrameReady] = useState(false);

  useEffect(() => {
    fetchCsv('/data/games.csv')
      .then((rows) => {
        const matchedGame = rows.find((entry) => getGameSlugFromPath(entry.play) === slug);
        setGame(matchedGame || null);
      })
      .catch((error) => console.error(error));
  }, [slug]);

  useEffect(() => {
    const onResize = () => {
      setMobile(window.innerWidth < 960);
      setPortrait(window.innerHeight > window.innerWidth);
    };

    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <SectionHeader
          title={game?.title || 'Game Player'}
          subtitle={game?.description || 'Play the embedded WebGL build without leaving the Game Development Club website.'}
        />
        <div className="flex flex-wrap gap-3">
          <Link to="/games" className="btn-secondary">
            Back to Games
          </Link>
        </div>
      </div>

      <Card className="overflow-hidden p-3 sm:p-4">
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-black">
          <div className="flex items-center justify-between border-b border-slate-800/80 bg-black/70 px-4 py-3 text-sm text-slate-300">
            <div>
              <p className="font-semibold text-accent">{game?.title || 'Game Player'}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Tap to focus, then use controls</p>
            </div>
          </div>

          <div className="relative h-[68svh] min-h-[480px] bg-black md:h-[76vh]">
            <iframe title={game?.title || slug} src={`/games/${slug}/index.html`} className="h-full w-full" allowFullScreen onLoad={() => setFrameReady(true)} />

            {mobile && portrait ? (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/82 p-6 text-center backdrop-blur-sm">
                <div className="max-w-sm space-y-4 rounded-2xl border border-accent/30 bg-panel/95 p-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Mobile Play</p>
                  <h2 className="text-2xl font-semibold text-accent">Rotate your device</h2>
                  <p className="text-sm leading-6 text-slate-300">
                    This build plays best in landscape. Rotate your phone for a better play experience.
                  </p>
                </div>
              </div>
            ) : null}

            {!frameReady ? (
              <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center pb-5">
                <div className="rounded-full border border-slate-700 bg-panel/90 px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                  Loading build...
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GamePlayerPage;