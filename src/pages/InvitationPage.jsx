import { Suspense, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { invitationService, apiRequest } from '../services/api';
import { resolveTemplate } from '../config/templateRenderer';
import { InvitationContext } from '../components/Invitation/InvitationContext';
import MobileWrapper from '../components/MobileWrapper/MobileWrapper';
import './InvitationPage.css';

export default function InvitationPage({ customerPreview = false }) {
  const { slug: publicSlug, previewToken } = useParams();
  const slug = customerPreview ? previewToken : publicSlug;
  const [state, setState] = useState({ slug: '', invitation: null, error: '' });

  useEffect(() => {
    const controller = new AbortController();
    (customerPreview
      ? apiRequest('/previews/' + encodeURIComponent(slug), {
          signal: controller.signal,
        })
      : invitationService.invitation(slug, controller.signal)
    )
      .then(({ data }) => {
        setState({ slug, invitation: data, error: '' });
      })
      .catch((error) => {
        if (error.name !== 'AbortError')
          setState({ slug, invitation: null, error: error.message });
      });
    return () => controller.abort();
  }, [slug, customerPreview]);

  if (state.slug !== slug)
    return (
      <div className="invitation-page-state" role="status">
        Memuat undangan…
      </div>
    );
  const invitation = state.invitation;
  const template = resolveTemplate(invitation);
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
      {customerPreview && (
        <>
          <meta name="robots" content="noindex, nofollow" />
          <meta name="referrer" content="no-referrer" />
        </>
      )}
      {customerPreview && (
        <div className="customer-preview-notice" role="status">
          Preview pemeriksaan. Sampaikan persetujuan atau revisi melalui chat
          admin. Link ini untuk pemeriksaan sebelum dibagikan ke tamu.
        </div>
      )}
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
