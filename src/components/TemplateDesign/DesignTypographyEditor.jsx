import { useState } from 'react';
import {
  TYPOGRAPHY_FONTS,
  TYPOGRAPHY_ROLES,
} from '../../config/invitationTypography';

function NumberSetting({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  disabled,
}) {
  const [draft, setDraft] = useState({ source: value, text: value ?? '' });
  const text = draft.source === value ? draft.text : (value ?? '');
  return (
    <label>
      {label}
      <input
        type="number"
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={text}
        placeholder="Bawaan"
        disabled={disabled}
        onChange={(event) => {
          const next = event.target.value;
          setDraft({ source: value, text: next });
          if (next === '') onChange(undefined);
          else if (
            Number.isFinite(Number(next)) &&
            Number(next) >= min &&
            Number(next) <= max
          )
            onChange(Number(next));
        }}
        onBlur={() => setDraft({ source: value, text: value ?? '' })}
      />
    </label>
  );
}

export default function DesignTypographyEditor({
  value = {},
  onChange,
  disabled,
  scopeLabel,
}) {
  const [role, setRole] = useState('heading');
  const current = value[role] || {};
  function patch(key, next) {
    const entry = { ...current };
    if (next === undefined || next === '') delete entry[key];
    else entry[key] = next;
    const result = { ...value };
    if (Object.keys(entry).length) result[role] = entry;
    else delete result[role];
    onChange(Object.keys(result).length ? result : undefined);
  }
  return (
    <fieldset className="designer-typography" disabled={disabled}>
      <legend>Tipografi · {scopeLabel}</legend>
      <p>
        Atur jenis teks secara terpisah. Kosongkan angka untuk mengikuti bawaan
        atau pengaturan umum. Font memakai font perangkat dengan cadangan yang
        sesuai.
      </p>
      <label>
        Jenis teks
        <select
          aria-label="Jenis teks"
          value={role}
          onChange={(event) => setRole(event.target.value)}
        >
          {TYPOGRAPHY_ROLES.map(([key, label]) => (
            <option value={key} key={key}>
              {label}
            </option>
          ))}
        </select>
      </label>
      <label>
        Jenis font
        <select
          aria-label="Jenis font teks"
          value={current.family || ''}
          onChange={(event) => patch('family', event.target.value)}
        >
          <option value="">Ikuti bawaan / umum</option>
          {Object.entries(TYPOGRAPHY_FONTS).map(([key, [label]]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </label>
      <NumberSetting
        key={`${role}-size`}
        label="Ukuran teks (px)"
        value={current.size}
        min={8}
        max={120}
        onChange={(value) => patch('size', value)}
      />
      <label>
        Ketebalan
        <select
          aria-label="Ketebalan teks"
          value={current.weight || ''}
          onChange={(event) =>
            patch(
              'weight',
              event.target.value ? Number(event.target.value) : undefined,
            )
          }
        >
          <option value="">Ikuti bawaan / umum</option>
          {[300, 400, 500, 600, 700, 800].map((weight) => (
            <option key={weight} value={weight}>
              {weight}
            </option>
          ))}
        </select>
      </label>
      <NumberSetting
        key={`${role}-height`}
        label="Jarak baris"
        value={current.lineHeight}
        min={0.8}
        max={3}
        step={0.1}
        onChange={(value) => patch('lineHeight', value)}
      />
      <NumberSetting
        key={`${role}-spacing`}
        label="Jarak huruf (px)"
        value={current.spacing}
        min={-3}
        max={12}
        step={0.1}
        onChange={(value) => patch('spacing', value)}
      />
      <button
        type="button"
        className="designer-restore-variant"
        disabled={!Object.keys(current).length}
        onClick={() => {
          const next = { ...value };
          delete next[role];
          onChange(Object.keys(next).length ? next : undefined);
        }}
      >
        Pulihkan jenis teks ini
      </button>
    </fieldset>
  );
}
