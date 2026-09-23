import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'How Much Paint Do I Need?',
  description:
    'Learn how to estimate how much paint you need for walls and ceilings using room measurements, coverage, coats and waste allowance.',
  path: '/how-much-paint-do-i-need/',
  type: 'article',
});

export default function HowMuchPaintPage() {
  return (
    <main className="article-page">
      <span className="eyebrow">PAINT PLANNING GUIDE</span>
      <h1>How Much Paint Do I Need?</h1>
      <p className="lead">
        The amount of paint you need depends on the paintable area, the number of coats and the
        coverage rate of the paint you plan to use.
      </p>
      <article>
        <h2>Start With the Paintable Area</h2>
        <p>
          For a rectangular room, begin by estimating the total wall area. The common wall area
          formula is:
        </p>
        <p>
          <span className="formula">Wall Area = 2 x (Room Length + Room Width) x Wall Height</span>
        </p>
        <p>
          Doors and windows can be subtracted from that area when they will not be painted. If you
          are painting a ceiling, calculate the ceiling area separately:
        </p>
        <p>
          <span className="formula">Ceiling Area = Room Length x Room Width</span>
        </p>

        <h2>Use Paint Coverage and Coats</h2>
        <p>
          Paint coverage tells you how much area one litre or gallon can usually cover. After you
          know the paintable area, use this formula:
        </p>
        <p>
          <span className="formula">Paint Needed = Paintable Area / Coverage per Coat x Number of Coats</span>
        </p>
        <p>
          Coverage can vary by paint product, surface texture, primer, application method and
          surface condition. The coverage stated by the manufacturer is the best value to use.
        </p>

        <h2>Add a Practical Allowance</h2>
        <p>
          A small waste allowance can help account for cutting in, roller loading, touch-ups and
          measurement differences. The Paint Planners calculator includes a waste allowance field so
          you can see how it changes the estimate.
        </p>

        <h2>Use the Paint Calculator</h2>
        <p>
          For a quicker estimate, enter your room measurements, doors, windows, coats and coverage
          into the <a href="/paint-calculator/">Paint Planners paint quantity calculator</a>.
        </p>
        <p>
          After estimating paint quantity, you can also <a href="/room-color-visualizer/">preview wall colors</a>{' '}
          or <a href="/color-mixing/">explore custom paint colors</a>.
        </p>
      </article>
    </main>
  );
}
