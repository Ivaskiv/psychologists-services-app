import React from 'react';
import css from './style.module.css';
import noFavoritesImage from '../../assets/images/img_not_favorites.jpeg';

const NoFavoritePsychologists = () => {
  const handleRedirect = () => {
    window.location.href = '/psychologists';
  };

  return (
    <div className={css.no_favorites_page}>
      <img src={noFavoritesImage} alt="No favorites" className={css.no_favorites_image} />
      <p className={css.no_favorites_text}>
        It looks like you haven't added any psychologists to your favorites yet.
      </p>
      <button className={css.no_favorites_button} onClick={handleRedirect}>
        Find Psychologists
      </button>
    </div>
  );
};

export default NoFavoritePsychologists;
