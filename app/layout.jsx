import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  metadataBase: new URL('https://YOUR-DOMAIN.com'),
  title: {
    default: 'Paint Planners — Paint Calculator & Color Mixing Lab',
    template: '%s | Paint Planners',
  },
  description:
    'Free paint calculator and color mixing lab for estimating paint quantities and exploring custom wall colors.',
  icons: {
    icon: '/assets/paint-planners-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
