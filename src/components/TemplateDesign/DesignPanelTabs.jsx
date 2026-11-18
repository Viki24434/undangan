export default function DesignPanelTabs({ label, tabs, value, onChange }) {
  return (
    <div className="designer-panel-tabs" role="group" aria-label={label}>
      {tabs.map(([key, title]) => (
        <button
          key={key}
          type="button"
          aria-pressed={value === key}
          onClick={() => onChange(key)}
        >
          {title}
        </button>
      ))}
    </div>
  );
}
