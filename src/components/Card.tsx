import useCategoryName from "../hooks/useCategoryName";
import "../styles/card.scss";

interface CardProps {
  title: string;
  subtitle: string;
  description?: string;
  link?: string;
  listItems?: string[];
  onTitleClick?: () => void;
  onSubtitleClick?: () => void;
  onLaureateCategoryClick?: (item: string) => void; // Уточненный тип
}

export default function Card({
  title,
  subtitle,
  description,
  link,
  listItems,
  onTitleClick,
  onSubtitleClick,
  onLaureateCategoryClick,
}: CardProps) {
  const { getNormalClassName, getNormalName } = useCategoryName();

  return (
    <div className="card">
      <h3 onClick={onTitleClick} className={getNormalClassName(title)}>
        {title}
      </h3>
      <p className="subtitle" onClick={onSubtitleClick}>
        {subtitle}
      </p>
      {description && <p>{description}</p>}
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {link}
        </a>
      )}
      {listItems && (
        <ul>
          {listItems.map((item, index) => (
            <li
              key={index}
              className={getNormalClassName(item)}
              onClick={() => onLaureateCategoryClick?.(getNormalName(item))}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
