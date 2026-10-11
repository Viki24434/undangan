import { Suspense, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { invitationService } from '../services/api';
import { templateRegistry } from '../config/templateRegistry';
import { InvitationContext } from '../components/Invitation/InvitationContext';
import MobileWrapper from '../components/MobileWrapper/MobileWrapper';
import './InvitationPage.css';

export default function InvitationPage() {
  const { slug } = useParams();
  const [state, setState] = useState({ slug: '', invitation: null, error: '' });

  useEffect(() => {
    const controller = new AbortController();
    invitationService
      .invitation(slug, controller.signal)
      .then(({ data }) => {
        setState({ slug, invitation: data, error: '' });
      })
      .catch((error) => {
        if (error.name !== 'AbortError')
          setState({ slug, invitation: null, error: error.message });
      });
    return () => controller.abort();
  }, [slug]);

  if (state.slug !== slug)
    return (
      <div className="invitation-page-state" role="status">
        Memuat undangan…
      </div>
    );
  const invitation = state.invitation;
  const template = templateRegistry.find(
    (item) => item.id === invitation?.templateId,
  );
  if (state.error || !template) {
    return (
      <div className="invitation-page-state">
        <h1>Undangan belum dapat dibuka</h1>
        <p role="alert">{state.error || 'Template undangan belum tersedia.'}</p>
        <Link to="/katalog">Kembali ke katalog</Link>
      </div>
    );
  }
  const Template = template.component;
  return (
    <InvitationContext.Provider value={invitation}>
      <MobileWrapper bgImage={invitation.data.image || template.img}>
        <Suspense
          fallback={
            <div className="invitation-page-state" role="status">
              Memuat desain…
            </div>
          }
        >
          <Template key={invitation.id} />
        </Suspense>
      </MobileWrapper>
    </InvitationContext.Provider>
  );
}
