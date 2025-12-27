import { basename } from 'path';
import { head } from 'ramda';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';
import { processImage } from './lib/processImage.js';

const argv = yargs(hideBin(process.argv)).argv;

const inputFile = head(argv._);

if (!inputFile) {
  console.log(`Usage: ${basename(process.argv[1])} image.png`);
  process.exit(1);
}

processImage(inputFile)
  .then((pattern) => {
    console.log(JSON.stringify(pattern.rawColors));
  })
  .catch((e) => {
    console.error('Error processing image:', e);
    process.exit(-1);
  });
