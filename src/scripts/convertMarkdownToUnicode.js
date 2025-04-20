import { readFileSync, writeFileSync } from 'fs';

const inputPath = process.argv[2];
const outputPath = process.argv[3];

const content = readFileSync(inputPath, 'utf-8');

// LinkedIn-friendly bold (𝐀-Z𝐚-z) and italic (𝘈-Z𝘢-z) Unicode maps
const boldMap = {};
const italicMap = {};

const ACode = 'A'.charCodeAt(0);
const aCode = 'a'.charCodeAt(0);

for (let i = 0; i < 26; i++) {
  boldMap[String.fromCharCode(ACode + i)] = String.fromCodePoint(0x1D400 + i);
  boldMap[String.fromCharCode(aCode + i)] = String.fromCodePoint(0x1D41A + i);
  italicMap[String.fromCharCode(ACode + i)] = String.fromCodePoint(0x1D434 + i);
  italicMap[String.fromCharCode(aCode + i)] = String.fromCodePoint(0x1D44E + i);
}

function toUnicode(text, style) {
  const map = style === 'bold' ? boldMap : italicMap;
  return text
    .split('')
    .map(c => (/[a-zA-Z]/.test(c) ? map[c] || c : c)) // Only transform alphabetic characters
    .join('');
}

// Transform markdown
let result = content
  // Handle ***bold italic***
  .replace(/\*\*\*(.+?)\*\*\*/g, (_, text) => toUnicode(text, 'bold') + toUnicode(text, 'italic'))
  // Handle **bold**
  .replace(/\*\*(.+?)\*\*/g, (_, text) => toUnicode(text, 'bold'))
  // Handle *italic*
  .replace(/\*(.+?)\*/g, (_, text) => toUnicode(text, 'italic'))
  // Handle _italic_
  .replace(/_(.+?)_/g, (_, text) => toUnicode(text, 'italic'));

writeFileSync(outputPath, result);
console.log(`✅ Converted and saved to ${outputPath}`);
