import CubicFeetCalculator from '@/components/CubicFeetCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Cubic Feet Calculator - Calculate Volume in Cubic Feet',
  description: 'Calculate volume in cubic feet for rectangular, cylindrical or triangular shapes. Instantly convert to cubic yards, cubic meters, litres and US gallons.',
  path: '/cubic-feet-calculator/',
});

export default function CubicFeetCalculatorPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">CUBIC FEET CALCULATOR</span>
        <h1>Cubic Feet Calculator — Volume in ft³ with Unit Conversions</h1>
        <p>
          Calculate the volume in cubic feet for rectangular boxes, cylinders and triangular prisms.
          All dimensions are entered in feet, and results are automatically converted to cubic yards,
          cubic meters, litres and US gallons — useful for tanks, storage, fills and shipping.
        </p>
      </section>

      <CubicFeetCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>Cubic Feet Formulas by Shape</h2>
            <p>Volume formulas vary by shape. All measurements must be in feet:</p>
            <ul>
              <li><strong>Rectangle / Box:</strong> <span className="formula">L × W × H</span></li>
              <li><strong>Cylinder:</strong> <span className="formula">π × r² × H</span> (r = radius in ft)</li>
              <li><strong>Triangular prism:</strong> <span className="formula">0.5 × Base × Height × Length</span></li>
            </ul>
            <p>
              To convert inches to feet, divide by 12. For example, a 6-inch depth = 0.5 ft.
              To convert centimeters to feet, divide by 30.48.
            </p>
          </article>

          <article className="seo-card">
            <h2>Cubic Feet Unit Conversion Reference</h2>
            <ul>
              <li>1 ft³ = 0.0370 cubic yards</li>
              <li>1 ft³ = 0.0283 cubic meters</li>
              <li>1 ft³ = 28.317 litres</li>
              <li>1 ft³ = 7.4805 US gallons</li>
              <li>1 ft³ = 6.2288 UK gallons</li>
              <li>1 ft³ = 1,728 cubic inches</li>
            </ul>
            <p>
              Cubic feet are commonly used in the US for refrigerator and freezer capacity, HVAC
              ductwork, shipping volumes and concrete bag yields.
            </p>
          </article>

          <article className="seo-card">
            <h2>Practical Uses for Cubic Feet Calculations</h2>
            <ul>
              <li><strong>Aquariums &amp; tanks:</strong> Find water volume to calculate chemical doses</li>
              <li><strong>Storage units:</strong> Determine how much furniture fits in a rental unit</li>
              <li><strong>HVAC:</strong> Calculate room volume for air changes per hour</li>
              <li><strong>Concrete bags:</strong> One 80 lb bag yields ~0.60 ft³ of concrete</li>
              <li><strong>Soil &amp; mulch:</strong> Convert between bags and bulk cubic yard orders</li>
              <li><strong>Shipping:</strong> Calculate dimensional weight for freight pricing</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How do I calculate cubic feet of a room?</summary>
              <p>Measure the room's length, width and ceiling height in feet, then multiply all three. A 12×15 ft room with 9 ft ceilings has 1,620 cubic feet of air volume.</p>
            </details>
            <details>
              <summary>How many cubic feet are in a cubic yard?</summary>
              <p>There are exactly 27 cubic feet in one cubic yard (3 ft × 3 ft × 3 ft = 27 ft³).</p>
            </details>
            <details>
              <summary>How many 80 lb bags of concrete fill one cubic foot?</summary>
              <p>One 80 lb bag of pre-mix concrete yields approximately 0.60 cubic feet of mixed concrete, so you need about 1.67 bags per cubic foot — roughly 45 bags per cubic yard.</p>
            </details>
            <div className="related-links">
              <a href="/cubic-yard-calculator/">Cubic Yard Calculator</a>
              <a href="/pool-gallon-calculator/">Pool Gallon Calculator</a>
              <a href="/concrete-bag-calculator/">Concrete Bag Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
