import { useEffect, useMemo, useRef, useState } from 'react';

const HIGH_SCORE_KEY = 'gdc-centauri-asteroid-high-score';
const INITIAL_LIVES = 1;
const BASE_SPEED = 0.12;

const createAsteroid = (viewport, score, spawnNearCenter = false) => {
  const size = 52 + Math.random() * 68;
  const laneSpread = spawnNearCenter ? Math.max(viewport.width * 0.18, 120) : Math.max(viewport.width * 0.42, 240);

  return {
    id: `${Date.now()}-${Math.random()}`,
    x: viewport.width / 2 + (Math.random() - 0.5) * laneSpread,
    y: -size,
    size,
    speed: BASE_SPEED + Math.random() * 0.06 + score * 0.003,
    rotation: Math.random() * 360,
    spin: (Math.random() - 0.5) * 0.22,
  };
};

const HiddenAsteroidGame = ({ open, onClose }) => {
  const [phase, setPhase] = useState('intro');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [asteroids, setAsteroids] = useState([]);
  const [status, setStatus] = useState('Gained full control. Asteroids incoming.');
  const [viewport, setViewport] = useState({ width: 1280, height: 720 });
  const frameRef = useRef(0);
  const lastTickRef = useRef(0);
  const spawnTimerRef = useRef(0);

  useEffect(() => {
    const savedHighScore = Number(window.localStorage.getItem(HIGH_SCORE_KEY) || 0);
    setHighScore(savedHighScore);
  }, []);

  useEffect(() => {
    if (!open) {
      setPhase('intro');
      setScore(0);
      setAsteroids([]);
      setStatus('Gained full control. Asteroids incoming.');
      return;
    }

    const syncViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    syncViewport();
    window.addEventListener('resize', syncViewport);
    return () => window.removeEventListener('resize', syncViewport);
  }, [open]);

  useEffect(() => {
    if (!open || phase !== 'playing') {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      return undefined;
    }

    const tick = (time) => {
      if (!lastTickRef.current) {
        lastTickRef.current = time;
      }

      const delta = time - lastTickRef.current;
      lastTickRef.current = time;
      spawnTimerRef.current += delta;

      setAsteroids((current) => {
        let next = current
          .map((asteroid) => ({
            ...asteroid,
            y: asteroid.y + asteroid.speed * delta,
            rotation: asteroid.rotation + asteroid.spin * delta,
          }))
          .filter((asteroid) => asteroid.y < viewport.height + asteroid.size + 120);

        const spawnThreshold = Math.max(360, 920 - score * 14);
        if (spawnTimerRef.current >= spawnThreshold) {
          spawnTimerRef.current = 0;
          next = [...next, createAsteroid(viewport, score)];
        }

        const hitCamera = next.some((asteroid) => asteroid.y + asteroid.size * 0.45 >= viewport.height - 36);

        if (hitCamera) {
          const nextHighScore = Math.max(score, highScore);
          window.localStorage.setItem(HIGH_SCORE_KEY, String(nextHighScore));
          setHighScore(nextHighScore);
          setStatus('Hull breach detected. Camera impact confirmed.');
          setPhase('gameover');
          return next;
        }

        return next;
      });

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
      lastTickRef.current = 0;
      spawnTimerRef.current = 0;
    };
  }, [open, phase, viewport, score, highScore]);

  const startGame = () => {
    setPhase('playing');
    setScore(0);
    setStatus('Gained full control. Asteroids incoming.');
    setAsteroids([
      createAsteroid(viewport, 0, true),
      createAsteroid(viewport, 0, false),
      createAsteroid(viewport, 0, false),
    ]);
    lastTickRef.current = 0;
    spawnTimerRef.current = 0;
  };

  const destroyAsteroid = (id) => {
    if (phase !== 'playing') {
      return;
    }

    setAsteroids((current) => current.filter((asteroid) => asteroid.id !== id));
    setScore((current) => current + 10);
    setStatus('Direct hit. Keep the viewport clear.');
  };

  const closeGame = () => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    }
    onClose();
  };

  const targetRings = useMemo(
    () => [
      { size: 210, opacity: 0.16 },
      { size: 320, opacity: 0.1 },
      { size: 480, opacity: 0.06 },
    ],
    [],
  );

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[90] overflow-hidden bg-[#020409]/95 text-slate-100 backdrop-blur-sm">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(181,159,119,0.12),transparent_22%),radial-gradient(circle_at_50%_100%,rgba(216,217,221,0.08),transparent_40%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:46px_46px] opacity-20" />

      {targetRings.map((ring) => (
        <div
          key={ring.size}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent2"
          style={{ width: ring.size, height: ring.size, opacity: ring.opacity }}
        />
      ))}

      <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent2/80 shadow-[0_0_24px_rgba(181,159,119,0.2)]">
        <div className="absolute inset-x-2 top-1/2 h-px -translate-y-1/2 bg-accent2/80" />
        <div className="absolute inset-y-2 left-1/2 w-px -translate-x-1/2 bg-accent2/80" />
      </div>

      {asteroids.map((asteroid) => {
        const depth = Math.min(2.2, 0.72 + asteroid.y / Math.max(viewport.height, 1));

        return (
          <button
            key={asteroid.id}
            type="button"
            aria-label="Destroy asteroid"
            onClick={() => destroyAsteroid(asteroid.id)}
            className="absolute z-30 rounded-full border border-[#8f7752] bg-[radial-gradient(circle_at_30%_30%,#e2cca1,#7f6240_54%,#221610_86%)] transition-transform duration-75"
            style={{
              left: asteroid.x,
              top: asteroid.y,
              width: asteroid.size * depth,
              height: asteroid.size * depth,
              transform: `translate(-50%, -50%) rotate(${asteroid.rotation}deg)`,
              boxShadow: '0 0 36px rgba(181,159,119,0.2), inset -14px -12px 24px rgba(0,0,0,0.4)',
            }}
          >
            <span className="absolute inset-[16%] rounded-full border border-white/10" />
            <span className="absolute inset-[34%] rounded-full border border-black/20" />
          </button>
        );
      })}

      <div className="relative z-40 flex h-full flex-col justify-between p-4 sm:p-6 lg:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-accent2">Centauri Override</p>
            <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Asteroid Defense</h2>
            <p className="mt-3 max-w-xl text-sm text-slate-300 sm:text-base">{status}</p>
          </div>
          {phase === 'playing' ? (
            <button
              type="button"
              onClick={closeGame}
              className="rounded-full border border-slate-700/80 bg-black/50 px-4 py-2 text-sm text-slate-200 transition hover:border-accent2/70 hover:text-white"
            >
              Exit Override
            </button>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800/80 bg-black/35 px-4 py-3 backdrop-blur sm:px-5">
          <div className="flex gap-5 text-sm uppercase tracking-[0.22em] text-slate-400">
            <span>Score {score}</span>
            <span>High Score {highScore}</span>
            <span>Integrity {INITIAL_LIVES}</span>
          </div>
          {phase === 'gameover' ? (
            <button type="button" onClick={startGame} className="btn-primary">
              Restart Run
            </button>
          ) : null}
        </div>
      </div>

      {phase === 'intro' ? (
        <div className="absolute inset-0 z-50 flex items-center justify-center px-6">
          <div className="max-w-2xl rounded-[2rem] border border-accent2/30 bg-panel/80 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-10">
            <p className="text-xs uppercase tracking-[0.32em] text-accent2">Override Access</p>
            <h3 className="mt-4 text-3xl font-semibold sm:text-4xl">Gained full control.</h3>
            <p className="mt-4 text-base leading-7 text-slate-300">
              The ship is yours. Asteroids are entering the Centauri sector. Click them before one hits the viewport.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={startGame} className="btn-primary">
                Engage Defense Grid
              </button>
              <button type="button" onClick={closeGame} className="btn-secondary">
                Exit Override
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {phase === 'gameover' ? (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 px-6 backdrop-blur-sm">
          <div className="max-w-lg rounded-[2rem] border border-accent2/30 bg-panel/90 p-8 text-center shadow-2xl">
            <p className="text-xs uppercase tracking-[0.32em] text-accent2">Run Complete</p>
            <h3 className="mt-3 text-3xl font-semibold">Asteroid impact confirmed.</h3>
            <p className="mt-4 text-slate-300">Final score: {score}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.22em] text-slate-400">High Score {highScore}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={startGame} className="btn-primary">
                Run Again
              </button>
              <button type="button" onClick={closeGame} className="btn-secondary">
                Return To Site
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default HiddenAsteroidGame;
