import fs from 'fs';
import papa from 'papaparse';
import { basename } from 'path';

const inputFile = process.argv[2];

if (!inputFile) {
  console.log(`Usage: ${basename(process.argv[1])} input_file.csv`);
  process.exit(1);
}

const index = JSON.parse(fs.readFileSync('public/patterns/index.json').toString());

const baseFilename = basename(inputFile).substring(0);
const baseName = baseFilename.substring(0, baseFilename.lastIndexOf('.'));

const outputFilename = `public/patterns/${baseName
  .replace(/[^\w\s]/gi, '')
  .replace(/ /g, '-')
  .toLowerCase()}.json`;

const inputContents = fs.readFileSync(inputFile).toString();

const contents = papa.parse(inputContents).data;
const data = contents.slice(1, contents.length - 2);

const colorMap = {};
const pattern = [Array(data[0].length).fill('')];

for (const row of data) {
  if (row[0]) {
    colorMap[row[0]] = row[1].replace('DMC', '').trim();
  }

  const column = row.slice(2);
  pattern.push(['', ...column, '']);
}

pattern.push(Array(data[0].length).fill(''));

fs.writeFileSync(outputFilename, JSON.stringify({ title: baseName, colorMap, pattern }));

const entry = index.find((entry) => entry.file === basename(outputFilename));

if (!entry) {
  index.push({ title: baseName, file: basename(outputFilename) });
  fs.writeFileSync('public/patterns/index.json', JSON.stringify(index));
}

console.log();

console.log(`✅ Done: ${outputFilename}`);

console.log();
