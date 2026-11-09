import { preloadVariants } from './invitationVariants';

const styles = import.meta.glob('../../styles/themes/*.css');
const resources = new Map();
const renderers = {
  wedding: () => import('./WeddingInvitation'),
  celebration: () => import('./CelebrationInvitation'),
};

async function loadStyles(presentation) {
  if (presentation.components?.experience === 'platinum') {
    await import('../../styles/platinum.css');
    if (presentation.components.adat)
      await import('../../styles/platinumAdat.css');
  }
  await styles[`../../styles/themes/${presentation.style}.css`]?.();
}

export default function prepareInvitation(presentation, overrides = {}) {
  const components = { ...presentation.components, ...overrides };
  const key = JSON.stringify([
    presentation.kind,
    presentation.style,
    components,
  ]);
  let resource = resources.get(key);
  if (!resource) {
    resource = Promise.all([
      renderers[presentation.kind](),
      preloadVariants(presentation.kind, components),
    ]).then(async ([renderer]) => {
      await loadStyles(presentation);
      return renderer.default;
    });
    resources.set(key, resource);
    resource.catch(() => {
      if (resources.get(key) === resource) resources.delete(key);
    });
    if (resources.size > 100) resources.delete(resources.keys().next().value);
  }
  return resource;
}
