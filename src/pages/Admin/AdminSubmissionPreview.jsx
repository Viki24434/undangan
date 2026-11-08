import { Suspense, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import { templateRegistry } from '../../config/templateRegistry';
import { InvitationContext } from '../../components/Invitation/InvitationContext';
import MobileWrapper from '../../components/MobileWrapper/MobileWrapper';

function mapValues(value, replace) {
  if (typeof value === 'string') return replace(value);
  if (Array.isArray(value))
    return value.map((item) => mapValues(item, replace));
  if (value && typeof value === 'object')
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        mapValues(item, replace),
      ]),
    );
  return value;
}

export default function AdminSubmissionPreview() {
  const { id } = useParams();
  const [state, setState] = useState({ invitation: null, error: '' });
  useEffect(() => {
    const controller = new AbortController();
    const urls = [];
    async function load() {
      const { data: submission } = await adminService.submission(
        id,
        controller.signal,
      );
      const images = new Map();
      const used = new Set();
      mapValues(submission.form.data, (value) => {
        if (value.startsWith('customer-image:')) used.add(value.slice(15));
        return value;
      });
      const queue = Array.from(used);
      await Promise.all(
        Array.from({ length: Math.min(4, queue.length) }, async () => {
          while (queue.length && !controller.signal.aborted) {
            const hash = queue.shift();
            const blob = await adminService.submissionImage(
              id,
              hash,
              controller.signal,
            );
            if (controller.signal.aborted) return;
            const url = URL.createObjectURL(blob);
            urls.push(url);
            images.set(`customer-image:${hash}`, url);
          }
        }),
      );
      if (!controller.signal.aborted)
        setState({
          invitation: {
            ...submission.form,
            id: `submission-${id}`,
            preview: true,
            data: mapValues(
              submission.form.data,
              (value) => images.get(value) || value,
            ),
          },
          error: '',
        });
    }
    load().catch((error) => {
      if (error.name !== 'AbortError')
        setState({ invitation: null, error: error.message });
    });
    return () => {
      controller.abort();
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [id]);
  if (!state.invitation)
    return (
      <section className="admin-panel">
        <p role="status">{state.error || 'Menyiapkan preview kiriman…'}</p>
        <Link to={`/admin/kiriman/${id}`}>Kembali ke kiriman</Link>
      </section>
    );
  const template = templateRegistry.find(
    (template) => template.id === state.invitation.templateId,
  );
  if (!template) return <p>Template belum tersedia.</p>;
  const Template = template.component;
  return (
    <InvitationContext.Provider value={state.invitation}>
      <MobileWrapper
        bgImage={state.invitation.data.image || template.img}
        backTo={`/admin/kiriman/${id}`}
      >
        <Suspense fallback={<p>Memuat desain…</p>}>
          <Template />
        </Suspense>
      </MobileWrapper>
    </InvitationContext.Provider>
  );
}
