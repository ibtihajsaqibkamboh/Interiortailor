import fs from 'node:fs';
import path from 'node:path';

const file = path.join(process.cwd(), 'tool-content.html');
const html = fs.readFileSync(file, 'utf8');

export default function ToolMarkup() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
