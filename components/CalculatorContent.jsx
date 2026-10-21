import Link from 'next/link';
import content from '@/lib/calculator-content.json';

const destinations = {
  'How to figure out how much mulch you need': '/blog/how-to-figure-out-how-much-mulch-you-need/',
  'Gravel Calculator guide': '/blog/gravel-calculator-guide/',
  'How to figure gravel by hand': '/blog/how-to-figure-gravel/',
};

for (const name of [
  'Concrete Slab', 'Concrete Bag', 'Concrete', 'Rebar', 'Gravel', 'Cubic Yard',
  'Square Footage', 'Grout', 'Flooring', 'Paver', 'Tile', 'Topsoil', 'Mulch',
  'Sod', 'Pool Gallon', 'Pool Chemical', 'Cubic Feet',
]) {
  destinations[`${name} Calculator`] = `/${name.toLowerCase().replaceAll(' ', '-')}-calculator/`;
}

const linkPattern = new RegExp(`(${Object.keys(destinations).sort((a, b) => b.length - a.length).join('|')})`, 'g');

function LinkedText({ text, slug }) {
  return text.split(linkPattern).map((part, i) => destinations[part] && destinations[part] !== `/${slug}/`
    ? <Link key={i} href={destinations[part]}>{part}</Link>
    : part);
}

function Blocks({ blocks, slug, title }) {
  return blocks.map((block, i) => {
    if (block.type === 'list') return (
      <ul key={i}>{block.items.map((item, j) => <li key={j}><LinkedText text={item} slug={slug} /></li>)}</ul>
    );
    if (block.type === 'table') return (
      <div key={i} className="calculator-content__table" role="region" aria-label={`${title} table ${i + 1}`} tabIndex={0}>
        <table>
          <caption>{title}</caption>
          <thead><tr>{block.headers.map((header, j) => <th key={j} scope="col">{header}</th>)}</tr></thead>
          <tbody>{block.rows.map((row, j) => <tr key={j}>{row.map((cell, k) => k === 0
            ? <th key={k} scope="row">{cell}</th>
            : <td key={k}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
    );
    return <p key={i}><LinkedText text={block.text} slug={slug} /></p>;
  });
}

function ContentCards({ sections, slug }) {
  return sections.map(section => (
    <article className="seo-card calculator-content" key={section.title}>
      <h2>{section.title}</h2>
      <Blocks blocks={section.blocks} slug={slug} title={section.title} />
    </article>
  ));
}

export function CalculatorFaqs({ slug }) {
  return content[slug].faqs.map(faq => (
    <details key={faq.question}>
      <summary>{faq.question}</summary>
      <p><LinkedText text={faq.answer} slug={slug} /></p>
    </details>
  ));
}

export default function CalculatorContent({ slug, part }) {
  const page = content[slug];
  if (part === 'intro') return (
    <section className="seo-band" aria-label="About this calculator">
      <div className="seo-grid"><ContentCards sections={page.intro} slug={slug} /></div>
    </section>
  );
  return <ContentCards sections={part === 'related' ? [page.related] : page.sections} slug={slug} />;
}
