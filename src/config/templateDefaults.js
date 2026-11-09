import { invitationService } from '../services/api';
export async function templateDefaults(id, signal) {
  const { data: template } = await invitationService.template(id, signal);
  return {
    ...structuredClone(template.data),
    agenda: template.data.agenda || [],
    videoUrl: template.data.videoUrl || '',
    prayers: template.data.prayers || [],
    wishes: [],
    banks: [],
  };
}
