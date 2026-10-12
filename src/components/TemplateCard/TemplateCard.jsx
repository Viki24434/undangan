import { Link } from 'react-router-dom';
import Arrow from '../HomeLanding/Arrow';
import './TemplateCard.css';
import { packageName, packagePriceText } from '../../config/invitationPackages';
import '../Catalog/PackageCollection.css';

export default function TemplateCard({ template, pricing }) {
  const selectedPackage = pricing?.packages.find(
    (item) => item.id === template.packageId,
  );
  return (
    <div className="template-card-item">
      <Link to={`/t/${template.id}`} className="invite-template">
        <div className="invite-template-art">
          <img
            src={template.img}
            alt={`Preview ${template.name}`}
            loading="lazy"
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
      <Link className="template-edit-link" to={`/edit/${template.id}`}>
        Edit template ini <span aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}
