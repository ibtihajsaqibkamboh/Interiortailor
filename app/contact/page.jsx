import ContentMarkup from '@/components/ContentMarkup';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Contact Paint Planners',
  description:
    'Contact Paint Planners with calculator issues, color tool feedback, feature suggestions or general website questions.',
  path: '/contact/',
});

export default function Page() {
  return <ContentMarkup name="contact" />;
}
