import { invitationService } from '../services/api';
export async function templateDefaults(id) {
  const { data: template } = await invitationService.template(id);
  return {
    ...structuredClone(template.data),
    agenda: template.data.agenda || [],
    videoUrl: template.data.videoUrl || '',
    prayers: template.data.prayers || [],
    wishes: [],
    banks: [],
  };
}
