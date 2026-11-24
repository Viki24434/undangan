import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { invitationService } from '../../services/api';
import { adminService } from '../../services/adminService';
import useTemplates from '../../hooks/useTemplates';
import { resolveTemplate } from '../../config/templateRenderer';
import { InvitationContext } from '../../components/Invitation/InvitationContext';
import { DesignEditorContext } from '../../components/TemplateDesign/DesignEditorContext';
import {
  createDesign,
  DESIGN_ENTRIES,
  DESIGN_SECTIONS,
  newDesignLayer,
} from '../../components/TemplateDesign/designConfig';
import { lastDesignSource, readDesignDraft } from '../../services/designDrafts';
import useDesignDraft from '../../components/TemplateDesign/useDesignDraft';
import DesignDraftRecovery from '../../components/TemplateDesign/DesignDraftRecovery';
import TemplateRevisionHistory from '../../components/TemplateDesign/TemplateRevisionHistory';
import TemplateSaveConflict from '../../components/TemplateDesign/TemplateSaveConflict';
import DesignLayerPanel from '../../components/TemplateDesign/DesignLayerPanel';
import DesignTemplateDetails from '../../components/TemplateDesign/DesignTemplateDetails';
import DesignPanelTabs from '../../components/TemplateDesign/DesignPanelTabs';
import DesignInspector from '../../components/TemplateDesign/DesignInspector';
import DesignAssetLibrary from '../../components/TemplateDesign/DesignAssetLibrary';
import DesignSelection from '../../components/TemplateDesign/DesignSelection';
import DesignComponentPicker from '../../components/TemplateDesign/DesignComponentPicker';
import DesignCompositionPicker from '../../components/TemplateDesign/DesignCompositionPicker';
import DesignSectionNavigator from '../../components/TemplateDesign/DesignSectionNavigator';
import DesignQuickActions from '../../components/TemplateDesign/DesignQuickActions';
import DesignThemeEditor from '../../components/TemplateDesign/DesignThemeEditor';
import PreviewScrollbar from '../../components/MobileWrapper/PreviewScrollbar';
import useDesignCanvas from '../../components/TemplateDesign/useDesignCanvas';
import useDesignZoom from '../../components/TemplateDesign/useDesignZoom';
import { ornamentAssets } from '../../components/Ornament/ornamentAssets';
import {
  clampDesign,
  canvasPoint,
  designBounds,
  findDesignElement,
} from '../../components/TemplateDesign/designGeometry';
import '../../components/TemplateDesign/TemplateDesigner.css';

