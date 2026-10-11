import { createContext, useContext } from 'react';

export const InvitationContext = createContext(null);

export function useInvitation() {
  return useContext(InvitationContext);
}

export function useInvitationData(defaults = {}) {
  const invitation = useInvitation();
  if (!invitation) return defaults;
  const overrides = invitation.data;
  const date = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  }).format(new Date(invitation.eventDate));
  return {
    ...defaults,
    ...overrides,
    ...(defaults.groom && { groom: { ...defaults.groom, ...overrides.groom } }),
    ...(defaults.bride && { bride: { ...defaults.bride, ...overrides.bride } }),
    title: invitation.title,
    date,
    targetDate: invitation.eventDate,
    events: (overrides.events || defaults.events || []).map((event) => ({
      ...event,
      date: overrides.events ? event.date || date : date,
    })),
  };
}
