import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import { fetchCsv } from '../utils/csv';
import { getGameSlugFromPath } from '../utils/games';

const mobileButtons = [
  { id: 'left', label: 'Left', key: 'a', code: 'KeyA' },
  { id: 'up', label: 'Up', key: 'w', code: 'KeyW' },
  { id: 'right', label: 'Right', key: 'd', code: 'KeyD' },
  { id: 'down', label: 'Down', key: 's', code: 'KeyS' },
  { id: 'action', label: 'Action', key: ' ', code: 'Space' },
];

const isMobileViewport = () => typeof window !== 'undefined' && window.innerWidth < 960;
const isPortraitViewport = () => typeof window !== 'undefined' && window.innerHeight > window.innerWidth;

const GamePlayerPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [mobile, setMobile] = useState(isMobileViewport);
  const [portrait, setPortrait] = useState(isPortraitViewport);
  const [frameReady, setFrameReady] = useState(false);
  const iframeRef = useRef(null);
  const shellRef = useRef(null);

  useEffect(() => {
    fetchCsv('/data/projects.csv')
      .then((rows) => {
        const matchedProject = rows.find((entry) => getGameSlugFromPath(entry.play) === slug);
        setProject(matchedProject || null);
      })
      .catch((error) => console.error(error));
  }, [slug]);

  useEffect(() => {
    const onResize = () => {
      setMobile(isMobileViewport());
      setPortrait(isPortraitViewport());
    };

    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const gameSrc = `/games/${slug}/index.html`;

  const focusGame = () => {
    const frame = iframeRef.current;
    if (!frame) {
      return;
    }

    frame.focus();
    frame.contentWindow?.focus();
  };

  const dispatchKey = (type, key, code) => {
    const frameWindow = iframeRef.current?.contentWindow;
    const frameDocument = frameWindow?.document;

    if (!frameWindow || !frameDocument) {
      return;
    }

    const eventConfig = {
      key,
      code,
      bubbles: true,
      cancelable: true,
      composed: true,
    };

    frameWindow.dispatchEvent(new KeyboardEvent(type, eventConfig));
    frameDocument.dispatchEvent(new KeyboardEvent(type, eventConfig));

    const activeElement = frameDocument.activeElement;
    if (activeElement && activeElement !== frameDocument.body) {
      activeElement.dispatchEvent(new KeyboardEvent(type, eventConfig));
    }
  };

  const pressButton = (button, type) => {
    focusGame();
    dispatchKey(type, button.key, button.code);
  };

  const openFullscreen = async () => {
    const node = shellRef.current;
    if (!node || !node.requestFullscreen) {
      return;
    }

    try {
      await node.requestFullscreen();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <SectionHeader
          title={project?.title || 'Game Player'}
          subtitle={project?.description || 'Play the embedded WebGL build without leaving the Studio Centauri website.'}
        />
        <div className="flex flex-wrap gap-3">
          <Link to="/projects" className="btn-secondary">
            Back to Projects
          </Link>
          <button type="button" className="btn-primary" onClick={openFullscreen}>
            {mobile ? 'Play in Landscape' : 'Fullscreen'}
          </button>
        </div>
      </div>

      <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 px-4 sm:px-6 lg:px-8">
        <Card className="overflow-hidden p-3 sm:p-4">
          <div ref={shellRef} className="relative overflow-hidden rounded-2xl border border-slate-800 bg-black">
            <div className="flex items-center justify-between border-b border-slate-800/80 bg-black/70 px-4 py-3 text-sm text-slate-300">
              <div>
                <p className="font-semibold text-accent">{project?.title || 'Game Player'}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Tap to focus, then use controls</p>
              </div>
              <button type="button" className="btn-secondary text-sm" onClick={openFullscreen}>
                Fullscreen
              </button>
            </div>

            <div className="relative h-[68svh] min-h-[480px] bg-black md:h-[76vh]" onClick={focusGame}>
              <iframe
                ref={iframeRef}
                title={project?.title || slug}
                src={gameSrc}
                className="h-full w-full"
                allowFullScreen
                onLoad={() => setFrameReady(true)}
              />

              {mobile && portrait ? (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/82 p-6 text-center backdrop-blur-sm">
                  <div className="max-w-sm space-y-4 rounded-2xl border border-accent/30 bg-panel/95 p-6">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Mobile Play</p>
                    <h2 className="text-2xl font-semibold text-accent">Rotate your device</h2>
                    <p className="text-sm leading-6 text-slate-300">
                      This build plays best in landscape. Rotate your phone, then tap the fullscreen button to get an itch-style play view.
                    </p>
                    <button type="button" className="btn-primary" onClick={openFullscreen}>
                      Tap to Fullscreen
                    </button>
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

      {mobile ? (
        <div className="space-y-4">
          <Card>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Touch Controls</p>
                <h2 className="mt-1 text-xl font-semibold">Mobile overlay controls</h2>
                <p className="mt-2 max-w-2xl text-sm text-slate-300">
                  These buttons send keyboard-style input into the Unity WebGL frame. They work best if the game already supports WASD plus Space.
                </p>
              </div>
              <button type="button" className="btn-secondary text-sm" onClick={focusGame}>
                Focus Game
              </button>
            </div>
          </Card>

          <div className="grid gap-4 md:grid-cols-[1fr_auto]">
            <Card>
              <div className="grid max-w-xs grid-cols-3 gap-3">
                <div />
                <button
                  type="button"
                  className="rounded-2xl border border-slate-700 bg-panel px-5 py-4 font-semibold text-accent active:scale-95"
                  onPointerDown={() => pressButton(mobileButtons[1], 'keydown')}
                  onPointerUp={() => pressButton(mobileButtons[1], 'keyup')}
                  onPointerCancel={() => pressButton(mobileButtons[1], 'keyup')}
                >
                  Up
                </button>
                <div />
                <button
                  type="button"
                  className="rounded-2xl border border-slate-700 bg-panel px-5 py-4 font-semibold text-accent active:scale-95"
                  onPointerDown={() => pressButton(mobileButtons[0], 'keydown')}
                  onPointerUp={() => pressButton(mobileButtons[0], 'keyup')}
                  onPointerCancel={() => pressButton(mobileButtons[0], 'keyup')}
                >
                  Left
                </button>
                <button
                  type="button"
                  className="rounded-2xl border border-slate-700 bg-panel px-5 py-4 font-semibold text-accent active:scale-95"
                  onPointerDown={() => pressButton(mobileButtons[3], 'keydown')}
                  onPointerUp={() => pressButton(mobileButtons[3], 'keyup')}
                  onPointerCancel={() => pressButton(mobileButtons[3], 'keyup')}
                >
                  Down
                </button>
                <button
                  type="button"
                  className="rounded-2xl border border-slate-700 bg-panel px-5 py-4 font-semibold text-accent active:scale-95"
                  onPointerDown={() => pressButton(mobileButtons[2], 'keydown')}
                  onPointerUp={() => pressButton(mobileButtons[2], 'keyup')}
                  onPointerCancel={() => pressButton(mobileButtons[2], 'keyup')}
                >
                  Right
                </button>
              </div>
            </Card>

            <Card className="flex items-center justify-center">
              <button
                type="button"
                className="rounded-3xl border border-accent/40 bg-accent/10 px-8 py-8 text-lg font-semibold text-accent active:scale-95"
                onPointerDown={() => pressButton(mobileButtons[4], 'keydown')}
                onPointerUp={() => pressButton(mobileButtons[4], 'keyup')}
                onPointerCancel={() => pressButton(mobileButtons[4], 'keyup')}
              >
                Action
              </button>
            </Card>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default GamePlayerPage;