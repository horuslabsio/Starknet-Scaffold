import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import WhyUs from "./components/WhyUs";
import Features from "./components/features/Features";

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <Hero />
      <Features />
      <WhyUs />
      <Footer />
    </main>
  );
}
