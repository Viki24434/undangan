import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const AdminLayout = lazy(() => import('./components/Admin/AdminLayout'));
const AdminLogin = lazy(() => import('./pages/Admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'));
const AdminEditor = lazy(() => import('./pages/Admin/AdminEditor'));
const AdminGuestList = lazy(() => import('./pages/Admin/AdminGuestList'));
const AdminPreview = lazy(() => import('./pages/Admin/AdminPreview'));
const AdminTemplates = lazy(() => import('./pages/Admin/AdminTemplates'));
const AdminTemplateEditor = lazy(
  () => import('./pages/Admin/AdminTemplateEditor'),
);
const AdminTemplateDesigner = lazy(
  () => import('./pages/Admin/AdminTemplateDesigner'),
);
const AdminPackages = lazy(() => import('./pages/Admin/AdminPackages'));
const AdminSocialLinks = lazy(() => import('./pages/Admin/AdminSocialLinks'));
const AdminSubmissions = lazy(() => import('./pages/Admin/AdminSubmissions'));
const AdminSubmission = lazy(() => import('./pages/Admin/AdminSubmission'));
const AdminSubmissionPreview = lazy(
  () => import('./pages/Admin/AdminSubmissionPreview'),
);
const InvitationPage = lazy(() => import('./pages/InvitationPage'));
const Home = lazy(() => import('./pages/Home'));
const Catalog = lazy(() => import('./pages/Catalog'));
const TemplateViewer = lazy(() => import('./pages/TemplateViewer'));
const Guide = lazy(() => import('./pages/Guide'));
const ConsumerEditor = lazy(() => import('./pages/ConsumerEditor'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p role="status">Memuat halaman…</p>}>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="template" element={<AdminTemplates />} />
            <Route path="template/:id" element={<AdminTemplateEditor />} />
            <Route path="template/baru" element={<AdminTemplateDesigner />} />
            <Route
              path="template/:id/desain"
              element={<AdminTemplateDesigner />}
            />
            <Route path="paket" element={<AdminPackages />} />
            <Route path="sosial-media" element={<AdminSocialLinks />} />
            <Route path="kiriman" element={<AdminSubmissions />} />
            <Route path="kiriman/:id" element={<AdminSubmission />} />
            <Route
              path="kiriman/:id/preview"
              element={<AdminSubmissionPreview />}
            />
            <Route path="undangan/baru" element={<AdminEditor key="new" />} />
            <Route path="undangan/:id" element={<AdminEditor />} />
            <Route path="undangan/:id/tamu" element={<AdminGuestList />} />
            <Route path="undangan/:id/preview" element={<AdminPreview />} />
          </Route>
          <Route path="/" element={<Home />} />

          <Route path="/katalog" element={<Catalog />} />
          <Route path="/panduan" element={<Guide />} />

          <Route path="/t/:id" element={<TemplateViewer />} />
          <Route path="/edit/:id" element={<ConsumerEditor />} />
          <Route path="/u/:slug" element={<InvitationPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
