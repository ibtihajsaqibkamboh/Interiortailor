import ContentMarkup from '@/components/ContentMarkup';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Terms of Use',
  description:
    'Read the terms for using Paint Planners paint calculators, color tools and planning estimates.',
  path: '/terms/',
});

export default function Page() {
  return <ContentMarkup name="terms" />;
}
