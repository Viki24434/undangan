import { apiRequest } from './api';

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
