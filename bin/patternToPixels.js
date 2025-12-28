import { readFileSync } from 'fs';
import { Jimp } from 'jimp';
import { basename } from 'path';
import { head } from 'ramda';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';
import { hexToJimpColor } from './lib/colors.js';

const argv = yargs(hideBin(process.argv)).argv;

const inputFile = head(argv._);
const outputFile = argv.output || inputFile.replace('.json', '.png');

if (!inputFile) {
  console.log(`Usage: ${basename(process.argv[1])} pattern.json --output image.png`);
  process.exit(1);
}

const dmcColors = JSON.parse(readFileSync('public/dmc.json', 'utf-8'));
const pattern = JSON.parse(readFileSync(inputFile, 'utf-8'));

const width = pattern.pattern[0].length;
const height = pattern.pattern.length;

const image = new Jimp({ width, height, color: 0x00000000 });

pattern.pattern.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol) {
      const dmcCode = pattern.colorMap[symbol];
      const hexColor = dmcColors[dmcCode].hex.replace('#', '');

      if (!hexColor && hexColor !== 0) {
        console.warn(`DMC color ${dmcCode} not found for symbol ${symbol}`);
        return;
      }

      const color = hexToJimpColor(hexColor);

      image.setPixelColor(color, x, y);
    }
  });
});

await image.write(outputFile);
console.log(`Image saved to ${outputFile}`);
console.log();
console.log(
  'This image is the original color -> closest DMC color -> color representation of that DMC color.',
);
console.log('Meaning, the colors do not match the original source image');
