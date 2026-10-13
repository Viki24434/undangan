import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { invitationService } from '../../services/api';

export default function LandingFooter() {
  const { pathname } = useLocation();
  const homePath = pathname === '/' ? '' : '/';
  const [socialLinks, setSocialLinks] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    invitationService
      .socialLinks(controller.signal)
      .then(({ data }) => setSocialLinks(data))
      .catch((error) => {
        if (error.name !== 'AbortError') console.error(error);
      });
    return () => controller.abort();
  }, []);
  return (
    <footer className="invite-footer">
      <div>
        <Link className="invite-brand" to="/">
          ciptain<span>✳</span>
        </Link>
        <p>Merayakan cerita. Menghubungkan hati.</p>
      </div>
      <nav aria-label="Navigasi footer">
        <Link to="/katalog">Katalog</Link>
        <Link to="/panduan">Panduan & FAQ</Link>
        <a href={`${homePath}#cara-kerja`}>Cara kerja</a>
        <a href={`${homePath}#faq`}>FAQ</a>
        <a href="#beranda">Kembali ke atas ↑</a>
      </nav>
      {socialLinks && (
        <nav className="invite-social-links" aria-label="Media sosial">
          {socialLinks.instagram && (
            <a href={socialLinks.instagram} target="_blank" rel="noreferrer">
              Instagram ↗
            </a>
          )}
          {socialLinks.tiktok && (
            <a href={socialLinks.tiktok} target="_blank" rel="noreferrer">
              TikTok ↗
            </a>
          )}
          {socialLinks.whatsapp && (
            <a
              href={`https://wa.me/${socialLinks.whatsapp}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp ↗
            </a>
          )}
        </nav>
      )}
      <small>
        © {new Date().getFullYear()} Ciptain. Dibuat untuk momen berarti.
      </small>
    </footer>
  );
}
