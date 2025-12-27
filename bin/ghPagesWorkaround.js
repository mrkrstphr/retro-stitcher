// GitHub pages, where I host this site, does not support single-page apps well, and will
// throw a 404 if you refresh on a page or link directly to a page.
// To workaround this, we're going to copy index.html to every single page in public
// so that the app works as normal, even though its kind of gross.
// GH pages really needs to support custom redirects like Netlify...

import fs from 'fs';
import path from 'path';

console.log('Generating a million index.html files...');

const outDir = path.resolve(import.meta.dirname, '..', 'build', 'client');

fs.mkdirSync(`${outDir}/system`, { recursive: true });

const systems = JSON.parse(
  fs.readFileSync(path.resolve(outDir, 'patterns', 'index.json'), 'utf-8'),
).items.map((item) => item.file.substr(0, item.file.indexOf('/')));

for (const system of systems) {
  fs.mkdirSync(path.resolve(outDir, 'system', system), { recursive: true });
  fs.copyFileSync(
    path.resolve(outDir, 'index.html'),
    path.resolve(outDir, 'system', system, 'index.html'),
  );

  const games = JSON.parse(
    fs.readFileSync(path.resolve(outDir, 'patterns', system, 'index.json'), 'utf-8'),
  ).items.map((item) => item.file.substr(0, item.file.indexOf('/')));

  for (const game of games) {
    fs.mkdirSync(path.resolve(outDir, 'system', system, game), { recursive: true });
    fs.copyFileSync(
      path.resolve(outDir, 'index.html'),
      path.resolve(outDir, 'system', system, game, 'index.html'),
    );

    const patterns = JSON.parse(
      fs.readFileSync(path.resolve(outDir, 'patterns', system, game, 'index.json'), 'utf-8'),
    ).items.map((item) => item.file.substr(0, item.file.indexOf('/')));

    for (const pattern of patterns) {
      fs.mkdirSync(path.resolve(outDir, 'system', system, game, pattern), {
        recursive: true,
      });
      fs.copyFileSync(
        path.resolve(outDir, 'index.html'),
        path.resolve(outDir, 'system', system, game, pattern, 'index.html'),
      );
    }
  }
}

console.log('DONE.');
