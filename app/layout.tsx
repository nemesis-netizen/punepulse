import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';

export const metadata: Metadata = {
  title: 'PunePulse — Find Your Kind of Pune',
  description: 'Premium local discovery platform and personalized outing planner for Pune. Discover cafés, hidden gems, hill ridges, and heritage with practical time and budget intelligence.',
  keywords: ['Pune outing planner', 'FC Road cafes', 'Deccan Pune', 'Pune hidden gems', 'Pune travel guide', 'Vetal Tekdi'],
  authors: [{ name: 'PunePulse Editorial Studio' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1A1917] antialiased selection:bg-[#E3EDE8] selection:text-[#1E3A2F]">
        <Navbar />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
