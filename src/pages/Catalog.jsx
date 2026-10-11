import Navbar from '../components/Navbar/Navbar';
import LandingFooter from '../components/HomeLanding/LandingFooter';
import CatalogContent from '../components/Catalog/CatalogContent';
import './Home.css';
import './Catalog.css';

export default function Catalog() {
  return (
    <div className="invite-home catalog-page" id="beranda">
      <a className="invite-skip" href="#konten">
        Lewati ke konten
      </a>

      <Navbar />
      <CatalogContent />
      <LandingFooter />
    </div>
  );
}
