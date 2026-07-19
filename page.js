import fs from 'node:fs';
import path from 'node:path';
import Script from 'next/script';

export const dynamic = 'force-static';

export default function HomePage() {
  const markup = fs.readFileSync(path.join(process.cwd(), 'content', 'home.html'), 'utf8');
  return <>
    <div dangerouslySetInnerHTML={{ __html: markup }} />
    <Script src="/assets/js/app.js" strategy="afterInteractive" />
  </>;
}
