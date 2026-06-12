import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../contexts/AuthContext";

export default function About() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-[var(--bg)] page-transition flex flex-col" data-testid="about-page">
      {user && <Navbar />}
      <main className="flex-1 w-full px-5 sm:px-6 lg:px-8 xl:px-10 py-10">
        <h1 className="font-brush text-[44px] sm:text-[64px] leading-none mb-6 hero-title">
          <span className="text-white">WHAT IS </span><span className="text-[var(--purple)]">LASTLAP?</span>
        </h1>
        <div className="font-mono-crt text-[18px] sm:text-[20px] text-[var(--muted)] space-y-6 leading-relaxed">
          <p className="row-animate stagger-1">LastLap is a racing-inspired NFT ecosystem built on Base, where ownership goes beyond collecting and becomes a gateway to participation, rewards, and exclusive experiences.</p>
          <p className="row-animate stagger-2">Inspired by the defining moment of every race - the final lap - LastLap is built for those who embrace competition, take calculated risks, and keep pushing forward. We're creating a community-driven ecosystem where holders play an active role in shaping the journey and unlocking future opportunities.</p>
          <p className="row-animate stagger-3">Built on Base. Powered by ambition. Defined by the Final Lap.</p>
        </div>
        <div className="mt-12 flex flex-col sm:flex-row gap-3">
          <Link to="/" className="btn-primary-ll py-3 px-6 w-full sm:w-auto cta-pulse" data-testid="about-cta-dashboard">ENTER THE TRACK</Link>
          {!user && <Link to="/register" className="btn-ghost-ll py-3 px-6 w-full sm:w-auto cta-pulse" data-testid="about-cta-register">JOIN THE GRID</Link>}
        </div>
      </main>
      {user && <Footer />}
    </div>
  );
}
