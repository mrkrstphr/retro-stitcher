import { existsSync, readFileSync, writeFileSync } from 'fs';
import { basename } from 'path';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

const argv = yargs(hideBin(process.argv)).argv;

const colorFile = argv._[0];
const patternFile = argv._[1];

const outputFile = argv.output || patternFile;

if (!patternFile || !colorFile) {
  console.log(
    `Usage: ${basename(process.argv[1])} colors.json pattern.json --output pattern2.json`,
  );
  process.exit(1);
}

if (!existsSync(colorFile)) {
  console.error(`Color file not found: ${colorFile}`);
  process.exit(1);
}

if (!existsSync(patternFile)) {
  console.error(`Pattern file not found: ${patternFile}`);
  process.exit(1);
}

const colors = JSON.parse(readFileSync(colorFile, 'utf-8'));
const pattern = JSON.parse(readFileSync(patternFile, 'utf-8'));

const newPattern = pattern.pattern.map((row) =>
  row.map((symbol) =>
    symbol ? Object.keys(colors).find((k) => colors[k] === pattern.colorMap[symbol]) : symbol,
  ),
);

writeFileSync(outputFile, JSON.stringify({ ...pattern, colorMap: colors, pattern: newPattern }));
