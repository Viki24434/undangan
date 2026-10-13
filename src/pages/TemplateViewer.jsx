import { Suspense, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { templateRegistry } from '../config/templateRegistry';
import { invitationService } from '../services/api';
import { InvitationContext } from '../components/Invitation/InvitationContext';
import MobileWrapper from '../components/MobileWrapper/MobileWrapper';
import './InvitationPage.css';

export default function TemplateViewer() {
  const { id } = useParams();
  const [state, setState] = useState({
    id: '',
    template: null,
    socialLinks: null,
    socialError: '',
    error: '',
  });
  const renderer = templateRegistry.find((template) => template.id === id);

  useEffect(() => {
    const controller = new AbortController();
    Promise.allSettled([
      invitationService.template(id, controller.signal),
      invitationService.socialLinks(controller.signal),
    ])
      .then(([templateResult, socialResult]) => {
        if (templateResult.status === 'rejected') throw templateResult.reason;
        setState({
          id,
          template: templateResult.value.data,
          socialLinks:
            socialResult.status === 'fulfilled' ? socialResult.value.data : null,
          socialError:
            socialResult.status === 'rejected'
              ? `Tautan WhatsApp tidak dapat dimuat: ${socialResult.reason.message}`
              : '',
          error: '',
        });
      })
      .catch((error) => {
        if (error.name !== 'AbortError')
          setState({
            id,
            template: null,
            socialLinks: null,
            socialError: '',
            error: error.message,
          });
      });
    return () => controller.abort();
  }, [id]);

  if (state.id !== id) {
    return (
      <div className="invitation-page-state" role="status">
        Memuat template dari server…
      </div>
    );
  }
  if (state.error || !renderer || !state.template) {
    return (
      <div className="invitation-page-state">
        <h1>Template belum dapat dibuka</h1>
        <p role="alert">{state.error || 'Desain template belum tersedia.'}</p>
        <Link to="/katalog">Kembali ke katalog</Link>
      </div>
    );
  }
  const template = state.template;
  const Template = renderer.component;
  const data = template.data;
  const orderTo = state.socialLinks?.whatsapp
    ? `https://wa.me/${state.socialLinks.whatsapp}?text=${encodeURIComponent(
        `Halo, saya tertarik memesan template ${template.name}. ${window.location.origin}/t/${id}`,
      )}`
    : '';
  const invitation = {
    id: template.id,
    templateId: template.id,
    title:
      data.title ||
      (data.groom && data.bride
        ? `${data.groom.name} & ${data.bride.name}`
        : data.honoree || template.name),
    eventDate: data.targetDate,
    data,
    preview: true,
  };

  return (
    <InvitationContext.Provider value={invitation}>
      <MobileWrapper
        bgImage={data.image || template.img}
        editTo={`/edit/${id}`}
        orderTo={orderTo}
        orderError={state.socialError}
      >
        <Suspense
          fallback={
            <div className="invitation-page-state" role="status">
              Memuat desain…
            </div>
          }
        >
          <Template key={id} />
        </Suspense>
      </MobileWrapper>
    </InvitationContext.Provider>
  );
}
