import RootLayoutServer from './RootLayout.server';
import RootLayoutClient from './RootLayout.client';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayoutServer>
      <RootLayoutClient>{children}</RootLayoutClient>
    </RootLayoutServer>
  );
}
