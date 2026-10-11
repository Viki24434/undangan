const YOUTUBE_HOSTS = new Set([
  'youtu.be',
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'youtube-nocookie.com',
  'www.youtube-nocookie.com',
]);
const VIMEO_HOSTS = new Set(['vimeo.com', 'www.vimeo.com', 'player.vimeo.com']);
const VIDEO_EXTENSIONS = /\.(mp4|webm|ogg)$/i;

export function getVideoSource(value) {
  if (!value) return null;

  let url;
  try {
    url = new URL(value);
  } catch {
    return null;
  }
  if (url.protocol !== 'https:') return null;

  if (YOUTUBE_HOSTS.has(url.hostname)) {
    const id =
      url.hostname === 'youtu.be'
        ? url.pathname.split('/').filter(Boolean)[0]
        : url.pathname === '/watch'
          ? url.searchParams.get('v')
          : url.pathname.split('/').filter(Boolean).at(-1);
    return id && /^[\w-]{11}$/.test(id)
      ? { type: 'embed', src: `https://www.youtube-nocookie.com/embed/${id}` }
      : null;
  }

  if (VIMEO_HOSTS.has(url.hostname)) {
    const id = url.pathname.split('/').filter(Boolean).at(-1);
    return id && /^\d+$/.test(id)
      ? { type: 'embed', src: `https://player.vimeo.com/video/${id}` }
      : null;
  }

  return VIDEO_EXTENSIONS.test(url.pathname)
    ? { type: 'file', src: url.href }
    : null;
}
