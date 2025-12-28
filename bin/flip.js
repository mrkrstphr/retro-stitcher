import { existsSync, readFileSync, writeFileSync } from 'fs';
import { basename } from 'path';
import { head } from 'ramda';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

const argv = yargs(hideBin(process.argv)).argv;

const inputFile = head(argv._);

if (!inputFile) {
  console.log(`Usage: ${basename(process.argv[1])} pattern.json`);
  process.exit(1);
}

if (!existsSync(inputFile)) {
  console.error(`Input file does not exist: ${inputFile}`);
  process.exit(1);
}

const pattern = JSON.parse(readFileSync(inputFile, 'utf-8'));

if (!pattern.pattern || !Array.isArray(pattern.pattern)) {
  console.error(`Invalid pattern file: ${inputFile}`);
  process.exit(1);
}

const reversedPattern = pattern.pattern.map((row) => [...row].reverse());

const outputPattern = {
  ...pattern,
  pattern: reversedPattern,
};

writeFileSync(inputFile, JSON.stringify(outputPattern), 'utf-8');
