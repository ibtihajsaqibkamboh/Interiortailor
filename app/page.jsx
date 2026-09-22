import ToolMarkup from '@/components/ToolMarkup';
import ToolBoot from '@/components/ToolBoot';

export const metadata = {
  title: 'Paint Calculator & Color Mixing Lab',
  description: 'Estimate paint quantities, explore custom colors, and preview paint colors in a room with Paint Planners.',
};

export default function HomePage() {
  return (
    <>
      <ToolMarkup />
      <ToolBoot initialTool="calculator" />
    </>
  );
}
