export const API_BASE_URL = (import.meta.env?.VITE_API_URL || '/api').replace(
  /\/$/,
  '',
);

export async function apiRequest(
  path,
  {
    body,
    signal,
    method = 'GET',
    baseURL = API_BASE_URL,
    headers = {},
    credentials = 'same-origin',
  } = {},
) {
  let response;
  try {
    response = await fetch(`${baseURL}${path}`, {
      method,
      signal,
      credentials,
      headers: {
        ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
        ...headers,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new Error(
      'Backend belum dapat dihubungi. Pastikan server Node.js aktif.',
      { cause: error },
    );
  }
  const result = await response.json();
  if (!response.ok || !result.success) {
    const error = new Error(result.message || 'Permintaan gagal diproses.');
    error.status = response.status;
    throw error;
  }
  return result;
}

export const invitationService = {
  async sendPhoto(slug, name, blob) {
    let response;
    try {
      response = await fetch(
        `${API_BASE_URL}/invitations/${encodeURIComponent(slug)}/photos?to=${encodeURIComponent(name)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': blob.type },
          body: blob,
        },
      );
    } catch {
      throw new Error('Foto belum terkirim. Periksa koneksi lalu coba lagi.');
    }
    const result = await response.json();
    if (!response.ok || !result.success)
      throw new Error(result.message || 'Foto belum dapat dikirim.');
    return result.data;
  },
  packages: (signal) => apiRequest('/packages', { signal }),
  templates: (signal) => apiRequest('/templates', { signal }),
  socialLinks: (signal) => apiRequest('/social-links', { signal }),
  template: (id, signal) =>
    apiRequest(`/templates/${encodeURIComponent(id)}`, { signal }),
  invitation: (slug, signal) =>
    apiRequest(`/invitations/${encodeURIComponent(slug)}`, { signal }),
  wishes: (slug, signal, offset = 0) =>
    apiRequest(
      `/invitations/${encodeURIComponent(slug)}/wishes?limit=20&offset=${offset}`,
      { signal },
    ),
  sendWish: (slug, body) =>
    apiRequest(`/invitations/${encodeURIComponent(slug)}/wishes`, {
      method: 'POST',
      body,
    }),
  rsvp: (slug, body) =>
    apiRequest(`/invitations/${encodeURIComponent(slug)}/rsvps`, {
      method: 'POST',
      body,
    }),
};
