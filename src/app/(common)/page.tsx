import Navbar from "@/app/(common)/_components/Navbar";
import Hero from "@/app/(common)/_components/Hero";
import About from "@/app/(common)/_components/About";
import Commitments from "@/app/(common)/_components/Commitments";
import PhotoGallery from "@/app/(common)/_components/PhotoGallery";
import VideoGallery from "@/app/(common)/_components/VideoGallery";
import Footer from "@/app/(common)/_components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <Commitments />
      <PhotoGallery />
      <VideoGallery />
      <Footer />
    </div>
  );
}
