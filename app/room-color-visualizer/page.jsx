import ToolMarkup from '@/components/ToolMarkup';
import ToolBoot from '@/components/ToolBoot';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Room Color Visualizer - Preview Wall Paint Colors',
  description:
    'Preview paint colors in a room setting with Paint Planners. Explore wall colors, HEX colors and different lighting conditions before choosing a paint color.',
  path: '/room-color-visualizer/',
});

export default function RoomColorVisualizerPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">ROOM COLOR VISUALIZER</span>
        <h1>Room Color Visualizer</h1>
        <p>
          Trying to decide which wall color will work in your room? The Paint Planners Room Color
          Visualizer lets you explore different paint colors in a room environment before you start
          painting.
        </p>
        <p>
          Choose or enter a color and see how it appears in the visualization. You can also explore
          different lighting conditions to understand how the appearance of a color can change.
        </p>
      </section>

      <ToolMarkup />
      <ToolBoot initialTool="mixer" />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>Preview a Wall Color Before Painting</h2>
            <p>
              A paint color can look different depending on lighting, surrounding colors, room size
              and surface characteristics. A digital visualization cannot reproduce the exact
              appearance of physical paint, but it can help you compare color ideas before
              purchasing samples or paint.
            </p>
            <ul>
              <li>Light, dark and neutral wall colors</li>
              <li>Warm and cool colors</li>
              <li>Custom HEX colors</li>
              <li>Daylight and evening appearance</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Remember to Test Physical Paint</h2>
            <p>
              Digital color previews are useful for exploration, but your final color decision
              should be checked with a physical paint sample whenever possible. Different screens
              display colors differently, while natural and artificial lighting can also change how
              a color appears in a room.
            </p>
            <div className="related-links">
              <a href="/color-mixing/">Explore the color mixing tool</a>
              <a href="/paint-calculator/">Estimate paint quantity</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
