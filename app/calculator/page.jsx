import ToolMarkup from '@/components/ToolMarkup';
import ToolBoot from '@/components/ToolBoot';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Paint Quantity Calculator - How Much Paint Do I Need?',
  description:
    'Use the Paint Planners paint calculator to estimate paint for walls and ceilings from room dimensions, openings, coats and coverage.',
  path: '/paint-calculator/',
});

export default function CalculatorPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">PAINT CALCULATOR</span>
        <h1>Paint Quantity Calculator</h1>
        <p>
          Estimate how much paint you may need for walls and ceilings with the Paint Planners paint
          calculator.
        </p>
      </section>
      <ToolMarkup />
      <ToolBoot initialTool="calculator" />
    </>
  );
}
