import Navbar from '../components/Navbar/Navbar';
import HomeContent from '../components/HomeLanding/HomeContent';
import LandingFooter from '../components/HomeLanding/LandingFooter';
import './Home.css';

export default function Home() {
  return (
    <div className="invite-home" id="beranda">
      <a className="invite-skip" href="#konten">
        Lewati ke konten
      </a>

      <Navbar />
      <HomeContent />
      <LandingFooter />
    </div>
  );
}
