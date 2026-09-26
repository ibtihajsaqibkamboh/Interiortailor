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
        <h1>Cubic Feet Calculator</h1>
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
            <ul>
              <li><strong>Rectangle:</strong> <span className="formula">L × W × H</span></li>
              <li><strong>Cylinder:</strong> <span className="formula">π × r² × H</span> (r = radius)</li>
              <li><strong>Triangle prism:</strong> <span className="formula">0.5 × Base × Height × Length</span></li>
            </ul>
            <p>Convert inches to feet by dividing by 12 before entering values. For example, 6 inches = 0.5 feet.</p>
          </article>
          <article className="seo-card">
            <h2>Volume Unit Conversions</h2>
            <ul>
              <li>1 ft³ = 0.037 yd³</li>
              <li>1 ft³ = 0.0283 m³</li>
              <li>1 ft³ = 28.32 litres</li>
              <li>1 ft³ = 7.48 US gallons</li>
              <li>1 ft³ = 6.23 UK gallons</li>
            </ul>
            <div className="related-links">
              <a href="/cubic-yard-calculator/">Cubic Yard Calculator</a>
              <a href="/pool-gallon-calculator/">Pool Gallon Calculator</a>
              <a href="/concrete-calculator/">Concrete Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
