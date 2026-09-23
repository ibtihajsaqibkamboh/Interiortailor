import ToolMarkup from '@/components/ToolMarkup';
import ToolBoot from '@/components/ToolBoot';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Paint Color Mixing Tool - Create Custom Colors',
  description:
    'Explore custom paint colors with our digital color mixing tool. Enter a target HEX color, adjust the batch size and explore an estimated mixing recipe.',
  path: '/color-mixing/',
});

export default function ColorMixingPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">COLOR MIXING LAB</span>
        <h1>Paint Color Mixing Tool</h1>
        <p>
          Want to explore a custom paint color? The Interior Tailor Color Mixing Lab lets you enter a
          target HEX color and experiment with an estimated digital mixing recipe.
        </p>
        <p>
          Choose a target color, select the available base colors and adjust the batch size to
          explore how the recipe changes.
        </p>
      </section>

      <ToolMarkup />
      <ToolBoot initialTool="mixer" />

      <section className="seo-band">
        <article className="seo-card">
          <h2>Create and Explore Custom Paint Colors</h2>
          <p>
            Color mixing can be useful when you are trying to understand how different base colors
            can contribute to a target shade. Our tool provides a digital approximation for
            experimentation and color planning. It is not a manufacturer-verified paint formula.
          </p>
          <p>Actual paint mixing can produce different results because of:</p>
          <ul>
            <li>Pigment concentration, pigment strength and mixing accuracy</li>
            <li>Paint base, brand and formulation</li>
            <li>Drying, curing, surface and lighting conditions</li>
          </ul>
          <p>
            For a physical project, test the resulting color on a small surface before applying it
            to an entire room.
          </p>
          <div className="related-links">
            <a href="/room-color-visualizer/">Preview wall colors</a>
            <a href="/paint-calculator/">Calculate paint quantity</a>
          </div>
        </article>
      </section>
    </>
  );
}
