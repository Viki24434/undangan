const prefix = 'ciptain:consumer-draft:v1:';

export function readLocalDraft(id, storage = globalThis.localStorage) {
  const raw = storage.getItem(prefix + id);
  if (!raw) return null;
  const record = JSON.parse(raw);
  if (
    record.version !== 1 ||
    record.form?.templateId !== id ||
    !record.form.data ||
    typeof record.form.title !== 'string' ||
    typeof record.form.eventDate !== 'string'
  ) {
    throw new Error('Draft di perangkat ini tidak valid.');
  }
  return record.form;
}

export function writeLocalDraft(form, storage = globalThis.localStorage) {
  storage.setItem(
    prefix + form.templateId,
    JSON.stringify({ version: 1, savedAt: new Date().toISOString(), form }),
  );
}

export function localPreview(form) {
  const eventDate = `${form.eventDate}:00+07:00`;
  if (!Number.isFinite(Date.parse(eventDate)))
    throw new Error('Isi tanggal acara yang valid.');
  const date = new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'full',
    timeZone: 'Asia/Jakarta',
  }).format(new Date(eventDate));
  return {
    id: `local-${form.templateId}`,
    templateId: form.templateId,
    title: form.title,
    eventDate,
    preview: true,
    data: {
      ...form.data,
      targetDate: eventDate,
      date,
      events: (form.data.events || []).map((event) => ({ ...event, date })),
      wishes: [],
    },
  };
}
