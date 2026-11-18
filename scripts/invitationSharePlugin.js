import fs from 'node:fs/promises';
import path from 'node:path';

function inject(html, head) {
  return html
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta\b(?=[^>]*\bname=["']description["'])[^>]*>/gi, '')
    .replace(/<\/head>/i, () => `${head}</head>`);
}

export default function invitationSharePlugin(backend) {
  let config;
  function middleware(server, development) {
    return async (request, response, next) => {
      const pathname = new URL(request.url, 'http://vite.local').pathname;
      const match = /^\/u\/([a-z0-9]+(?:-[a-z0-9]+)*)\/?$/.exec(pathname);
      if (
        !match ||
        match[1].length > 80 ||
        !['GET', 'HEAD'].includes(request.method)
      )
        return next();
      try {
        const filename = path.resolve(
          config.root,
          development
            ? 'index.html'
            : path.join(config.build.outDir, 'index.html'),
        );
        let html = await fs.readFile(filename, 'utf8');
        let status = 503;
        try {
          const proxy = (development ? config.server : config.preview).proxy?.[
            '/api'
          ];
          const target = String(
            typeof proxy === 'object' && proxy.target ? proxy.target : backend,
          ).replace(/\/$/, '');
          const result = await fetch(`${target}/api/share-meta/${match[1]}`, {
            signal: AbortSignal.timeout(8000),
          });
          status = result.status;
          if (result.ok) {
            const payload = await result.json();
            html = inject(html, payload.data.head);
          }
        } catch {
          status = 503;
        }
        if (development)
          html = await server.transformIndexHtml(request.url, html);
        response.statusCode = status;
        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        response.setHeader('Cache-Control', 'no-store');
        if (status !== 200)
          response.setHeader('X-Robots-Tag', 'noindex, nofollow');
        response.end(request.method === 'HEAD' ? '' : html);
      } catch (error) {
        next(error);
      }
    };
  }
  return {
    name: 'invitation-share-metadata',
    configResolved(value) {
      config = value;
    },
    configureServer(server) {
      server.middlewares.use(middleware(server, true));
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware(server, false));
    },
  };
}
