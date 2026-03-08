export const parseSimpleMarkdown = (markdown) => {
  const escaped = markdown
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return escaped
    .replace(/^###\s(.+)$/gm, '<h3 class="mt-4 text-lg font-semibold text-accent">$1</h3>')
    .replace(/^##\s(.+)$/gm, '<h2 class="mt-5 text-xl font-semibold text-white">$1</h2>')
    .replace(/^#\s(.+)$/gm, '<h1 class="mt-6 text-2xl font-bold text-white">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="rounded bg-slate-800 px-1 py-0.5 text-accent">$1</code>')
    .replace(/\n\n/g, '</p><p class="mt-3 text-slate-300 leading-7">')
    .replace(/\n/g, '<br/>');
};

export const formatMarkdown = (markdown) => `<p class="text-slate-300 leading-7">${parseSimpleMarkdown(markdown)}</p>`;