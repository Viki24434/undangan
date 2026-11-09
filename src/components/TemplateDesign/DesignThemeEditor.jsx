import { useState } from 'react';
import { THEME_COLORS } from '../../config/invitationTheme';
import { DESIGN_SECTIONS } from './designConfig';
import './ThemeEditor.css';
import { GRADIENT_KEYS, createGradient } from '../../config/themeGradients';
import DesignGradientEditor from './DesignGradientEditor';

function ColorField({
  field,
  value,
  fallback,
  onChange,
  onReset,
  disabled,
  customized,
}) {
  const color = value || fallback || field.fallback;
  const [draft, setDraft] = useState({ source: color, text: color });
  const text = draft.source === color ? draft.text : color;
  const valid = /^#[\da-f]{6}$/i.test(text);
  return (
    <div className="designer-color-field">
      <label>
        <span>
          {field.label}
          <small>{value || customized ? 'Disesuaikan' : 'Bawaan'}</small>
        </span>
        <input
          type="color"
          aria-label={field.label}
          value={color}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
      <div className="designer-color-hex">
        <input
          type="text"
          aria-label={`Kode ${field.label.toLowerCase()}`}
          value={text}
          maxLength={7}
          spellCheck={false}
          disabled={disabled}
          aria-invalid={!valid}
          onChange={(event) => {
            const next = event.target.value;
            setDraft({ source: color, text: next });
            if (/^#[\da-f]{6}$/i.test(next)) onChange(next.toLowerCase());
          }}
          onBlur={() => {
            if (!valid) setDraft({ source: color, text: color });
          }}
        />
        <button
          type="button"
          disabled={disabled || (!value && !customized)}
          onClick={onReset}
          aria-label={`Pulihkan ${field.label.toLowerCase()}`}
          title="Kembali ke warna bawaan"
        >
          ↺
        </button>
      </div>
    </div>
  );
}

export default function DesignThemeEditor({
  value = {},
  defaults = {},
  palette = {},
  onChange,
  disabled = false,
  sections = DESIGN_SECTIONS,
}) {
  const [scope, setScope] = useState('global');
  const local = scope === 'global' ? value : value.sections?.[scope] || {};
  const fallbacks =
    scope === 'global'
      ? { ...defaults, ...palette.global }
      : { ...defaults, ...palette.sections?.[scope] };
  const fields = THEME_COLORS.filter(
    ({ key }) =>
      !(['navigation', 'navigationText'].includes(key) && scope !== 'global') &&
      !(
        ['paper', 'overlay'].includes(key) &&
        !['global', 'cover', 'hero'].includes(scope)
      ),
  );
  const groups = [...new Set(fields.map((field) => field.group))];
  function change(next) {
    if (scope === 'global') onChange(next);
    else {
      const nextSections = { ...value.sections, [scope]: next };
      if (!Object.keys(next).length) delete nextSections[scope];
      onChange({ ...value, sections: nextSections });
    }
  }
  function patch(key, next) {
    const result = { ...local };
    if (next === undefined) delete result[key];
    else result[key] = next;
    change(result);
  }
  function changeGradient(key, gradient) {
    const gradients = { ...local.gradients };
    if (gradient) gradients[key] = gradient;
    else delete gradients[key];
    patch('gradients', Object.keys(gradients).length ? gradients : undefined);
  }
  return (
    <div className="designer-theme-editor admin-form">
      <label>
        Terapkan warna ke
        <select
          aria-label="Warna untuk bagian"
          value={scope}
          disabled={disabled}
          onChange={(event) => setScope(event.target.value)}
        >
          <option value="global">Seluruh undangan</option>
          {sections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.label}
            </option>
          ))}
        </select>
      </label>
      <p>
        Warna khusus bagian menggantikan warna umum. Foto dan ornamen PNG
        memakai warna aslinya.
      </p>
      <div className="designer-color-groups">
        {groups.map((group, index) => (
          <details key={group} open={index < 2}>
            <summary>{group}</summary>
            <div className="designer-color-grid">
              {fields
                .filter((field) => field.group === group)
                .map((field) => (
                  <div
                    className="designer-paint-field"
                    key={`${scope}-${field.key}`}
                  >
                    <ColorField
                      key={`${scope}-${field.key}`}
                      field={field}
                      value={local[field.key]}
                      customized={Boolean(local.gradients?.[field.key])}
                      fallback={fallbacks[field.key]}
                      disabled={disabled}
                      onChange={(next) => patch(field.key, next)}
                      onReset={() => {
                        const next = {
                          ...local,
                          gradients: { ...local.gradients },
                        };
                        delete next[field.key];
                        delete next.gradients[field.key];
                        change(next);
                      }}
                    />
                    {GRADIENT_KEYS.includes(field.key) && (
                      <>
                        <div
                          className="designer-paint-modes"
                          role="group"
                          aria-label={`Jenis ${field.label.toLowerCase()}`}
                        >
                          <button
                            type="button"
                            disabled={disabled}
                            aria-pressed={!local.gradients?.[field.key]}
                            onClick={() => changeGradient(field.key, null)}
                          >
                            Solid
                          </button>
                          <button
                            type="button"
                            disabled={disabled}
                            aria-pressed={Boolean(local.gradients?.[field.key])}
                            onClick={() =>
                              changeGradient(
                                field.key,
                                local.gradients?.[field.key] ||
                                  createGradient(
                                    local[field.key] ||
                                      fallbacks[field.key] ||
                                      field.fallback,
                                  ),
                              )
                            }
                          >
                            Gradasi
                          </button>
                        </div>
                        {local.gradients?.[field.key] && (
                          <DesignGradientEditor
                            value={local.gradients[field.key]}
                            label={field.label.toLowerCase()}
                            disabled={disabled}
                            onChange={(gradient) =>
                              changeGradient(field.key, gradient)
                            }
                          />
                        )}
                      </>
                    )}
                  </div>
                ))}
            </div>
            {fields.some(
              (field) => field.key === 'overlay' && field.group === group,
            ) && (
              <label>
                Kepekatan lapisan foto (
                {Math.round((local.overlayOpacity ?? 0.55) * 100)}%)
                <input
                  aria-label="Kepekatan lapisan foto"
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={local.overlayOpacity ?? 0.55}
                  disabled={disabled}
                  onChange={(event) =>
                    patch('overlayOpacity', Number(event.target.value))
                  }
                />
                <button
                  type="button"
                  className="designer-restore-variant"
                  disabled={disabled || local.overlayOpacity === undefined}
                  onClick={() => patch('overlayOpacity', undefined)}
                >
                  Pulihkan kepekatan
                </button>
              </label>
            )}
          </details>
        ))}
      </div>
      {scope === 'global' && (
        <label>
          Font
          <select
            aria-label="Font desain"
            value={value.font || 'default'}
            disabled={disabled}
            onChange={(event) =>
              onChange({ ...value, font: event.target.value })
            }
          >
            <option value="default">Bawaan template</option>
            <option value="classic">Serif klasik</option>
            <option value="modern">Sans modern</option>
          </select>
        </label>
      )}
      <button
        type="button"
        className="admin-button secondary"
        disabled={
          disabled ||
          (!THEME_COLORS.some(({ key }) => local[key] !== undefined) &&
            local.overlayOpacity === undefined &&
            !Object.keys(local.gradients || {}).length)
        }
        onClick={() => {
          const next = { ...local };
          THEME_COLORS.forEach(({ key }) => delete next[key]);
          delete next.overlayOpacity;
          delete next.gradients;
          change(next);
        }}
      >
        Pulihkan warna {scope === 'global' ? 'umum' : 'bagian ini'}
      </button>
    </div>
  );
}
