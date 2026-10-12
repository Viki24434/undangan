import { useEffect, useState } from 'react';
import { invitationPackages } from '../config/invitationPackages';
import { invitationService } from '../services/api';

export default function usePackages() {
  const [state, setState] = useState({
    packages: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const controller = new AbortController();
    invitationService
      .packages(controller.signal)
      .then(({ data }) =>
        setState({ packages: data, loading: false, error: '' }),
      )
      .catch((error) => {
        if (error.name !== 'AbortError')
          setState({ packages: [], loading: false, error: error.message });
      });
    return () => controller.abort();
  }, []);

  return {
    ...state,
    packages: invitationPackages.map((item) => ({
      ...item,
      price: null,
      priceMode: item.id === 'exclusive' ? 'custom' : 'fixed',
      ...state.packages.find((stored) => stored.id === item.id),
    })),
  };
}
