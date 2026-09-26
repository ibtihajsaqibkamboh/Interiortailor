import ToolMarkup from '@/components/ToolMarkup';
import ToolBoot from '@/components/ToolBoot';
import JsonLd from '@/components/JsonLd';
import ToolsGrid from '@/components/ToolsGrid';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Paint Calculator - How Much Paint Do I Need?',
  description:
    'Calculate how much paint you need for walls and ceilings. Account for room size, doors, windows, coats and paint coverage, then explore colors with Interior Tailor.',
  path: '/',
});

const faqs = [
  {
    question: 'How much paint do I need for a room?',
    answer:
      "The amount depends on the room's wall area, ceiling area if applicable, doors and windows, number of coats and the paint's coverage rate. Enter your measurements into the Interior Tailor calculator to get an estimate.",
  },
  {
    question: 'How do I calculate paint for walls?',
    answer:
      'For a rectangular room, calculate the wall area using: 2 x (length + width) x wall height. Then subtract the area of doors and windows that will not be painted.',
  },
  {
    question: 'Does the paint calculator include doors and windows?',
    answer: 'Yes. You can enter doors and windows so their areas can be deducted from the total wall area.',
  },
  {
    question: 'Does ceiling paint require a separate calculation?',
    answer:
      'Yes. A rectangular ceiling can be calculated using: Length x Width. You can add the ceiling to your project when using the calculator.',
  },
  {
    question: 'How many coats of paint should I use?',
    answer:
      "The required number of coats depends on the paint product, surface condition, existing color and desired finish. Follow the paint manufacturer's instructions for the product you plan to use.",
  },
  {
    question: 'Is the paint calculator exact?',
    answer:
      'No calculator can guarantee the exact amount of paint required for every project. The result is an estimate based on the information entered. Surface condition, application method, paint formulation and actual coverage can change the final amount.',
  },
  {
    question: 'Can I calculate paint in litres or gallons?',
    answer:
      'The calculator supports different measurement systems. Select the system appropriate for your project and enter your measurements accordingly.',
  },
  {
    question: 'Can I use the calculator for a bedroom?',
    answer:
      "Yes. Enter the bedroom's length, width and wall height, then add doors, windows, coats and other applicable information.",
  },
];

export default function HomePage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <section className="seo-hero">
        <span className="eyebrow">INTERIOR TAILOR</span>
        <h1>Paint Calculator - How Much Paint Do I Need?</h1>
        <p>
          Planning a painting project? Interior Tailor helps you estimate how much paint you may need
          before you buy. Enter your room dimensions, doors and windows, number of coats, paint
          coverage and waste allowance to get a practical paint estimate.
        </p>
        <p>
          You can also explore custom colors with our Color Mixing Lab and preview a selected color
          in a room visualization.
        </p>
      </section>

      <ToolMarkup />
      <ToolBoot initialTool="calculator" />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How Much Paint Do I Need?</h2>
            <p>
              The amount of paint required depends on the surface area you are painting, the number
              of coats, the paint&apos;s coverage rate and the condition of the surface.
            </p>
            <p>
              For walls, the basic calculation starts with the room&apos;s perimeter and wall height:
              <br />
              <span className="formula">Wall Area = 2 x (Room Length + Room Width) x Wall Height</span>
            </p>
            <p>
              If you are painting the ceiling, use <span className="formula">Ceiling Area = Room Length x Room Width</span>.
              Then estimate paint with <span className="formula">Paint Needed = Paintable Area / Coverage per Coat x Number of Coats</span>.
            </p>
            <p>
              Actual paint requirements can differ because coverage depends on product, surface
              texture, porosity, application method and other project conditions.
            </p>
          </article>

          <article className="seo-card">
            <h2>How to Use the Paint Calculator</h2>
            <ol>
              <li>Enter your room measurements.</li>
              <li>Add doors and windows so their areas can be deducted.</li>
              <li>Choose the number of coats you plan to apply.</li>
              <li>Add ceiling measurements if you are painting the ceiling.</li>
              <li>Enter the coverage stated by your paint manufacturer.</li>
              <li>Add a waste allowance for practical variation.</li>
              <li>Review your paint estimate and paintable area.</li>
            </ol>
          </article>

          <article className="seo-card">
            <h2>Calculate Paint for Different Painting Projects</h2>
            <p>Interior Tailor can be used as a starting point for estimating paint requirements for:</p>
            <ul>
              <li>Bedrooms, living rooms, dining rooms and offices</li>
              <li>Hallways, ceilings and interior walls</li>
              <li>Multiple-wall projects and other measurable surfaces</li>
            </ul>
            <p>
              For unusual room shapes or surfaces, divide the area into smaller measurable sections
              and calculate each section separately.
            </p>
          </article>

          <article className="seo-card">
            <h2>Explore Paint Colors Before You Start Painting</h2>
            <h3>Paint Color Mixing</h3>
            <p>
              Use the Color Mixing Lab to enter a target HEX color and explore an estimated digital
              mixing recipe. It is a planning tool, not an exact manufacturer formula.
            </p>
            <h3>Room Color Visualization</h3>
            <p>
              Use the Room Color Visualizer to preview a selected color in a room environment and
              explore different lighting conditions.
            </p>
          </article>
        </div>
      </section>

      <ToolsGrid />

      

      <section className="seo-band">
        <article className="seo-card">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </article>
      </section>
      <section className="seo-band">
        <article className="seo-card">
          <h2>Related Paint Planning Tools</h2>
          <div className="related-links">
            <a href="/paint-calculator/">Open the paint quantity calculator</a>
            <a href="/room-color-visualizer/">Preview wall colors</a>
            <a href="/color-mixing/">Explore color mixing</a>
            <a href="/how-much-paint-do-i-need/">Learn how much paint you need</a>
            <a href="/about/">About Interior Tailor</a>
          </div>
        </article>
      </section>
    </>
  );
}
