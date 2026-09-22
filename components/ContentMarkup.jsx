import fs from 'node:fs';
import path from 'node:path';

export default function ContentMarkup({ name }) {
  const file = path.join(process.cwd(), `${name}-content.html`);
  const html = fs.readFileSync(file, 'utf8');
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
