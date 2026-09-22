import ToolMarkup from '@/components/ToolMarkup';
import ToolBoot from '@/components/ToolBoot';

export const metadata = {
  title: 'Paint Calculator',
  description: 'Calculate how much paint you need for walls and ceilings, including coats, openings, waste, and estimated cost.',
};

export default function CalculatorPage() {
  return (
    <>
      <ToolMarkup />
      <ToolBoot initialTool="calculator" />
    </>
  );
}
