import { Link } from 'react-router-dom';
import Arrow from '../HomeLanding/Arrow';
import './TemplateCard.css';
import { packageName } from '../../config/invitationPackages';
import '../Catalog/PackageCollection.css';

export default function TemplateCard({ template }) {
  return (
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
          <span
            className={`template-package template-package--${template.packageId}`}
          >
            {packageName(template.packageId)}
          </span>
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
        <Arrow />
      </div>
    </Link>
  );
}
