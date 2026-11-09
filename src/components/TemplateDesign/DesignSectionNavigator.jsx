export default function DesignSectionNavigator({
  sections,
  current,
  disabled,
  onChange,
}) {
  return (
    <nav className="designer-section-nav" aria-label="Pilih bagian desain">
      {sections.map((section, index) => (
        <button
          key={section.id}
          type="button"
          aria-current={current === section.id ? 'step' : undefined}
          disabled={disabled}
          onClick={() => onChange(section.id)}
        >
          <span>{String(index + 1).padStart(2, '0')}</span>
          {section.label}
        </button>
      ))}
    </nav>
  );
}