function Designer({ id }) {
  const navigate = useNavigate();
  const { templates } = useTemplates();
  const [selectedSourceId, setSourceId] = useState(() =>
    id ? '' : lastDesignSource(),
  );
  const sourceId = selectedSourceId || id || templates[0]?.id || '';
  const [template, setTemplate] = useState(null);
  const [history, setHistory] = useState({
    past: [],
    present: createDesign(),
    future: [],
  });
  const [theme, setTheme] = useState({});
  const [saved, setSaved] = useState('');
  const [draftBaseline, setDraftBaseline] = useState('');
  const [recovery, setRecovery] = useState(null);
  const [draftError, setDraftError] = useState('');
  const [conflict, setConflict] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [section, setSection] = useState('cover');
  const [runtime, setRuntime] = useState({ sections: [], natives: [] });
  const [selected, setSelected] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [replay, setReplay] = useState(0);
  const [busy, setBusy] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [libraryMode, setLibraryMode] = useState('add');
  const [copyMode, setCopyMode] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Pernikahan');
  const [packageId, setPackageId] = useState('gold');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [keepRatio, setKeepRatio] = useState(true);
  const [dropActive, setDropActive] = useState(false);
  const [componentMetadata, setComponentMetadata] = useState(null);
  const [snapping, setSnapping] = useState(true);
  const [leftPanel, setLeftPanel] = useState('layers');
  const [rightPanel, setRightPanel] = useState('ornament');
  const scroller = useRef(null);
  const viewport = useRef(null);
  const libraryPanel = useRef(null);
  const copyPanel = useRef(null);
  const scrollSection = useRef(true);
  const zoom = useDesignZoom(viewport, Boolean(template));
  const design = history.present;
  const onScan = useCallback((value) => setRuntime(value), []);
  const onOpen = useCallback(() => {
    scrollSection.current = true;
    setSection('hero');
  }, []);
  const onCanvasSection = useCallback((value) => {
    scrollSection.current = false;
    setSection(value);
  }, []);
  const onComponents = useCallback((value) => setComponentMetadata(value), []);
  const editor = useMemo(
    () => ({ playing, section, onScan, onOpen, onComponents }),
    [playing, section, onScan, onOpen, onComponents],
  );
  const fingerprint = JSON.stringify({ design, theme });
  const dirty = template && fingerprint !== saved;
  const draftKey = id ? 'template:' + id : 'new';
  const draftValue = {
    design,
    theme,
    name,
    category,
    packageId,
    revision: template?.revision,
  };
  const draftChanged = template && JSON.stringify(draftValue) !== draftBaseline;
  const localDraft = useDesignDraft({
    key: draftKey,
    sourceId,
    baseline: draftBaseline,
    value: draftValue,
    enabled: Boolean(template && template.id === sourceId && !recovery),
  });

  const draftStorageError =
    localDraft.status?.error || (!localDraft.status?.savedAt && draftError);

  useEffect(() => {
    if (!sourceId) return;
    const controller = new AbortController();
    invitationService
      .template(sourceId, controller.signal)
      .then(({ data }) => {
        if (controller.signal.aborted) return;
        const value = data.data.design || createDesign();
        const colors = data.data.theme || {};
        setTemplate(data);
        setHistory({ past: [], present: value, future: [] });
        setTheme(colors);
        setSaved(JSON.stringify({ design: value, theme: colors }));
        setName(`${data.name} Custom`);
        setCategory(data.category);
        setPackageId(data.packageId);
        const baseline = JSON.stringify({
          design: value,
          theme: colors,
          name: data.name + ' Custom',
          category: data.category,
          packageId: data.packageId,
          revision: data.revision,
        });
        setDraftBaseline(baseline);
        setDraftError('');
        try {
          const draft = readDesignDraft(draftKey);
          setRecovery(
            draft?.sourceId === data.id &&
              JSON.stringify(draft.value) !== baseline
              ? draft
              : null,
          );
        } catch {
          setRecovery(null);
          setDraftError(
            'Draft perangkat tidak dapat dibaca. Simpan desain ke server setelah selesai mengedit.',
          );
        }
        setConflict(false);
        setSelected(null);
        scrollSection.current = true;
        setSection('cover');
        setError('');
      })
      .catch((error) => {
        if (!id && error.status === 404) setSourceId('');
        if (error.name !== 'AbortError') setError(error.message);
      });
    return () => controller.abort();
  }, [sourceId, draftKey, id, refresh]);

  useEffect(() => {
    if (!draftChanged || recovery) return;
    const warn = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [draftChanged, recovery]);

  useEffect(() => {
    if (!scroller.current || !scrollSection.current) return;
    const target = runtime.sections.find((item) => item.id === section)?.node;
    if (target) {
      scroller.current.scrollTo({
        top: canvasPoint(scroller.current, {
          x: target.getBoundingClientRect().left,
          y: target.getBoundingClientRect().top,
        }).y,
        behavior: 'instant',
      });
      scrollSection.current = false;
    }
  }, [section, runtime.sections]);

  useEffect(() => {
    scroller.current
      ?.querySelectorAll('[data-design-native], [data-design-layer]')
      .forEach((element) => {
        element.dataset.designSelected = String(
          selected?.type === 'native'
            ? element.dataset.designNative === selected.key
            : selected?.type === 'added' &&
                element.dataset.designLayer === selected.id,
        );
      });
  }, [selected, runtime, design]);

  function restoreDraft() {
    const value = recovery.value;
    setHistory({ past: [design], present: value.design, future: [] });
    setTheme(value.theme);
    if (Number.isInteger(value.revision))
      setTemplate((current) => ({ ...current, revision: value.revision }));
    setName(value.name);
    setCategory(value.category);
    setPackageId(value.packageId);
    setSelected(null);
    setPlaying(false);
    setReplay((current) => current + 1);
    setRecovery(null);
    setNotice(
      'Draft desain dipulihkan. Periksa preview lalu simpan ke server.',
    );
  }
  function discardDraft() {
    localDraft.clear();
    setRecovery(null);
  }

  function commit(next) {
    setHistory((current) => ({
      past: [...current.past, current.present].slice(-50),
      present: next,
      future: [],
    }));
    setNotice('');
    setError('');
  }
  function undo() {
    setNotice('');
    setError('');
    setHistory((current) =>
      current.past.length
        ? {
            past: current.past.slice(0, -1),
            present: current.past.at(-1),
            future: [current.present, ...current.future],
          }
        : current,
    );
  }
  function redo() {
    setNotice('');
    setError('');
    setHistory((current) =>
      current.future.length
        ? {
            past: [...current.past, current.present],
            present: current.future[0],
            future: current.future.slice(1),
          }
        : current,
    );
  }
  function chooseSection(value) {
    scrollSection.current = true;
    setSection(value);
    setSelected(null);
    const target = runtime.sections.find((item) => item.id === value)?.node;
    if (target && scroller.current) {
      scroller.current.scrollTo({
        top: canvasPoint(scroller.current, {
          x: target.getBoundingClientRect().left,
          y: target.getBoundingClientRect().top,
        }).y,
        behavior: 'instant',
      });
      scrollSection.current = false;
    }
  }
  function changeSection(patch) {
    commit({
      ...design,
      sections: {
        ...design.sections,
        [section]: { ...design.sections[section], ...patch },
      },
    });
  }
  const native =
    selected?.type === 'native'
      ? runtime.natives.find((item) => item.key === selected.key)
      : null;
  const currentItem =
    selected?.type === 'native'
      ? design.native[selected.key] ||
        design.native[native?.legacyKey] ||
        native?.defaults
      : design.sections[section]?.items?.find(
          (item) => item.id === selected?.id,
        );
  function patchItem(patch, selection = selected, initial = currentItem) {
    if (!selection || !initial) return;
    const value = { ...initial, ...patch };
    if (selection.type === 'native') {
      const nextNative = { ...design.native };
      const record = runtime.natives.find((item) => item.key === selection.key);
      if (record) delete nextNative[record.legacyKey];
      commit({
        ...design,
        native: { ...nextNative, [selection.key]: value },
      });
    } else
      changeSection({
        items: (design.sections[section]?.items || []).map((item) =>
          item.id === selection.id ? value : item,
        ),
      });
  }
  function selectLayer(selection) {
    setSelected(selection);
    setRightPanel('ornament');
    setPlaying(false);
  }
  function resetItem() {
    if (!selected) return;
    if (selected.type === 'native') {
      const next = { ...design.native };
      delete next[selected.key];
      if (native) delete next[native.legacyKey];
      commit({ ...design, native: next });
    } else {
      changeSection({
        items: design.sections[section].items.filter(
          (item) => item.id !== selected.id,
        ),
      });
      setSelected(null);
    }
  }
  function duplicateItem() {
    if (!currentItem || selected?.type !== 'added') return;
    const items = design.sections[section]?.items || [];
    if (items.length >= 40) {
      setError('Maksimal 40 ornamen tambahan per bagian.');
      return;
    }
    const item = {
      ...currentItem,
      id: crypto.randomUUID(),
      x: Math.min(300, currentItem.x + 5),
      y: Math.min(300, currentItem.y + 5),
    };
    changeSection({ items: [...items, item] });
    setSelected({ type: 'added', id: item.id });
  }
  function quickAction(action) {
    if (busy || playing || !currentItem) return;
    if (action === 'duplicate') return duplicateItem();
    if (action === 'delete') return resetItem();
    if (action === 'hide') {
      patchItem({ hidden: true });
      setSelected(null);
      return;
    }
    if (action === 'front' || action === 'back')
      return patchItem({
        zIndex: clampDesign(
          currentItem.zIndex + (action === 'front' ? 1 : -1),
          -5,
          50,
        ),
      });
    if (action === 'flip') return patchItem({ flipX: !currentItem.flipX });
    const element = findDesignElement(scroller.current, selected);
    const parent = element?.offsetParent;
    if (!parent) return;
    const bounds = designBounds(element, parent);
    if (action === 'center-x')
      patchItem({
        x: clampDesign(
          currentItem.x +
            ((parent.clientWidth / 2 - (bounds.left + bounds.right) / 2) /
              parent.clientWidth) *
              100,
          -200,
          300,
        ),
      });
    if (action === 'center-y')
      patchItem({
        y: clampDesign(
          currentItem.y +
            ((parent.clientHeight / 2 - (bounds.top + bounds.bottom) / 2) /
              parent.clientHeight) *
              100,
          -200,
          300,
        ),
      });
  }
  function addAsset(asset, src, position = {}, mode = libraryMode) {
    if (mode === 'replace') {
      if (!currentItem || !selected) {
        setError('Pilih ornamen yang akan diganti terlebih dahulu.');
        return;
      }
      patchItem({
        asset: asset || undefined,
        src: asset ? undefined : src,
        ...(selected.type === 'added' && {
          label: asset || 'Ornamen unggahan',
        }),
      });
      setLibraryOpen(false);
      setLibraryMode('add');
      if (window.innerWidth <= 800)
        scroller.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      return;
    }
    const items = design.sections[section]?.items || [];
    if (items.length >= 40) {
      setError('Maksimal 40 ornamen tambahan per bagian.');
      return;
    }
    const item = { ...newDesignLayer(asset, src), x: 30, y: 15, ...position };
    changeSection({ items: [...items, item] });
    setSelected({ type: 'added', id: item.id });
    setLibraryOpen(false);
    if (window.innerWidth <= 800)
      scroller.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  const canvas = useDesignCanvas({
    scroller,
    selected,
    section,
    design,
    runtime,
    disabled: playing || busy,
    keepRatio,
    onSelect: (selection) => {
      setSelected(selection);
      if (selection) setRightPanel('ornament');
    },
    onChange: patchItem,
    onSection: onCanvasSection,
    zoom: zoom.value,
    snapping,
  });

  function keyboardAction(event) {
    if (busy || recovery) return;
    const modifier = event.ctrlKey || event.metaKey;
    if (modifier && event.key.toLowerCase() === 's') {
      event.preventDefault();
      if (id && dirty) save(false);
      return;
    }
    if (
      event.target.closest('input, textarea, select, [contenteditable="true"]')
    )
      return;
    const key = event.key.toLowerCase();
    if (modifier && (key === 'z' || key === 'y')) {
      event.preventDefault();
      if (key === 'y' || event.shiftKey) redo();
      else undo();
    } else if (
      !playing &&
      modifier &&
      key === 'd' &&
      selected?.type === 'added'
    ) {
      event.preventDefault();
      duplicateItem();
    } else if (
      !playing &&
      selected &&
      ['Delete', 'Backspace'].includes(event.key)
    ) {
      event.preventDefault();
      quickAction(selected.type === 'native' ? 'hide' : 'delete');
    }
  }

  function dragOver(event) {
    if (
      playing ||
      busy ||
      !runtime.sections.some((item) => item.id === section)
    )
      return;
    if (
      !event.dataTransfer.types.some((type) =>
        ['application/x-undangan-ornament', 'Files'].includes(type),
      )
    )
      return;
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    setDropActive(true);
  }

  async function dropAsset(event) {
    event.preventDefault();
    setDropActive(false);
    if (playing || busy) return;
    const node = runtime.sections.find((item) => item.id === section)?.node;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    if (event.clientY < rect.top || event.clientY > rect.bottom) {
      setError('Letakkan aset pada bagian template yang sedang dipilih.');
      return;
    }
    const position = {
      x: clampDesign(
        ((event.clientX - rect.left) / (rect.width || 1)) * 100,
        -200,
        300,
      ),
      y: clampDesign(
        ((event.clientY - rect.top) / (rect.height || 1)) * 100,
        -200,
        300,
      ),
    };
    const asset = event.dataTransfer.getData('application/x-undangan-ornament');
    if (asset && Object.hasOwn(ornamentAssets, asset)) {
      addAsset(asset, undefined, position, 'add');
      return;
    }
    const files = [...event.dataTransfer.files];
    if (!files.length) return;
    const items = design.sections[section]?.items || [];
    if (items.length + files.length > 40) {
      setError('Maksimal 40 ornamen tambahan per bagian.');
      return;
    }
    if (
      files.some(
        (file) =>
          !['image/png', 'image/webp', 'image/jpeg'].includes(file.type) ||
          file.size > 5 * 1024 * 1024,
      )
    ) {
      setError('Gunakan PNG, WebP, atau JPG maksimal 5 MB per gambar.');
      return;
    }
    setBusy(true);
    const uploaded = [];
    let failure;
    try {
      for (const [index, file] of files.entries()) {
        const src = await adminService.uploadImage(file);
        uploaded.push({
          ...newDesignLayer(null, src),
          label: file.name.slice(0, 100),
          x: clampDesign(position.x + index * 3, -200, 300),
          y: clampDesign(position.y + index * 3, -200, 300),
        });
      }
    } catch (error) {
      failure = error.message;
    } finally {
      if (uploaded.length) {
        changeSection({ items: [...items, ...uploaded] });
        setSelected({ type: 'added', id: uploaded.at(-1).id });
      }
      if (failure) setError(failure);
      setBusy(false);
    }
  }

  function reloadServer() {
    localDraft.clear();
    setRecovery(null);
    setConflict(false);
    setTemplate(null);
    setRefresh((current) => current + 1);
  }

  async function save(asCopy) {
    setBusy(true);
    setError('');
    setNotice('');
    try {
      const data = { ...template.data, design, theme };
      if (asCopy) {
        if (!name.trim()) throw new Error('Isi nama template baru.');
        const { data: created } = await adminService.createTemplate({
          baseTemplateId: sourceId,
          name,
          category,
          packageId,
          data,
        });
        localDraft.clear();
        navigate(`/admin/template/${created.id}/desain`, { replace: true });
      } else {
        const { data: updated } = await adminService.updateTemplate(
          sourceId,
          data,
          template.revision,
        );
        setTemplate(updated);
        setSaved(fingerprint);
        setDraftBaseline(
          JSON.stringify({ ...draftValue, revision: updated.revision }),
        );
        localDraft.clear();
        setConflict(false);
        setNotice('Desain template berhasil disimpan.');
      }
    } catch (error) {
      if (error.status === 409 || error.status === 428) setConflict(true);
      else setError(error.message);
    } finally {
      setBusy(false);
    }
  }

  const resolved = resolveTemplate(template);
  if (!resolved)
    return (
      <section className="admin-panel">
        <p role="status">{error || 'Memuat editor desain…'}</p>
        <Link to="/admin/template">Kembali ke template</Link>
      </section>
    );
  const Template = resolved.component;
  const invitation = {
    id: template.id,
    templateId: template.id,
    rendererId: template.rendererId,
    title:
      template.data.title ||
      (template.data.groom
        ? `${template.data.groom.name} & ${template.data.bride.name}`
        : template.name),
    eventDate: template.data.targetDate,
    data: { ...template.data, theme, design, musicEnabled: false },
    preview: true,
  };
  const currentSection = runtime.sections.find((item) => item.id === section);
  const selectedNatives = runtime.natives.filter(
    (item) => item.section === section,
  );
  const added = design.sections[section]?.items || [];
  const navigableSections = DESIGN_SECTIONS.filter(
    (item) =>
      (!['photos', 'agenda', 'video', 'prayers', 'guide'].includes(item.id) ||
        runtime.sections.some((section) => section.id === item.id)) &&
      (!['couple', 'story', 'gift'].includes(item.id) ||
        (componentMetadata?.wedding &&
          (item.id !== 'gift' || template.data.banks?.length))),
  );
  return (
    <div className="template-designer" onKeyDownCapture={keyboardAction}>
      <header className="admin-page-heading">
        <div>
          <Link to="/admin/template" className="admin-back">
            ← Koleksi template
          </Link>
          <h1>{id ? `Desain ${template.name}` : 'Buat template custom'}</h1>
          <p>
            Geser ornamen pada preview, atur komposisi, lalu coba animasinya.
          </p>
        </div>
        <div className="admin-actions">
          {id && (
            <button
              type="button"
              className="admin-button"
              disabled={busy || !!recovery || !dirty}
              onClick={() => save(false)}
            >
              Simpan desain
            </button>
          )}
          <button
            type="button"
            className="admin-button secondary"
            disabled={busy}
            aria-expanded={copyMode}
            aria-controls="designer-template-details"
            onClick={() => {
              setCopyMode((value) => !value);
              if (!copyMode)
                requestAnimationFrame(() =>
                  copyPanel.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                  }),
                );
            }}
          >
            Simpan sebagai template baru
          </button>
        </div>
      </header>
      {error && (
        <p role="alert" className="admin-error">
          {error}
        </p>
      )}
      {notice && (
        <p role="status" className="admin-success">
          {notice}
        </p>
      )}
      {conflict && (
        <TemplateSaveConflict
          disabled={busy}
          onReload={reloadServer}
          onCopy={() => {
            setCopyMode(true);
            requestAnimationFrame(() =>
              copyPanel.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
              }),
            );
          }}
        />
      )}
      {recovery && (
        <DesignDraftRecovery
          draft={recovery}
          changed={recovery.baseline !== draftBaseline}
          onRestore={restoreDraft}
          onDiscard={discardDraft}
        />
      )}
      {draftStorageError && (
        <p role="alert" className="admin-error">
          {draftStorageError}
        </p>
      )}
      <div className="designer-workspace" inert={Boolean(recovery)}>
        <aside className="designer-panel">
          <DesignTemplateDetails
            panelRef={copyPanel}
            open={copyMode}
            onToggle={setCopyMode}
            templates={templates}
            sourceId={sourceId}
            sourceLocked={Boolean(id)}
            values={{ name, category, packageId }}
            onChange={(field, value) => {
              if (field === 'name') setName(value);
              if (field === 'category') setCategory(value);
              if (field === 'packageId') setPackageId(value);
            }}
            onSource={(value) => {
              setTemplate(null);
              setSourceId(value);
            }}
            onSave={() => save(true)}
            disabled={busy}
          />
          <DesignPanelTabs
            label="Panel susunan template"
            tabs={[
              ['layers', 'Bagian & lapisan'],
              ['components', 'Komponen'],
            ]}
            value={leftPanel}
            onChange={setLeftPanel}
          />
          <div hidden={leftPanel !== 'components'}>
            <DesignCompositionPicker
              metadata={componentMetadata}
              values={design.components}
              disabled={busy}
              onApply={(preset, components) => {
                commit({
                  ...design,
                  components: { ...design.components, ...components },
                });
                chooseSection('cover');
                setPlaying(false);
                setNotice(
                  `Susunan ${preset.name} diterapkan. Simpan desain saat sudah sesuai.`,
                );
                if (window.innerWidth <= 800)
                  requestAnimationFrame(() =>
                    viewport.current?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    }),
                  );
              }}
            />
            <DesignComponentPicker
              metadata={componentMetadata}
              values={design.components}
              disabled={busy}
              section={section}
              onChange={(field, value) => {
                const components = { ...design.components };
                if (value === 'inherit') delete components[field.key];
                else components[field.key] = Number(value);
                commit({ ...design, components });
                chooseSection(field.section);
                setPlaying(false);
                if (window.innerWidth <= 800)
                  requestAnimationFrame(() =>
                    viewport.current?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    }),
                  );
              }}
            />
          </div>
          <div hidden={leftPanel !== 'layers'}>
            <div className="admin-form">
              <label>
                Bagian template
                <select
                  aria-label="Bagian template"
                  value={section}
                  disabled={busy}
                  onChange={(event) => {
                    chooseSection(event.target.value);
                  }}
                >
                  {DESIGN_SECTIONS.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Animasi bagian
                <select
                  aria-label="Animasi bagian"
                  value={design.sections[section]?.reveal || 'inherit'}
                  disabled={busy}
                  onChange={(event) =>
                    changeSection({ reveal: event.target.value })
                  }
                >
                  {DESIGN_ENTRIES.map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Durasi bagian (detik)
                <input
                  type="number"
                  min="0.2"
                  max="8"
                  step="0.1"
                  value={design.sections[section]?.duration || 1}
                  disabled={busy}
                  onChange={(event) =>
                    changeSection({
                      duration: Math.max(
                        0.2,
                        Math.min(8, Number(event.target.value)),
                      ),
                    })
                  }
                />
              </label>
            </div>
            {!currentSection && (
              <p>Bagian ini belum tersedia atau masih memuat.</p>
            )}
            <DesignLayerPanel
              key={section}
              natives={selectedNatives}
              items={added}
              design={design}
              selected={selected}
              disabled={busy || playing}
              onSelect={selectLayer}
              onToggle={(selection, value) =>
                patchItem({ hidden: !value.hidden }, selection, value)
              }
            />
            <button
              type="button"
              className="admin-button secondary"
              disabled={busy || !currentSection || added.length >= 40}
              onClick={() => {
                setLibraryMode('add');
                setLibraryOpen((value) => !value);
              }}
            >
              + Tambah ornamen
            </button>
          </div>
          {libraryOpen && (
            <div className="designer-library-panel" ref={libraryPanel}>
              {libraryMode === 'replace' && (
                <p>Pilih gambar pengganti untuk ornamen terpilih.</p>
              )}
              <DesignAssetLibrary
                disabled={busy || !currentSection}
                onAdd={addAsset}
                onBusy={setBusy}
              />
            </div>
          )}
        </aside>
        <div className="designer-stage-column">
          <div className="designer-toolbar">
            <button
              type="button"
              disabled={!history.past.length || busy}
              onClick={undo}
            >
              Undo
            </button>
            <button
              type="button"
              disabled={!history.future.length || busy}
              onClick={redo}
            >
              Redo
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => {
                setPlaying((value) => !value);
                setReplay((value) => value + 1);
              }}
            >
              {playing ? 'Edit posisi' : 'Coba animasi'}
            </button>
            {id && (
              <button
                type="button"
                className="designer-save-quick"
                aria-label="Simpan desain cepat"
                disabled={busy || !dirty}
                onClick={() => save(false)}
              >
                Simpan
              </button>
            )}
          </div>
          <DesignSectionNavigator
            sections={navigableSections}
            current={section}
            disabled={busy}
            onChange={chooseSection}
          />
          <div
            className="designer-zoom-toolbar"
            role="group"
            aria-label="Pembesaran kanvas"
          >
            <button
              type="button"
              aria-label="Perkecil kanvas"
              disabled={zoom.value <= 0.5}
              onClick={() => zoom.change(-0.1)}
            >
              −
            </button>
            <output aria-label="Skala kanvas">
              {Math.round(zoom.value * 100)}%
            </output>
            <button
              type="button"
              aria-label="Perbesar kanvas"
              disabled={zoom.value >= 2}
              onClick={() => zoom.change(0.1)}
            >
              +
            </button>
            <button type="button" onClick={zoom.fit}>
              Pas layar
            </button>
            <label>
              <input
                type="checkbox"
                checked={snapping}
                onChange={(event) => setSnapping(event.target.checked)}
              />
              Magnet posisi
            </label>
          </div>
          <label className="designer-ratio-lock">
            <input
              type="checkbox"
              checked={keepRatio}
              onChange={(event) => setKeepRatio(event.target.checked)}
            />
            Kunci proporsi saat menarik sudut
          </label>
          <p className="designer-stage-hint">
            {playing
              ? 'Animasi sedang berjalan. Pilih Edit posisi untuk menggeser ornamen.'
              : 'Klik bagian untuk mengedit. Tarik ornamen dan titik ukurannya. Alt: lepas magnet.'}
          </p>
          <div ref={viewport} className="designer-canvas-viewport">
            <div
              className="designer-canvas-zoom"
              style={{
                width: 390 * zoom.value + 24,
                height: 720 * zoom.value,
                '--designer-zoom': zoom.value,
              }}
            >
              <div
                ref={scroller}
                className="designer-scroller"
                tabIndex={0}
                role="region"
                aria-label="Kanvas desain template"
                {...canvas.handlers}
                onClickCapture={(event) => {
                  if (playing) return;
                  const link = event.target.closest('a[href]');
                  if (!link) return;
                  event.preventDefault();
                  const href = link.getAttribute('href');
                  const destination =
                    href?.startsWith('#') && href.length > 1
                      ? scroller.current.querySelector(
                          `#${CSS.escape(href.slice(1))}`,
                        )
                      : null;
                  const target = runtime.sections.find(
                    (item) =>
                      destination &&
                      (item.node === destination ||
                        item.node.contains(destination)),
                  );
                  if (target) chooseSection(target.id);
                  else if (destination) {
                    scrollSection.current = false;
                    setSelected(null);
                    scroller.current.scrollTo({
                      top: canvasPoint(scroller.current, {
                        x: destination.getBoundingClientRect().left,
                        y: destination.getBoundingClientRect().top,
                      }).y,
                    });
                  }
                }}
                onDragOver={dragOver}
                onDragLeave={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget))
                    setDropActive(false);
                }}
                onDrop={dropAsset}
              >
                <div
                  className="designer-surface"
                  style={{ '--invitation-screen-height': '720px' }}
                >
                  <DesignEditorContext.Provider value={editor}>
                    <InvitationContext.Provider value={invitation}>
                      <Suspense fallback={<p>Memuat preview…</p>}>
                        <Template key={`${sourceId}-${replay}`} />
                      </Suspense>
                    </InvitationContext.Provider>
                  </DesignEditorContext.Provider>
                </div>
                <DesignSelection frame={canvas.frame} />
                <DesignQuickActions
                  frame={canvas.frame}
                  native={selected?.type === 'native'}
                  disabled={busy || playing}
                  onAction={quickAction}
                />
                {canvas.guides.map((guide, index) => (
                  <span
                    key={index}
                    className="designer-snap-guide"
                    style={{
                      left: guide.x,
                      top: guide.y,
                      width: guide.width,
                      rotate: `${guide.angle}deg`,
                    }}
                  />
                ))}
              </div>
              <PreviewScrollbar
                targetRef={scroller}
                className="designer-preview-scrollbar"
              />
            </div>
          </div>
          <p className="designer-draft-status" role="status">
            {localDraft.status?.error
              ? 'Draft perangkat gagal disimpan'
              : localDraft.saving
                ? 'Menyimpan draft di perangkat...'
                : localDraft.status?.savedAt
                  ? 'Draft tersimpan di perangkat pada ' +
                    new Date(localDraft.status.savedAt).toLocaleTimeString(
                      'id-ID',
                      { hour: '2-digit', minute: '2-digit' },
                    )
                  : 'Perubahan desain akan dicadangkan otomatis di perangkat ini'}
          </p>
          <div className="designer-canvas-status">
            <span role="status">
              {busy
                ? 'Memproses…'
                : dirty
                  ? '● Ada perubahan belum disimpan'
                  : '✓ Desain tersimpan'}
            </span>
            <details>
              <summary>Pintasan keyboard</summary>
              <p>
                Ctrl/Cmd + S: simpan · Z: undo · Shift + Z: redo · D: duplikat.
                Delete: hapus/sembunyikan. Panah: geser 1 px; Shift + panah: 10
                px. Escape: batal.
              </p>
            </details>
          </div>
          {dropActive && (
            <p className="designer-drop-hint">
              Lepaskan untuk menambahkan ornamen di posisi ini.
            </p>
          )}
        </div>
        <aside className="designer-panel">
          {id && (
            <TemplateRevisionHistory
              key={sourceId + ':' + template.revision}
              templateId={sourceId}
              revision={template.revision}
              disabled={busy || playing}
              onRestore={(data, revision) => {
                commit(data.design || createDesign());
                setTheme(data.theme || {});
                setSelected(null);
                setPlaying(false);
                setReplay((current) => current + 1);
                setNotice(
                  'Desain dan tema versi ' +
                    revision +
                    ' diterapkan ke preview. Simpan desain untuk menggunakannya.',
                );
              }}
            />
          )}
          <DesignPanelTabs
            label="Panel pengaturan desain"
            tabs={[
              ['ornament', 'Ornamen'],
              ['theme', 'Warna & font'],
            ]}
            value={rightPanel}
            onChange={setRightPanel}
          />
          <div hidden={rightPanel !== 'ornament'}>
            <DesignInspector
              item={currentItem}
              native={selected?.type === 'native'}
              disabled={busy || playing}
              onChange={patchItem}
              onReset={resetItem}
              onDuplicate={duplicateItem}
              onReplace={() => {
                setLibraryMode('replace');
                setLibraryOpen(true);
                requestAnimationFrame(() =>
                  libraryPanel.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                  }),
                );
              }}
            />
          </div>
          <div hidden={rightPanel !== 'theme'} className="designer-theme">
            <h3>Warna & font</h3>
            <DesignThemeEditor
              key={section}
              initialScope={section}
              value={theme}
              onChange={setTheme}
              disabled={busy}
              defaults={{
                background: resolved.palette?.[0],
                accent: resolved.palette?.[1],
              }}
              palette={runtime.palette}
              sections={navigableSections}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function AdminTemplateDesigner() {
  const { id } = useParams();
  return <Designer key={id || 'new'} id={id} />;
}
