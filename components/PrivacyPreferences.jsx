'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const KEY = 'interior-tailor-analytics-consent';
const GA_ID = 'G-NNVDRXJN21';

export function PrivacySettingsButton() {
  return <button type="button" className="privacy-settings-button" onClick={() => window.dispatchEvent(new Event('privacy:open'))}>Cookie preferences</button>;
}

export default function PrivacyPreferences() {
  const [visible, setVisible] = useState(false);
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    let saved;
    try { saved = localStorage.getItem(KEY); } catch { /* Keep analytics off if storage is unavailable. */ }
    setAllowed(saved === 'granted');
    setVisible(!['granted', 'denied'].includes(saved));
    const open = () => setVisible(true);
    window.addEventListener('privacy:open', open);
    return () => window.removeEventListener('privacy:open', open);
  }, []);

  function choose(granted) {
    const value = granted ? 'granted' : 'denied';
    try { localStorage.setItem(KEY, value); } catch { /* The choice still applies for this page visit. */ }
    window[`ga-disable-${GA_ID}`] = !granted;
    if (window.gtag) window.gtag('consent', 'update', { analytics_storage: value, ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    if (!granted) {
      const hostname = window.location.hostname;
      const domains = ['', hostname];
      const labels = hostname.split('.');
      for (let i = 0; i < labels.length - 1; i++) domains.push(`.${labels.slice(i).join('.')}`);
      document.cookie.split(';').forEach(cookie => {
        const name = cookie.trim().split('=')[0];
        if (name === '_ga' || name.startsWith('_ga_')) domains.forEach(domain => {
          document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ''}`;
        });
      });
    }
    setAllowed(granted);
    setVisible(false);
  }

  return <>
    {allowed && <>
      <Script id="analytics-consent" strategy="afterInteractive">{`window['ga-disable-${GA_ID}'] = false; window.dataLayer = window.dataLayer || []; window.gtag = window.gtag || function(){dataLayer.push(arguments);}; gtag('consent', 'default', {analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'}); gtag('js', new Date()); gtag('config', '${GA_ID}');`}</Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
    </>}
    {visible && <section className="privacy-notice" aria-labelledby="privacy-title" aria-describedby="privacy-description">
      <h2 id="privacy-title">Your cookie preferences</h2><p id="privacy-description">Our tools save settings in your browser. Optional Google Analytics helps us understand site visits and loads only if you allow it. Read our <a href="/privacy-policy/">privacy policy</a>.</p>
      <div className="privacy-notice__actions"><button type="button" onClick={() => choose(false)}>Essential only</button><button type="button" onClick={() => choose(true)}>Allow analytics</button></div>
    </section>}
  </>;
}
