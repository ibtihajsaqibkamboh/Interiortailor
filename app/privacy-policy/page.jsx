import ContentMarkup from '@/components/ContentMarkup';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'Read the Interior Tailor privacy policy, including information about contact submissions, browser storage, analytics and advertising.',
  path: '/privacy-policy/',
});

export default function Page() {
  return <ContentMarkup name="privacy-policy" />;
}
