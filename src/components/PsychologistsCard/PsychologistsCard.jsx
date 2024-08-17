import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ref, set, remove, onValue } from 'firebase/database';
import { db } from '../../firebaseConfig.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StarRating from '../IconsButton/IconStarRating/StarRating.jsx';
import ModalMakeAnAppointment from '../Modals/ModalMakeAnAppointment/ModalMakeAnAppointment.jsx';
import ModalAuth from '../Modals/ModalAuth/ModalAuth.jsx';
import FavoriteButton from '../../pages/favorites/FavoriteButton.jsx';
import { selectAuthStatus, selectUser } from '../../redux/auth/authSlice.js';
import { addFavoriteId, removeFavoriteId } from '../../redux/psychologitsts/psychologistsSlice.js';
import css from './style.module.css';

const PsychologistCard = ({ psychologist, onFavoriteToggle }) => {
  const {
    id,
    name,
    avatar_url,
    experience,
    reviews,
    price_per_hour,
    rating,
    license,
    specialization,
    initial_consultation,
    about,
    isOnline,
  } = psychologist;

  const dispatch = useDispatch();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const isAuthenticated = useSelector(selectAuthStatus);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      const favoriteRef = ref(db, `users/${user.uid}/favorites/${id}`);
      const unsubscribe = onValue(favoriteRef, snapshot => {
        setIsFavorite(snapshot.exists());
      });

      return () => unsubscribe();
    }
  }, [user, id]);

  const handleToggleFavorite = () => {
    if (!isAuthenticated || !user) {
      toast.info('This functionality is only available to authorized users.');
      setIsAuthModalOpen(true);
      return;
    }

    const favoriteRef = ref(db, `users/${user.uid}/favorites/${id}`);

    if (isFavorite) {
      dispatch(removeFavoriteId(id));
      remove(favoriteRef);
    } else {
      dispatch(addFavoriteId(id));
      set(favoriteRef, true);
    }
    setIsFavorite(!isFavorite);
  };

  const handleToggleExpand = () => setIsExpanded(prevState => !prevState);

  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => setIsOpenModal(false);

  return (
    <div className={css.psychologist_card}>
      <div className={css.avatar}>
        <img src={avatar_url} alt={`${name}'s avatar`} className={css.avatar_img} />
        <div
          className={`${css.status_indicator} ${isOnline ? css.Online : css.Offline}`}
          title={isOnline ? 'Online' : 'Offline'}
        />
      </div>
      <div className={css.block_rating_price_favorite}>
        <div className={css.star_rating}>
          <StarRating rating={rating} />
          <span className={css.rating_text}>Rating: {rating}</span>
        </div>
        <span>|</span>
        <div className={css.price_block}>
          Price / 1 hour: <span className={css.price_span}>{price_per_hour}$</span>
        </div>
        <FavoriteButton id={id} isFavorite={isFavorite} onClick={handleToggleFavorite} />
      </div>
      <div className={css.psychologist_details}>
        <p className={css.pre_title}>Psychologist</p>
        <h2 className={css.name_title}>{name}</h2>
        <div className={css.btn_education_container}>
          <button className={css.btn_education}>
            <span className={css.btn_strong}>Experience:&nbsp;</span>
            {experience}
          </button>
          <button className={css.btn_education}>
            <span className={css.btn_strong}>License:&nbsp;</span>
            {license}
          </button>
          <button className={css.btn_education}>
            <span className={css.btn_strong}>Specialization:&nbsp;</span>
            {specialization}
          </button>
          <button className={css.btn_education}>
            <span className={css.btn_strong}>Initial consultation:&nbsp;</span>
            {initial_consultation}
          </button>
        </div>
        <div className={css.psychologist_about}>{about}</div>
        {!isExpanded && (
          <button className={css.btn_read_more} type="button" onClick={handleToggleExpand}>
            Read more
          </button>
        )}
        {isExpanded && (
          <div className={css.review_container}>
            {reviews.map((review, index) => (
              <div key={`${review.id}-${index}`} className={css.review_container_item}>
                <div className={css.review_container_item_name_stars}>
                  <div className={css.avatarCircle}>
                    {review.reviewer ? review.reviewer.charAt(0).toUpperCase() : ''}
                  </div>
                  <div className={css.container_avatar_stars}>
                    <strong className={css.name}>{review.reviewer}</strong>
                    <div className={css.star_rating}>
                      <StarRating
                        width={24}
                        height={24}
                        rating={review.rating}
                        fillColor="#FFC531"
                      />
                      {review.rating}
                    </div>
                  </div>
                </div>
                <div className={css.review_container_item_comment}>{review.comment}</div>
              </div>
            ))}
            <button className={css.btn_appointment} type="button" onClick={handleOpenModal}>
              Make an appointment
            </button>
          </div>
        )}
      </div>
      <ModalMakeAnAppointment
        isOpen={isOpenModal}
        onClose={handleCloseModal}
        psychologist={psychologist}
      />
      <ModalAuth isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <ToastContainer />
    </div>
  );
};

export default PsychologistCard;
