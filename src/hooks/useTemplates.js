import { useEffect, useState } from 'react';
import { invitationService } from '../services/api';
import { templateRegistry } from '../config/templateRegistry';

export default function useTemplates() {
  const [state, setState] = useState({
    templates: templateRegistry,
    loading: true,
    error: '',
  });

  useEffect(() => {
    const controller = new AbortController();
    invitationService
      .templates(controller.signal)
      .then(({ data }) => {
        const templates = data.flatMap((template) => {
          const local = templateRegistry.find(
            (item) => item.id === template.id,
          );
          return local ? [{ ...local, ...template }] : [];
        });
        setState({ templates, loading: false, error: '' });
      })
      .catch((error) => {
        if (error.name !== 'AbortError')
          setState({
            templates: templateRegistry,
            loading: false,
            error: error.message,
          });
      });
    return () => controller.abort();
  }, []);

  return {
    ...state,
    categories: [
      'Semua',
      ...new Set(state.templates.map((template) => template.category)),
    ],
  };
}
