import { readFileSync, writeFileSync } from 'fs';
import { basename } from 'path';
import { head } from 'ramda';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

const argv = yargs(hideBin(process.argv)).argv;

const inputFile = head(argv._);
const outputFile = argv.output || inputFile.replace('.json', '.svg');

if (!inputFile) {
  console.log(`Usage: ${basename(process.argv[1])} pattern.json --output image.svg`);
  process.exit(1);
}

const dmcColors = JSON.parse(readFileSync('public/dmc.json', 'utf-8'));
const pattern = JSON.parse(readFileSync(inputFile, 'utf-8'));

const cellSize = 4;
const gridSize = 1;
const blockSize = cellSize + gridSize;

const width = pattern.pattern[0].length;
const height = pattern.pattern.length;

const maxDimension = Math.max(width, height);
const imageSize = maxDimension * blockSize + gridSize;

const offsetX = Math.floor((maxDimension - width) / 2);
const offsetY = Math.floor((maxDimension - height) / 2);

let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${imageSize}" height="${imageSize}" viewBox="0 0 ${imageSize} ${imageSize}">
  <style>
    .grid-line {
      stroke: #999;
      stroke-width: 1;
      shape-rendering: crispEdges;
    }
    @media (prefers-color-scheme: dark) {
      .grid-line {
        stroke: #111;
      }
    }
  </style>
  <rect width="${imageSize}" height="${imageSize}" fill="none"/>
`;

pattern.pattern.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol) {
      const dmcCode = pattern.colorMap[symbol];
      const hexColor = dmcColors[dmcCode]?.hex;

      if (!hexColor) {
        console.warn(`DMC color ${dmcCode} not found for symbol ${symbol}`);
        return;
      }

      const px = (x + offsetX) * blockSize + gridSize;
      const py = (y + offsetY) * blockSize + gridSize;

      svg += `  <rect x="${px}" y="${py}" width="${cellSize}" height="${cellSize}" fill="${hexColor}"/>\n`;
    }
  });
});

for (let x = 0; x <= maxDimension; x++) {
  const xPos = x * blockSize + 0.5;
  svg += `  <line x1="${xPos}" y1="0" x2="${xPos}" y2="${imageSize}" class="grid-line"/>\n`;
}

for (let y = 0; y <= maxDimension; y++) {
  const yPos = y * blockSize + 0.5;
  svg += `  <line x1="0" y1="${yPos}" x2="${imageSize}" y2="${yPos}" class="grid-line"/>\n`;
}

svg += `</svg>`;

writeFileSync(outputFile, svg);
console.log(`SVG saved to ${outputFile}`);
