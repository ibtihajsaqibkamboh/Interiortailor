import ContentMarkup from '@/components/ContentMarkup';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'About Paint Planners',
  description:
    'Learn about Paint Planners, a practical resource for estimating paint quantities and exploring wall colors before a painting project.',
  path: '/about/',
});

export default function Page() {
  return <ContentMarkup name="about" />;
}
