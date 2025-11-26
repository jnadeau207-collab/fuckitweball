import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
// This line is essential for the map to look correct
import 'leaflet/dist/leaflet.css'; 
import Layout from '../components/Layout';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      {/* All pages are wrapped in your main Layout component */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}