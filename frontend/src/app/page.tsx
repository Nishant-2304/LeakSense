// src/app/page.tsx
import PresentationScroller from "@/components/PresentationScroller";
import BeyondPrototype from "@/components/BeyondPrototype";
import LiveDemo from "@/components/LiveDemo";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <PresentationScroller />
      <BeyondPrototype />
      <LiveDemo />
      <Footer />
    </main>
  );
}