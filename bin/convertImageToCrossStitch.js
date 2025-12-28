import { readFileSync } from 'fs';
import { basename } from 'path';
import { head, omit } from 'ramda';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';
import { processImage } from './lib/processImage.js';

const argv = yargs(hideBin(process.argv)).argv;

const inputFile = head(argv._);

if (!inputFile) {
  console.log(`Usage: ${basename(process.argv[1])} image.png`);
  process.exit(1);
}

let colorMap = undefined;
if (argv.colorMap) {
  try {
    colorMap = JSON.parse(readFileSync(argv.colorMap, 'utf-8'));
  } catch (e) {
    console.error('Failed to parse color map JSON:', e);
    process.exit(-1);
  }
}

processImage(inputFile, colorMap, argv.title)
  .then((pattern) => {
    console.log(JSON.stringify(omit(['rawColors'], pattern)));
  })
  .catch((e) => {
    console.error('Error processing image:', e);
    process.exit(-1);
  });
