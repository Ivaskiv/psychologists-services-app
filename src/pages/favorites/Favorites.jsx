import css from './style.module.css';
import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import NoFavoritePsychologists from '../../components/NoFavoritePsychologists/NoFavoritePsychologists';
import PsychologistCard from '../../components/PsychologistsCard/PsychologistsCard';
import SortFilter from '../../components/SortFilter/SortFilter';
import {
  selectFilter,
  selectSortType,
  selectFilteredAndSortedFavorites,
} from '../../redux/psychologitsts/psychologistsSelector';
import {
  setFavoriteIds,
  setFilter,
  setSortType,
} from '../../redux/psychologitsts/psychologistsSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserFavorites,
  addFavoritesPsychologists,
  removeFavoritePsychologist,
} from '../../redux/psychologitsts/psychologistsOperation';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebaseConfig';

const Favorites = ({ userId }) => {
  const dispatch = useDispatch();
  const filteredAndSortedFavorites = useSelector(selectFilteredAndSortedFavorites);

  const sortType = useSelector(selectSortType);
  const filter = useSelector(selectFilter);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    setIsAuth(!!auth.currentUser);

    if (userId) {
      dispatch(fetchUserFavorites(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const favoriteRef = ref(db, `users/${user.uid}/favorites`);
      const unsubscribe = onValue(favoriteRef, snapshot => {
        const favoritesData = snapshot.val();
        const favoritesIds = favoritesData ? Object.keys(favoritesData) : [];
        dispatch(setFavoriteIds(favoritesIds));
      });

      return () => unsubscribe();
    } else {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      dispatch(setFavoriteIds(storedFavorites));
    }
  }, [dispatch, isAuth]);

  const handleSortChange = e => {
    dispatch(setSortType(e.target.value));
  };

  const handleFilterChange = e => {
    dispatch(setFilter(e.target.value));
  };

  const handleFavoriteToggle = psychologistId => {
    if (!isAuth) {
      alert('This feature is available only for authorized users.');
      return;
    }

    const isFavorite = filteredAndSortedFavorites.some(
      psychologist => psychologist.id === psychologistId
    );

    if (isFavorite) {
      dispatch(removeFavoritePsychologist({ userId, psychologistId }));
    } else {
      dispatch(addFavoritesPsychologists({ userId, psychologistId }));
    }
  };

  return (
    <>
      <div className={css.favorites_page}>
        {filteredAndSortedFavorites.length > 0 ? (
          <>
            <SortFilter
              sortType={sortType}
              filter={filter}
              onSortChange={handleSortChange}
              onFilterChange={handleFilterChange}
            />
            <div className={css.psychologists_list}>
              {filteredAndSortedFavorites.map(psychologist => (
                <PsychologistCard
                  key={psychologist.id}
                  psychologist={psychologist}
                  isFavorite={true}
                  onFavoriteToggle={() => handleFavoriteToggle(psychologist.id)}
                />
              ))}
            </div>
          </>
        ) : (
          <NoFavoritePsychologists />
        )}
      </div>
    </>
  );
};

export default Favorites;
