import { Suspense, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import { templateRegistry } from '../../config/templateRegistry';
import { InvitationContext } from '../../components/Invitation/InvitationContext';
import MobileWrapper from '../../components/MobileWrapper/MobileWrapper';

export default function AdminPreview() {
  const { id } = useParams();
  const [state, setState] = useState({ invitation: null, error: '' });
  useEffect(() => {
    const controller = new AbortController();
    adminService
      .find(id, controller.signal)
      .then(({ data }) => setState({ invitation: data, error: '' }))
      .catch((error) => {
        if (error.name !== 'AbortError')
          setState({ invitation: null, error: error.message });
      });
    return () => controller.abort();
  }, [id]);
  if (!state.invitation)
    return (
      <div className="admin-panel">
        <p>{state.error || 'Memuat preview…'}</p>
        <Link to={`/admin/undangan/${id}`}>Kembali ke editor</Link>
      </div>
    );
  const template = templateRegistry.find(
    (item) => item.id === state.invitation.templateId,
  );
  if (!template) return <p>Template belum tersedia.</p>;
  const Template = template.component;
  return (
    <InvitationContext.Provider value={{ ...state.invitation, preview: true }}>
      <MobileWrapper
        bgImage={state.invitation.data.image || template.img}
        backTo={`/admin/undangan/${id}`}
      >
        <Suspense fallback={<p>Memuat desain…</p>}>
          <Template />
        </Suspense>
      </MobileWrapper>
    </InvitationContext.Provider>
  );
}
