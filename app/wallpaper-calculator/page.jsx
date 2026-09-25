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
        <h1>Wallpaper Calculator</h1>
        <p>
          Calculate how many rolls of wallpaper you need for a room. Enter the room dimensions,
          wall height, number of doors and windows, roll type and pattern repeat loss to get an
          accurate roll count.
        </p>
      </section>

      <WallpaperCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How Wallpaper Is Calculated</h2>
            <p>Wall area is calculated from room perimeter and height, then doors and windows are deducted:</p>
            <p><span className="formula">Wall Area = Perimeter × Wall Height − Openings</span></p>
            <p>Pattern repeat adds extra waste because strips must be aligned. A large 24 in pattern repeat can add 15–25% to your material needs.</p>
          </article>
          <article className="seo-card">
            <h2>Wallpaper Roll Sizes</h2>
            <ul>
              <li><strong>US Standard:</strong> 27 in × 27 ft, ~56 usable sq ft per roll</li>
              <li><strong>European:</strong> 20.5 in × 33 ft, ~57 usable sq ft per roll</li>
              <li><strong>Double roll:</strong> 27 in × 54 ft, ~112 usable sq ft</li>
            </ul>
            <p>Always buy one extra roll for repairs and pattern matching, and confirm your exact roll size with the manufacturer before ordering.</p>
            <div className="related-links">
              <a href="/paint-calculator/">Paint Calculator</a>
              <a href="/square-footage-calculator/">Square Footage Calculator</a>
              <a href="/insulation-calculator/">Insulation Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
