import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  ['/', 'Home'],
  ['/projects', 'Projects'],
  ['/contact', 'Contact Us'],
  ['/events', 'Events'],
  ['/learning', 'Learning'],
  ['/blog', 'Blog'],
  ['/gallery', 'Gallery'],
  ['/sponsors', 'Sponsors'],
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-800/60 bg-ink/85 backdrop-blur">
      <nav className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <NavLink to="/" className="flex items-center gap-3 leading-tight" onClick={() => setOpen(false)}>
            <img
              src="/images/Logo.webp"
              alt="Game Development Club Logo"
              className="h-10 w-10 rounded-full border border-slate-700/80 object-cover"
              loading="lazy"
            />
            <div>
              <p className="text-lg font-bold tracking-wide text-accent">Game Development Club</p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">IIT Kanpur</p>
            </div>
          </NavLink>
          <button
            type="button"
            className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-200 lg:hidden"
            onClick={() => setOpen((value) => !value)}
          >
            Menu
          </button>
          <div className="hidden flex-wrap items-center gap-2 lg:flex">
            {navItems.map(([path, label]) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-accent/20 text-accent' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
        {open ? (
          <div className="mt-3 grid gap-2 lg:hidden">
            {navItems.map(([path, label]) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-accent/20 text-accent' : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        ) : null}
      </nav>
    </header>
  );
};

export default Navbar;