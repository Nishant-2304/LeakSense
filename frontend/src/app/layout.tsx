// src/app/layout.tsx
import { Montserrat } from 'next/font/google';
import './globals.css';
import Navbar from '../components/navbar'; // Adjust the import path if needed

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-montserrat',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable}`}>
      <body className="font-montserrat bg-[#f4f4f0]">
        <Navbar />
        {/* Added a top padding utility to children so content doesn't hide under the fixed navbar */}
        <main className="pt-[76px]">
          {children}
        </main>
      </body>
    </html>
  );
}