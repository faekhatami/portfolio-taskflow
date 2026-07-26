import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Button from "@/components/Button";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />

      <div className="flex justify-center mt-8">
        <Button text="Get Started" />
      </div>
    </main>
  );
}