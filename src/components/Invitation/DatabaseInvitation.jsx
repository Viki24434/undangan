import { lazy, use } from 'react';
import { useInvitation } from './InvitationContext';
import prepareInvitation from './prepareInvitation';

const renderers = {
  wedding: lazy(() => import('./WeddingInvitation')),
  celebration: lazy(() => import('./CelebrationInvitation')),
};

export default function DatabaseInvitation() {
  const invitation = useInvitation();
  const presentation = invitation?.data?.presentation;

  if (!presentation) {
    return (
      <p className="invitation-page-state" role="alert">
        Konfigurasi tampilan template belum tersedia di server.
      </p>
    );
  }

  use(prepareInvitation(presentation, invitation.data.design?.components));
  const Renderer = renderers[presentation.kind];
  return (
    <Renderer theme={presentation.style} components={presentation.components} />
  );
}
