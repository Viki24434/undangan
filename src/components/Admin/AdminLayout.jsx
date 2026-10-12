import { useEffect, useState } from 'react';
import { Link, NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import './Admin.css';

export default function AdminLayout() {
  const [session, setSession] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const controller = new AbortController();
    adminService
      .session(controller.signal)
      .then(({ data }) => setSession(data))
      .catch((error) => {
        if (error.name !== 'AbortError') setError(error.message);
      });
    return () => controller.abort();
  }, []);
  async function logout() {
    try {
      await adminService.logout();
      navigate('/admin/login', { replace: true });
    } catch (error) {
      setError(error.message);
    }
  }
  if (session && !session.user) return <Navigate to="/admin/login" replace />;
  if (!session)
    return (
      <div className="admin-app admin-loading">
        <p role="status">{error || 'Memuat dashboard…'}</p>
        <Link to="/admin/login">Ke halaman login</Link>
      </div>
    );
  return (
    <div className="admin-app admin-shell">
      <aside className="admin-sidebar">
        <Link to="/admin" className="admin-brand">
          ciptain ✳
        </Link>
        <span className="admin-eyebrow">YOUR INVITATION CENTER</span>
        <nav aria-label="Navigasi admin">
          <NavLink to="/admin" end>
            Undangan
          </NavLink>
          <NavLink to="/admin/undangan/baru">Buat undangan</NavLink>
          <NavLink to="/admin/template">Paket template</NavLink>
          <NavLink to="/admin/paket">Harga paket</NavLink>
          <Link to="/katalog">Katalog template ↗</Link>
        </nav>
        <div className="admin-account">
          <strong>{session.user.name}</strong>
          <small>{session.user.email}</small>
          <button type="button" onClick={logout}>
            Keluar akun
          </button>
        </div>
      </aside>
      <main className="admin-main">
        {error && (
          <p role="alert" className="admin-error">
            {error}
          </p>
        )}
        <Outlet context={{ user: session.user }} />
      </main>
    </div>
  );
}
