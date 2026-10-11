import { invitationService } from './api';

export const rsvpService = {
  submitRSVP: async ({ slug, ...data }) => {
    if (!slug)
      throw new Error('Slug undangan diperlukan untuk menyimpan RSVP.');
    const result = await invitationService.rsvp(slug, data);
    return { success: true, ...result.data };
  },
};
