import { Link } from 'react-router-dom';
import Arrow from './Arrow';
import PreviewPlayground from './PreviewPlayground';
import TemplateFinder from './TemplateFinder';
import useTemplates from '../../hooks/useTemplates';
import usePackages from '../../hooks/usePackages';
import TemplateCollection from './TemplateCollection';
import FeatureGrid from './FeatureGrid';
import HowItWorks from './HowItWorks';
import FAQ from './FAQ';

export default function HomeContent() {
  const catalog = useTemplates();
  const pricing = usePackages();
  return (
    <main id="konten">
      <section className="invite-hero">
        <div className="invite-hero-copy">
          <span className="invite-eyebrow">
            <span className="invite-dot" /> UNTUK SETIAP MOMEN BERARTI
          </span>
          <h1>
            Cerita bahagia,
            <br />
            layak diundang
            <br />
            dengan <em>indah.</em>
            <span className="invite-star">✳</span>
          </h1>
          <p>
            Bagikan kabar istimewa lewat undangan digital yang hangat, personal,
            dan penuh cerita. Karena momenmu pantas dikenang.
          </p>
          <div className="invite-hero-actions">
            <Link className="invite-button" to="/katalog">
              Temukan undanganmu <Arrow />
            </Link>
            <a className="invite-text-link" href="#temukan-gaya">
              Bantu aku memilih <span>↘</span>
            </a>
          </div>
          <div className="invite-hero-note">
            <span>♡</span>
            <p>
              Dibuat untuk dibuka dengan senyum.
              <br />
              <strong>Dari layar kecil, sampai ke hati.</strong>
            </p>
          </div>
        </div>
        <PreviewPlayground catalog={catalog} />
      </section>
      <div className="invite-ribbon">
        <span>PERSONAL & BERKESAN</span>
        <i>✧</i>
        <span>NYAMAN DI PONSEL</span>
        <i>✧</i>
        <span>MUDAH DIBAGIKAN</span>
        <i>✧</i>
        <span>DETAIL PENUH CERITA</span>
      </div>
      <TemplateFinder catalog={catalog} />
      <TemplateCollection catalog={catalog} pricing={pricing} />
      <FeatureGrid />
      <HowItWorks />
      <FAQ />
      <section className="invite-cta">
        <span className="invite-eyebrow">YOUR MOMENT, YOUR STORY</span>
        <h2>
          Momen hanya sekali.
          <br />
          <em>Kesannya selamanya.</em>
        </h2>
        <p>Temukan undangan yang terasa seperti kamu.</p>
        <Link className="invite-button" to="/katalog">
          Jelajahi koleksi <Arrow />
        </Link>
        <span className="invite-cta-flower" aria-hidden="true">
          ✳
        </span>
      </section>
    </main>
  );
}
