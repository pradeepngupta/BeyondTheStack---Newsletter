import { readFileSync, writeFileSync } from 'fs';

const template = `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      line-height: 1.6;
      padding: 20px;
      background-color: #f9f9f9;
      color: #222;
    }
    h1 { font-size: 24px; color: #1a73e8; }
    h2 { font-size: 20px; margin-top: 20px; }
    img { max-width: 100%; border-radius: 8px; margin: 20px 0; }
    .cta { font-weight: bold; margin-top: 40px; }
  </style>
</head>
<body>
  <h1>📝 Newsletter Edition Ready</h1>
  <div id="content">{{CONTENT}}</div>
</body>
</html>`;

const markdown = readFileSync(process.argv[2], 'utf-8');
const htmlContent = markdown.replace(/\n/g, '<br>');
const finalHtml = template.replace('{{CONTENT}}', htmlContent);
writeFileSync(process.argv[3], finalHtml);
console.log('✅ HTML email generated successfully.');
