import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'How to Calculate Wall Area for Painting',
  description:
    'Learn how to calculate wall area for painting, subtract doors and windows, and use the result in a paint estimate.',
  path: '/how-to-calculate-wall-area-for-painting/',
  type: 'article',
});

export default function WallAreaArticlePage() {
  return (
    <main className="article-page">
      <span className="eyebrow">PAINT PLANNING GUIDE</span>
      <h1>How to Calculate Wall Area for Painting</h1>
      <p className="lead">
        Wall area is one of the most important measurements in a paint estimate. It helps you turn
        room dimensions into a practical starting point for paint quantity.
      </p>
      <article>
        <h2>Wall Area Formula</h2>
        <p>For a rectangular room, use the room length, room width and wall height:</p>
        <p>
          <span className="formula">Wall Area = 2 x (Length + Width) x Wall Height</span>
        </p>
        <p>
          This formula estimates the total area of the four walls before subtracting openings such
          as doors and windows.
        </p>

        <h2>Subtract Doors and Windows</h2>
        <p>
          Doors and windows are usually not painted, so their areas can be deducted from the wall
          area.
        </p>
        <p>
          <span className="formula">Opening Area = Opening Width x Opening Height</span>
        </p>
        <p>
          If there are multiple doors or windows of the same size, multiply the opening area by the
          number of openings.
        </p>

        <h2>Handle Unusual Room Shapes</h2>
        <p>
          For rooms that are not rectangular, divide the walls into smaller measurable sections.
          Calculate each section separately, then add the areas together before subtracting openings.
        </p>

        <h2>Turn Wall Area Into a Paint Estimate</h2>
        <p>
          Once you have the paintable wall area, combine it with coverage and number of coats. You
          can do this manually or use the <a href="/paint-calculator/">Interior Tailor paint calculator</a>{' '}
          to estimate paint quantity from your measurements.
        </p>
      </article>
    </main>
  );
}
