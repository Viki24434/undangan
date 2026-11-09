import { useContext, useEffect } from 'react';
import { useInvitation } from './InvitationContext';
import { DesignEditorContext } from '../TemplateDesign/DesignEditorContext';
import { availableComponents } from '../TemplateDesign/componentVariants';
import { platinumScenes } from '../../config/platinumScenes';

export default function useTemplateComponents(
  defaults,
  theme,
  wedding = false,
) {
  const invitation = useInvitation();
  const editor = useContext(DesignEditorContext);
  const onComponents = editor?.onComponents;
  const signature = JSON.stringify({
    defaults,
    wedding,
    cinematicHero: Boolean(platinumScenes[theme]),
  });
  useEffect(() => {
    onComponents?.(JSON.parse(signature));
  }, [onComponents, signature]);

  const result = { ...defaults };
  for (const field of availableComponents({
    wedding,
    cinematicHero: Boolean(platinumScenes[theme]),
  })) {
    const override = invitation?.data.design?.components?.[field.key];
    if (field.options.some(([value]) => value === override))
      result[field.key] = override;
  }
  return result;
}
