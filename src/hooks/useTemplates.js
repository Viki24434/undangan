import { useEffect, useState } from 'react';
import { invitationService } from '../services/api';
import { resolveTemplate } from '../config/templateRenderer';

export default function useTemplates() {
  const [state, setState] = useState({
    templates: [],
    loading: true,
    error: '',
  });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    invitationService
      .templates(controller.signal)
      .then(({ data }) => {
        if (controller.signal.aborted) return;
        const templates = data.flatMap((template) => {
          const resolved = resolveTemplate(template);
          return resolved ? [resolved] : [];
        });
        setState({ templates, loading: false, error: '' });
      })
      .catch((error) => {
        if (error.name !== 'AbortError')
          setState({
            templates: [],
            loading: false,
            error: error.message,
          });
      });
    return () => controller.abort();
  }, [attempt]);

  return {
    ...state,
    retry: () => {
      setState((current) => ({ ...current, loading: true, error: '' }));
      setAttempt((current) => current + 1);
    },
    categories: [
      'Semua',
      ...new Set(state.templates.map((template) => template.category)),
    ],
  };
}
