import WallpaperCalculator from '@/components/WallpaperCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Wallpaper Calculator - How Many Rolls of Wallpaper Do I Need?',
  description: 'Calculate how many wallpaper rolls you need for a room. Accounts for doors, windows, pattern repeat, roll type and waste. Metric and imperial.',
  path: '/wallpaper-calculator/',
});

export default function WallpaperPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">WALLPAPER CALCULATOR</span>
        <h1>Wallpaper Calculator — How Many Rolls Do I Need?</h1>
        <p>
          Calculate how many rolls of wallpaper you need for a room. Enter the room dimensions,
          wall height, number of doors and windows, roll type and pattern repeat to get an
          accurate roll count that accounts for all common sources of waste.
        </p>
      </section>

      <WallpaperCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How Wallpaper Is Calculated</h2>
            <p>Wall area is calculated from room perimeter and height, then openings are deducted:</p>
            <p><span className="formula">Paintable Area = (2 × (L + W) × Height) − (Door + Window Area)</span></p>
            <p>
              The result is divided by the usable coverage per roll. Pattern repeat adds extra
              waste because each drop must be aligned — a 24-inch repeat wastes on average half
              the repeat length per strip. Always buy one extra roll for repairs and future touch-ups.
            </p>
          </article>

          <article className="seo-card">
            <h2>Wallpaper Roll Sizes</h2>
            <ul>
              <li><strong>US Standard roll:</strong> 27 in × 27 ft — approx. 56 usable sq ft per single roll</li>
              <li><strong>European single roll:</strong> 20.5 in × 33 ft — approx. 57 usable sq ft</li>
              <li><strong>Double roll / bolt:</strong> 27 in × 54 ft — approx. 112 usable sq ft (better value, fewer seams)</li>
              <li><strong>Peel &amp; stick:</strong> Typically 24 in × 10 ft per panel — measure in panels not rolls</li>
            </ul>
            <p>Always confirm the exact roll dimensions with the manufacturer before ordering — sizes vary significantly between brands.</p>
          </article>

          <article className="seo-card">
            <h2>Pattern Repeat Guide</h2>
            <p>
              Pattern repeat is the vertical distance between identical motifs on the wallpaper.
              It directly affects how much waste is generated matching strips:
            </p>
            <ul>
              <li><strong>No match (0 in repeat):</strong> No waste from pattern alignment — solids and textures</li>
              <li><strong>Small repeat (2–6 in):</strong> Minimal waste — simple textures and small prints</li>
              <li><strong>Medium repeat (8–16 in):</strong> Moderate waste — allow 10–15% extra</li>
              <li><strong>Large repeat (18–30 in):</strong> Significant waste — allow 15–25% extra</li>
              <li><strong>Drop match:</strong> Every other strip is offset by half the repeat — highest waste</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How do I measure for wallpaper?</summary>
              <p>Measure the perimeter of the room (all four walls), multiply by the ceiling height to get gross wall area in sq ft. Subtract 15 sq ft per door and 10 sq ft per window. Divide by the usable coverage per roll and add 10% for waste.</p>
            </details>
            <details>
              <summary>Should I wallpaper all four walls or just a feature wall?</summary>
              <p>Feature walls (one wall) are more forgiving for first-timers and reduce material cost by 75%. They work especially well with bold patterns or textured wallpaper that would be overwhelming on all four walls.</p>
            </details>
            <details>
              <summary>Can I hang wallpaper over existing wallpaper?</summary>
              <p>This is not recommended — the extra weight can cause both layers to peel, seams telegraph through and new adhesive may not bond well. Strip existing wallpaper and properly prep the wall with primer before hanging new paper.</p>
            </details>
            <div className="related-links">
              <a href="/paint-calculator/">Paint Calculator</a>
              <a href="/square-footage-calculator/">Square Footage Calculator</a>
              <a href="/flooring-calculator/">Flooring Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
