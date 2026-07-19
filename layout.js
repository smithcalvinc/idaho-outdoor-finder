import './globals.css';

export const metadata = {
  title: 'Idaho Outdoor Finder | Know Before You Go',
  description: 'Practical Southeast Idaho outdoor trip planning with transparent sources, conservative readiness ratings, and server-connected condition checks.',
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'Idaho Outdoor Finder — Know Before You Go',
    description: 'Find realistic Idaho outdoor trips based on activity, drive time, vehicle, family, dogs, cost, access, and verified-condition limits.',
    type: 'website'
  }
};

export const viewport = { themeColor: '#123d2e' };

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
