import { templateRegistry } from './templateRegistry';

export function resolveTemplate(template) {
  if (!template) return null;
  const rendererId = template.rendererId || template.templateId || template.id;
  const renderer = templateRegistry.find((item) => item.id === rendererId);
  if (!renderer) return null;
  const theme = template.theme || template.data?.theme || {};
  const palette = [
    ...(template.palette || renderer.palette || ['#f6f1e7', '#bda168']),
  ];
  if (theme.background) palette[0] = theme.background;
  if (theme.accent) palette[1] = theme.accent;
  return { ...renderer, ...template, palette, component: renderer.component };
}
