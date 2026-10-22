import AdminLayout from './components/Admin/AdminLayout';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminEditor from './pages/Admin/AdminEditor';
import AdminGuestList from './pages/Admin/AdminGuestList';
import AdminPreview from './pages/Admin/AdminPreview';
import AdminTemplates from './pages/Admin/AdminTemplates';
import AdminTemplateEditor from './pages/Admin/AdminTemplateEditor';
import AdminPackages from './pages/Admin/AdminPackages';
import AdminSocialLinks from './pages/Admin/AdminSocialLinks';
import InvitationPage from './pages/InvitationPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import TemplateViewer from './pages/TemplateViewer';
import Guide from './pages/Guide';
import ConsumerEditor from './pages/ConsumerEditor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="template" element={<AdminTemplates />} />
          <Route path="template/:id" element={<AdminTemplateEditor />} />
          <Route path="paket" element={<AdminPackages />} />
          <Route path="sosial-media" element={<AdminSocialLinks />} />
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
    </BrowserRouter>
  );
}

export default App;
