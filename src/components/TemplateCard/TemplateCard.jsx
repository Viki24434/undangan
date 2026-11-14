import { Link } from 'react-router-dom';
import Arrow from '../HomeLanding/Arrow';
import FavoriteButton from './FavoriteButton';
import './TemplateCard.css';
import { packageName, packagePriceText } from '../../config/invitationPackages';
import '../Catalog/PackageCollection.css';

export default function TemplateCard({
  template,
  pricing,
  onCompare,
  compared = false,
  compareDisabled = false,
}) {
  const selectedPackage = pricing?.packages.find(
    (item) => item.id === template.packageId,
  );
  return (
    <div className="template-card-item">
      <FavoriteButton template={template} />
      <Link to={`/t/${template.id}`} className="invite-template">
        <div className="invite-template-art">
          <img
            src={template.img}
            alt={`Preview ${template.name}`}
            loading="lazy"
            decoding="async"
          />
          <span className="invite-tag">{template.category}</span>
          <div className="invite-template-cover">
            <small>{template.category.toUpperCase()}</small>
            <span>{template.name}</span>
            <small>A celebration of your story</small>
          </div>
          <span className="invite-template-open">
            Lihat demo <Arrow />
          </span>
        </div>
        <div className="invite-template-caption">
          <div>
            <div className="template-card-package-row">
              <span
                className={`template-package template-package--${template.packageId}`}
              >
                {packageName(template.packageId)}
              </span>
              <span className="template-card-price">
                {packagePriceText(
                  selectedPackage || { id: template.packageId },
                  pricing,
                )}
              </span>
            </div>
            <h3>{template.name}</h3>
            {template.palette && (
              <div className="template-palette" aria-label="Palet warna tema">
                {template.palette.map((color) => (
                  <span key={color} style={{ backgroundColor: color }} />
                ))}
              </div>
            )}
            <p>
              {template.description || 'Desain pilihan untuk momen istimewamu.'}
            </p>
          </div>
        </div>
      </Link>
      <div className="template-card-actions">
        <Link className="template-edit-link" to={`/edit/${template.id}`}>
          Coba edit <span aria-hidden="true">↗</span>
        </Link>
        {onCompare && (
          <button
            type="button"
            className="template-compare-button"
            aria-label={`Bandingkan ${template.name}`}
            aria-pressed={compared}
            disabled={compareDisabled}
            onClick={() => onCompare(template.id)}
          >
            <span aria-hidden="true">{compared ? '✓' : '⇄'}</span>
            {compared ? 'Dipilih' : 'Bandingkan'}
          </button>
        )}
      </div>
    </div>
  );
}
