const socialLinks = [
  ['Instagram', 'https://www.instagram.com/gamedev_iitk?igsh=dGRqOG1wZXhrN3pq'],
  ['LinkedIn', 'https://www.linkedin.com/company/game-development-club-iitk/posts/?feedView=all'],
  ['GitHub', 'https://github.com/studiocentauri'],
  ['Discord', 'https://discord.gg/hhC7tugtsK'],
];

const Footer = () => {
  return (
    <footer className="border-t border-slate-800/70 bg-black/30">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-6 px-4 py-10 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div>
          <p className="text-sm text-slate-300">Game Development Club, IIT Kanpur</p>
          <p className="text-xs text-slate-500">Learn.Play.Create.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          {socialLinks.map(([label, href]) => (
            <a key={label} href={href} className="text-sm text-slate-300 hover:text-accent" target="_blank" rel="noreferrer">
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;