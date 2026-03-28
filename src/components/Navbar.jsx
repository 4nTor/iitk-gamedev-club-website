import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  ['/', 'Home'],
  ['/games', 'Games'],
  ['/contact', 'Contact Us'],
  ['/events', 'Events'],
  ['/learning', 'Learning'],
  ['/blog', 'Blog'],
  ['/gallery', 'Gallery'],
];

const navLinkClass = ({ isActive }) =>
  `whitespace-nowrap rounded-xl border px-3 py-2 text-sm font-medium uppercase tracking-[0.16em] transition xl:px-3.5 ${
    isActive
      ? 'border-accent2/60 bg-accent2/15 text-accent2 shadow-[0_0_24px_rgba(181,159,119,0.12)]'
      : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25 hover:bg-white/[0.06] hover:text-white'
  }`;

const Navbar = ({ onSecretTrigger }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#090b10]/72 backdrop-blur-xl">
      <nav className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="rounded-[1.6rem] border border-white/10 bg-black/30 px-4 py-3 shadow-[0_14px_40px_rgba(0,0,0,0.28)]">
          <div className="flex items-center justify-between gap-4 xl:gap-6">
            <NavLink to="/" className="min-w-0 flex items-center gap-3 leading-tight" onClick={() => setOpen(false)}>
              <div className="relative shrink-0">
                <img
                  src="/images/logo.jpeg"
                  alt="Game Development Club Logo"
                  className="h-11 w-11 rounded-full border border-white/15 object-cover shadow-[0_0_16px_rgba(181,159,119,0.12)]"
                  loading="lazy"
                />
                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border border-accent2/60 bg-accent2 shadow-[0_0_14px_rgba(181,159,119,0.5)]" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-lg font-bold tracking-[0.05em] text-accent">Game Development Club</p>
                <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">IIT Kanpur</p>
              </div>
            </NavLink>

            <div className="hidden min-w-0 flex-1 items-center justify-end gap-2 lg:flex xl:gap-3">
              <div className="flex min-w-0 items-center justify-end gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {navItems.map(([path, label]) => (
                  <NavLink key={path} to={path} className={navLinkClass}>
                    {label}
                  </NavLink>
                ))}
                <button
                  type="button"
                  onClick={onSecretTrigger}
                  className="group relative ml-1 h-10 w-10 shrink-0 rounded-full border border-white/10 bg-white/[0.03] transition hover:border-accent2/60 hover:bg-accent2/10"
                  aria-label="Auxiliary controls"
                  title="Auxiliary controls"
                >
                  <span className="absolute inset-[10px] rounded-full border border-accent2/60 transition group-hover:scale-110" />
                  <span className="absolute inset-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent2 shadow-[0_0_14px_rgba(181,159,119,0.65)]" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={onSecretTrigger}
                className="relative h-10 w-10 rounded-full border border-white/10 bg-white/[0.03]"
                aria-label="Auxiliary controls"
              >
                <span className="absolute inset-[10px] rounded-full border border-accent2/60" />
                <span className="absolute inset-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent2" />
              </button>
              <button
                type="button"
                className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm uppercase tracking-[0.16em] text-slate-200"
                onClick={() => setOpen((value) => !value)}
              >
                Menu
              </button>
            </div>
          </div>

          {open ? (
            <div className="mt-3 grid gap-2 border-t border-white/10 pt-3 lg:hidden">
              {navItems.map(([path, label]) => (
                <NavLink key={path} to={path} onClick={() => setOpen(false)} className={navLinkClass}>
                  {label}
                </NavLink>
              ))}
            </div>
          ) : null}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
