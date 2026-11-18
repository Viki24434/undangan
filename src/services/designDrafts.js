const prefix = 'ciptain:design-draft:v1:';

export function readDesignDraft(key) {
  const raw = localStorage.getItem(prefix + key);
  if (!raw) return null;
  const draft = JSON.parse(raw);
  const value = draft?.value;
  if (
    draft.version !== 1 ||
    typeof draft.sourceId !== 'string' ||
    typeof draft.baseline !== 'string' ||
    !Number.isFinite(Date.parse(draft.savedAt)) ||
    !value ||
    !value.design ||
    typeof value.design !== 'object' ||
    Array.isArray(value.design) ||
    ![value.design.sections, value.design.native, value.theme].every(
      (field) => field && typeof field === 'object' && !Array.isArray(field),
    ) ||
    !['name', 'category', 'packageId'].every(
      (field) => typeof value[field] === 'string',
    )
  ) {
    throw new Error('Draft desain di perangkat ini tidak dapat dibaca.');
  }
  return draft;
}

export function writeDesignDraft(key, draft) {
  const serialized = JSON.stringify(draft);
  localStorage.setItem(prefix + key, serialized);
  return serialized;
}

export function removeDesignDraft(key, expected) {
  if (
    expected === undefined ||
    localStorage.getItem(prefix + key) === expected
  ) {
    localStorage.removeItem(prefix + key);
  }
}

export function lastDesignSource() {
  try {
    return readDesignDraft('new')?.sourceId || '';
  } catch {
    return '';
  }
}
