import fs from 'node:fs';
import path from 'node:path';
import Papa from 'papaparse';

const csvPath = process.argv[2];

if (!csvPath) {
  console.error('Usage: npm run parse:csv -- <csv-file-path>');
  process.exit(1);
}

const absolutePath = path.resolve(process.cwd(), csvPath);
const csvText = fs.readFileSync(absolutePath, 'utf-8');

const parsed = Papa.parse(csvText, {
  header: true,
  skipEmptyLines: true,
  transformHeader: (header) => header.trim(),
});

if (parsed.errors.length) {
  console.error('CSV parse error:', parsed.errors[0].message);
  process.exit(1);
}

console.log(JSON.stringify(parsed.data, null, 2));