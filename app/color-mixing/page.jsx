import ToolMarkup from '@/components/ToolMarkup';
import ToolBoot from '@/components/ToolBoot';

export const metadata = {
  title: 'Color Mixing Lab',
  description: 'Explore target HEX colors, estimated digital paint mixing recipes, and room color previews.',
};

export default function ColorMixingPage() {
  return (
    <>
      <ToolMarkup />
      <ToolBoot initialTool="mixer" />
    </>
  );
}
