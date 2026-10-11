import { invitationService } from '../services/api';
export async function templateDefaults(id) {
  const { data: template } = await invitationService.template(id);
  return { ...structuredClone(template.data), wishes: [], banks: [] };
}
