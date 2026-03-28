import { useEffect, useRef, useState } from 'react';

const INTERACTIVE_SELECTOR = "a, button, [role='button'], input[type='submit'], input[type='button'], .btn-primary, .btn-secondary";

const makeId = () => `${Date.now()}-${Math.random()}`;

const CursorFx = () => {
  const [enabled, setEnabled] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false, interactive: false, pressed: false });
  const [shots, setShots] = useState([]);
  const [impacts, setImpacts] = useState([]);
  const timersRef = useRef([]);

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)');
    const syncEnabled = () => setEnabled(media.matches);
    syncEnabled();
    media.addEventListener('change', syncEnabled);
    return () => media.removeEventListener('change', syncEnabled);
  }, []);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const clearTimer = (timer) => window.clearTimeout(timer);

    const onMove = (event) => {
      const interactive = !!event.target?.closest?.(INTERACTIVE_SELECTOR);
      setCursor((current) => ({ ...current, x: event.clientX, y: event.clientY, visible: true, interactive }));
    };

    const onLeave = () => setCursor((current) => ({ ...current, visible: false, pressed: false }));
    const onEnter = () => setCursor((current) => ({ ...current, visible: true }));
    const onUp = () => setCursor((current) => ({ ...current, pressed: false }));

    const onDown = (event) => {
      if (event.button !== 0) {
        return;
      }

      const sourceX = event.clientX;
      const sourceY = event.clientY;
      const interactiveTarget = event.target?.closest?.(INTERACTIVE_SELECTOR);
      const targetRect = interactiveTarget?.getBoundingClientRect?.();
      const impactX = targetRect ? targetRect.left + targetRect.width / 2 : sourceX;
      const impactY = targetRect ? targetRect.top + targetRect.height / 2 : Math.max(72, sourceY - 180);
      const shotId = makeId();
      const impactId = makeId();

      setCursor((current) => ({ ...current, x: sourceX, y: sourceY, visible: true, interactive: !!interactiveTarget, pressed: true }));
      setShots((current) => [...current, { id: shotId, x: sourceX, y: sourceY }]);
      setImpacts((current) => [...current, { id: impactId, x: impactX, y: impactY, interactive: !!interactiveTarget }]);

      const shotTimer = window.setTimeout(() => {
        setShots((current) => current.filter((shot) => shot.id !== shotId));
      }, 260);
      const impactTimer = window.setTimeout(() => {
        setImpacts((current) => current.filter((impact) => impact.id !== impactId));
      }, 320);

      timersRef.current.push(shotTimer, impactTimer);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mouseenter', onEnter);
      timersRef.current.forEach(clearTimer);
      timersRef.current = [];
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[120] overflow-hidden" aria-hidden="true">
      {shots.map((shot) => (
        <div
          key={shot.id}
          className="cursor-beam"
          style={{
            left: shot.x,
            top: shot.y,
          }}
        />
      ))}

      {impacts.map((impact) => (
        <div
          key={impact.id}
          className={`cursor-impact ${impact.interactive ? 'cursor-impact--interactive' : ''}`}
          style={{ left: impact.x, top: impact.y }}
        />
      ))}

      {cursor.visible ? (
        <div
          className={`site-cursor ${cursor.interactive ? 'site-cursor--interactive' : ''} ${cursor.pressed ? 'site-cursor--pressed' : ''}`}
          style={{ left: cursor.x, top: cursor.y }}
        >
          <span className="site-cursor__ring" />
          <span className="site-cursor__dot" />
          <span className="site-cursor__axis site-cursor__axis--h" />
          <span className="site-cursor__axis site-cursor__axis--v" />
        </div>
      ) : null}
    </div>
  );
};

export default CursorFx;
