import css from './style.module.css';
import sprite from '../../assets/sprite.svg';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../redux/auth/authSlice';
import { ref, set, remove, onValue } from 'firebase/database';
import { db } from '../../firebaseConfig';
import { toast } from 'react-toastify';
import { addFavoriteId, removeFavoriteId } from '../../redux/psychologitsts/psychologistsSlice';

const FavoriteButton = ({ id }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      // Авторизований користувач
      const favoriteRef = ref(db, `users/${user.uid}/favorites/${id}`);
      const unsubscribe = onValue(favoriteRef, snapshot => {
        setIsFavorite(snapshot.exists());
      });

      return () => unsubscribe();
    } else {
      // Неавторизований користувач
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setIsFavorite(favorites.includes(id));
    }
  }, [id, user]);

  const handleToggleFavorite = () => {
    if (!user) {
      toast.info('This functionality is only available to authorized users.');
      return;
    }

    const favoriteRef = ref(db, `users/${user.uid}/favorites/${id}`);
    const isCurrentlyFavorite = isFavorite;

    if (isCurrentlyFavorite) {
      // Видалення з обраних
      localStorage.setItem(
        'favorites',
        JSON.stringify(
          (JSON.parse(localStorage.getItem('favorites')) || []).filter(favId => favId !== id)
        )
      );
      dispatch(removeFavoriteId(id)); // Оновлення Redux
      remove(favoriteRef); // Видалення з Firebase
    } else {
      // Додавання до обраних
      const updatedFavorites = [...(JSON.parse(localStorage.getItem('favorites')) || []), id];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      dispatch(addFavoriteId(id)); // Оновлення Redux
      set(favoriteRef, true); // Додавання у Firebase
    }
    setIsFavorite(!isCurrentlyFavorite);
  };

  return (
    <button className={css.btn_favorite} onClick={handleToggleFavorite}>
      <svg className={css.svg}>
        <use href={`${sprite}#${isFavorite ? 'icon-unLike' : 'icon-like'}`}></use>
      </svg>
    </button>
  );
};

export default FavoriteButton;

//! Збереження улюблених карток:
//! Авторизовані користувачі:
//Дані зберігаються в Firebase.
//При оновленні сторінки дані з Firebase витягуються та оновлюють стан у Redux.
//! Неавторизовані користувачі:
//Дані зберігаються в localStorage.
//При оновленні сторінки дані витягуються з localStorage.
//! Обробка кліків по кнопці:
// Коли користувач клікає на кнопку "серце", перевіряється його статус.
// Для авторизованих користувачів дані з Firebase оновлюються.
// Для неавторизованих користувачів дані оновлюються в localStorage.
