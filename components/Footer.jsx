import { PrivacySettingsButton } from '@/components/PrivacyPreferences';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p>Copyright 2026 Interior Tailor. Practical tools and guides for your home.</p>
        <div className="footer-links">
          <a href="/blog/">Blog</a>
          <a href="/about/">About</a>
          <a href="/contact/">Contact</a>
          <a href="/privacy-policy/">Privacy Policy</a>
          <a href="/terms/">Terms of Use</a>
          <PrivacySettingsButton />
        </div>
      </div>
    </footer>
  );
}
