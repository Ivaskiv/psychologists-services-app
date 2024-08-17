import css from './style.module.css';
import sprite from '../../../assets/sprite.svg';

const StarRating = ({ rating }) => {
  const percentage = (rating / 5) * 100;
  return (
    <div className={css.star_outer}>
      <svg className={css.star}>
        <use href={`${sprite}#icon-star`}></use>
      </svg>
      <div className={css.star_inner} style={{ width: `${percentage}%` }}>
        <div className={css.star_filled}></div>
      </div>
    </div>
  );
};

export default StarRating;
