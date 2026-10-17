import { apiRequest, API_BASE_URL } from './api';

let csrfToken = '';
async function request(path, options = {}) {
  const result = await apiRequest(path, {
    ...options,
    credentials: 'include',
    headers: csrfToken ? { 'X-CSRF-Token': csrfToken } : {},
  });
  if (result.data?.csrfToken) csrfToken = result.data.csrfToken;
  return result;
}
export const adminService = {
  async downloadGuestPhoto(invitationId, photo) {
    const response = await fetch(
      `${API_BASE_URL}/admin/invitations/${encodeURIComponent(invitationId)}/photos/${encodeURIComponent(photo.id)}`,
      { credentials: 'include' },
    );
    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message || 'Foto belum dapat diunduh.');
    }
    const url = URL.createObjectURL(await response.blob());
    const link = document.createElement('a');
    link.href = url;
    link.download = photo.filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  },
  async uploadImage(blob, signal) {
    const response = await fetch(API_BASE_URL + '/admin/uploads', {
      method: 'POST',
      credentials: 'include',
      signal,
      headers: { 'Content-Type': blob.type, 'X-CSRF-Token': csrfToken },
      body: blob,
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Upload gambar gagal.');
    return result.data.url;
  },
  updatePackagePrice: (id, price) =>
    request('/admin/packages/' + encodeURIComponent(id), {
      method: 'PATCH',
      body: { price },
    }),
  updateTemplatePackage: (id, packageId) =>
    request('/admin/templates/' + encodeURIComponent(id), {
      method: 'PATCH',
      body: { packageId },
    }),
  updateTemplate: (id, data) =>
    request('/admin/templates/' + encodeURIComponent(id), {
      method: 'PATCH',
      body: { data },
    }),
  updateSocialLinks: (body) =>
    request('/admin/social-links', { method: 'PATCH', body }),
  session: (signal) => request('/auth/session', { signal }),
  login: (body, setup = false) =>
    request(setup ? '/auth/setup' : '/auth/login', { method: 'POST', body }),
  logout: async () => {
    const result = await request('/auth/logout', { method: 'POST' });
    csrfToken = '';
    return result;
  },
  list: (offset = 0, signal) =>
    request(`/admin/invitations?limit=20&offset=${offset}`, { signal }),
  find: (id, signal) =>
    request(`/admin/invitations/${encodeURIComponent(id)}`, { signal }),
  save: (body, id) =>
    request(
      id
        ? `/admin/invitations/${encodeURIComponent(id)}`
        : '/admin/invitations',
      { method: id ? 'PATCH' : 'POST', body },
    ),
  remove: (id) =>
    request(`/admin/invitations/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    }),
  guests: (id, type, offset = 0, signal) =>
    request(
      `/admin/invitations/${encodeURIComponent(id)}/${type}?limit=100&offset=${offset}`,
      { signal },
    ),
  removeWish: (id) =>
    request(`/admin/wishes/${encodeURIComponent(id)}`, { method: 'DELETE' }),
};
