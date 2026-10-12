import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import '../../components/Admin/Admin.css';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
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
  if (session?.user) return <Navigate to="/admin" replace />;
  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await adminService.login(form, session.setupRequired);
      navigate('/admin', { replace: true });
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy(false);
    }
  }
  function field(key) {
    return {
      value: form[key],
      onChange: (event) => setForm({ ...form, [key]: event.target.value }),
    };
  }
  return (
    <div className="admin-app admin-login-page">
      <section className="admin-login-card">
        <Link className="admin-brand" to="/">
          ciptain ✳
        </Link>
        <span className="admin-eyebrow">ADMIN CENTER</span>
        <h1>
          {session?.setupRequired
            ? 'Mulai kelola cerita.'
            : 'Selamat datang kembali.'}
        </h1>
        <p>
          {session?.setupRequired
            ? 'Buat akun admin pertama untuk mengelola undanganmu.'
            : 'Masuk untuk mengelola undangan dan tamu.'}
        </p>
        {!session && !error && <p role="status">Memeriksa session…</p>}
        <form onSubmit={submit} className="admin-form">
          {session?.setupRequired && (
            <label>
              Nama admin
              <input
                required
                maxLength={80}
                autoComplete="name"
                {...field('name')}
              />
            </label>
          )}
          <label>
            Email
            <input
              type="email"
              required
              maxLength={160}
              autoComplete="username"
              {...field('email')}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              required
              minLength={12}
              maxLength={128}
              autoComplete={
                session?.setupRequired ? 'new-password' : 'current-password'
              }
              {...field('password')}
            />
          </label>
          <small>Gunakan password minimal 12 karakter.</small>
          {error && (
            <p className="admin-error" role="alert">
              {error}
            </p>
          )}
          <button className="admin-button" disabled={busy || !session}>
            {busy
              ? 'Memproses…'
              : session?.setupRequired
                ? 'Buat akun admin'
                : 'Masuk dashboard'}
          </button>
        </form>
        {!session && error && (
          <button
            type="button"
            className="admin-button secondary"
            onClick={() => window.location.reload()}
          >
            Coba lagi
          </button>
        )}
      </section>
    </div>
  );
}
