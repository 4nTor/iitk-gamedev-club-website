export const normalizeGameBuildPath = (playPath = '') => {
  if (!playPath) {
    return '';
  }

  return playPath.replace('/play/games/', '/games/');
};

export const getGameSlugFromPath = (playPath = '') => {
  const normalizedPath = normalizeGameBuildPath(playPath);
  const match = normalizedPath.match(/\/games\/([^/]+)\/index\.html$/);
  return match ? match[1] : '';
};

export const getGamePlayerRoute = (playPath = '') => {
  const slug = getGameSlugFromPath(playPath);
  return slug ? `/play/${slug}` : '';
};