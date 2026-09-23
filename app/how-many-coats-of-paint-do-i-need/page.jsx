import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'How Many Coats of Paint Do I Need?',
  description:
    'Understand how paint coats affect paint quantity and why product, surface condition and color changes matter when estimating paint.',
  path: '/how-many-coats-of-paint-do-i-need/',
  type: 'article',
});

export default function PaintCoatsArticlePage() {
  return (
    <main className="article-page">
      <span className="eyebrow">PAINT PLANNING GUIDE</span>
      <h1>How Many Coats of Paint Do I Need?</h1>
      <p className="lead">
        The number of coats affects both the final appearance and the amount of paint required for a
        project.
      </p>
      <article>
        <h2>Why Coats Matter</h2>
        <p>
          Each coat adds coverage over the paintable area. If one coat requires a certain amount of
          paint, two coats will usually require about twice as much before waste allowance.
        </p>
        <p>
          <span className="formula">Paint Needed = Paintable Area / Coverage per Coat x Number of Coats</span>
        </p>

        <h2>What Affects the Number of Coats?</h2>
        <p>The right number of coats can depend on:</p>
        <ul>
          <li>The paint product and manufacturer guidance</li>
          <li>The condition, texture and porosity of the surface</li>
          <li>The difference between the old color and the new color</li>
          <li>Whether primer is used</li>
          <li>The desired finish and application method</li>
        </ul>

        <h2>Follow Product Guidance</h2>
        <p>
          Paint manufacturers usually provide instructions for coverage, surface preparation and
          recommended coats. Use those instructions when planning the project.
        </p>

        <h2>Estimate Paint With Coats Included</h2>
        <p>
          The <a href="/paint-calculator/">Paint Planners paint quantity calculator</a> lets you enter
          the number of coats so your estimate reflects your project plan. After estimating paint
          quantity, you can <a href="/room-color-visualizer/">preview your wall color</a> before you
          start painting.
        </p>
      </article>
    </main>
  );
}
