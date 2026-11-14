import { useSearchParams } from 'react-router-dom';
import { invitationPackages } from '../../config/invitationPackages';

const defaults = {
  category: 'Semua',
  package: 'all',
  q: '',
  sort: 'default',
  favorites: '',
};

export default function useCatalogFilters() {
  const [params, setParams] = useSearchParams();
  const category = params.get('category') || 'Semua';
  const requestedPackage = params.get('package');
  const packageId = invitationPackages.some(
    (item) => item.id === requestedPackage,
  )
    ? requestedPackage
    : 'all';
  const requestedSort = params.get('sort');
  const sort = ['asc', 'desc', 'price-asc', 'price-desc'].includes(
    requestedSort,
  )
    ? requestedSort
    : 'default';
  const query = params.get('q') || '';
  const favoritesOnly = params.get('favorites') === '1';

  function change(key, value) {
    const next = new URLSearchParams(window.location.search);
    if (value === defaults[key] || !value) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true, preventScrollReset: true });
  }

  function reset() {
    const next = new URLSearchParams(window.location.search);
    Object.keys(defaults).forEach((key) => next.delete(key));
    setParams(next, { replace: true, preventScrollReset: true });
  }

  return { category, packageId, query, sort, favoritesOnly, change, reset };
}
