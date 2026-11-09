import { lazy } from 'react';

const DatabaseInvitation = lazy(
  () => import('../components/Invitation/DatabaseInvitation'),
);

export function resolveTemplate(template) {
  if (!template) return null;
  const presentation = template.presentation || template.data?.presentation;
  if (
    presentation?.version !== 1 ||
    !['wedding', 'celebration'].includes(presentation.kind) ||
    !/^invitation-[a-z0-9-]{1,80}$/.test(presentation.style)
  )
    return null;
  const theme = template.theme || template.data?.theme || {};
  const palette = [...(presentation.palette || ['#f6f1e7', '#bda168'])];
  if (theme.background) palette[0] = theme.background;
  if (theme.accent) palette[1] = theme.accent;
  return { ...template, presentation, palette, component: DatabaseInvitation };
}
