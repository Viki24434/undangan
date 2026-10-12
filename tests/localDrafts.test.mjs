import test from 'node:test';
import assert from 'node:assert/strict';
import {
  readLocalDraft,
  writeLocalDraft,
  localPreview,
} from '../src/services/localDrafts.js';

function storage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
}

const draft = {
  templateId: 'black-gold-01',
  title: 'Nama konsumen',
  eventDate: '2027-06-12T09:00',
  data: {
    events: [{ title: 'Resepsi', date: 'Tanggal contoh' }],
    wishes: [{ name: 'Contoh' }],
  },
};

test('consumer drafts recover edits and stay separate for each template', () => {
  const browser = storage();
  assert.equal(readLocalDraft(draft.templateId, browser), null);
  writeLocalDraft(draft, browser);
  writeLocalDraft(
    { ...draft, templateId: 'white-gold-01', title: 'Draft kedua' },
    browser,
  );
  assert.deepEqual(readLocalDraft(draft.templateId, browser), draft);
  assert.equal(readLocalDraft('white-gold-01', browser).title, 'Draft kedua');
  writeLocalDraft({ ...draft, title: 'Nama baru', eventDate: '' }, browser);
  assert.equal(readLocalDraft(draft.templateId, browser).title, 'Nama baru');
  assert.equal(readLocalDraft(draft.templateId, browser).eventDate, '');
});

test('unreadable data and denied storage are reported instead of treated as saved', () => {
  assert.throws(() =>
    readLocalDraft(draft.templateId, { getItem: () => '{broken' }),
  );
  assert.throws(() =>
    readLocalDraft(draft.templateId, {
      getItem: () => JSON.stringify({ version: 2, form: draft }),
    }),
  );
  assert.throws(() =>
    writeLocalDraft(draft, {
      setItem: () => {
        throw new Error('Quota exceeded');
      },
    }),
  );
});

test('local preview uses edited date and title with guest submissions disabled', () => {
  const preview = localPreview(draft);
  assert.equal(preview.title, draft.title);
  assert.equal(preview.eventDate, '2027-06-12T09:00:00+07:00');
  assert.equal(preview.preview, true);
  assert.equal(preview.slug, undefined);
  assert.equal(preview.data.events[0].date, preview.data.date);
  assert.deepEqual(preview.data.wishes, []);
  assert.equal(draft.data.events[0].date, 'Tanggal contoh');
  assert.throws(() => localPreview({ ...draft, eventDate: '' }));
});
