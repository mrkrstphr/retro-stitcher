import { Jimp, intToRGBA } from 'jimp';
import { basename } from 'path';
import { head } from 'ramda';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';
import { nearestColor, rgbToHex } from './lib/colors.js';

const argv = yargs(hideBin(process.argv)).argv;

const inputFile = head(argv._);

if (!inputFile) {
  console.log(`Usage: ${basename(process.argv[1])} image.png`);
  process.exit(1);
}

function getTitle(filename) {
  const title = basename(filename).substring(0, basename(filename).lastIndexOf('.'));

  if (!argv.titleFind && !argv.titleReplace) {
    return title;
  }

  return title.replace(new RegExp(argv.titleFind), argv.titleReplace);
}

function makeColorMap(colors) {
  const map = {};

  Object.values(colors).forEach((color) => {
    map[color.symbol] = color.color.id;
  });

  return map;
}

let symbols = ['$', '=', '★', '+', '&', '#', '◉', '∅', '@', '►', '◢', '▣', '◼', '☻', '♡'];

async function run(file) {
  const colors = {};
  const chart = [];

  const image = await Jimp.read(file);

  // start the pattern with an empty row with an extra column at each end
  chart.push(new Array(image.bitmap.width + 2).fill(''));

  image.scan((x, y) => {
    if (x === 0) chart.push(new Array(image.bitmap.width + 2).fill(''));

    const pixelColor = image.getPixelColor(x, y);

    if (pixelColor === 0) {
      // transparent pixel
      chart[y + 1][x + 1] = '';
      return;
    }

    const rgba = intToRGBA(pixelColor);
    const colorAsHex = rgbToHex(rgba.r, rgba.g, rgba.b);

    if (!(colorAsHex in colors)) {
      const dmcColor = nearestColor(colorAsHex);

      if (!dmcColor) {
        console.error(`Failed to find a DMC match for: ${colorAsHex}; exiting...`);
        process.exit(-1);
      }

      colors[colorAsHex] = { color: dmcColor, symbol: symbols.splice(0, 1)[0] };
    }

    if (rgba.a === 0) {
      chart[y + 1][x + 1] = '';
    } else {
      chart[y + 1][x + 1] = colors[colorAsHex].symbol;
    }
  });

  // end the pattern with an empty row with an extra column at each end
  chart.push(new Array(image.bitmap.width + 2).fill(''));

  const pattern = {
    title: getTitle(inputFile),
    colorMap: makeColorMap(colors),
    pattern: chart,
  };

  if (argv.source) {
    pattern.source = argv.source;
  }

  console.log(JSON.stringify(pattern));
}

run(inputFile).catch((e) => {
  console.error('Error processing image:', e);
  process.exit(-1);
});
