import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import css from './style.module.css';
import ModalAuth from '../../components/Modals/ModalAuth/ModalAuth.jsx';
import sprite from '../../assets/sprite.svg';
import { logout } from '../../redux/auth/authOperation.js';
import { selectUser } from '../../redux/auth/authSlice.js';

const Header = () => {
  const [modalState, setModalState] = useState(null); // null, 'login', or 'register'
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const authenticated = Boolean(user && user.uid);

  const openModal = type => setModalState(type);
  const closeModal = () => setModalState(null);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      closeModal();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  useEffect(() => {
    if (user) {
      console.log('User object in Header:', user);
      console.log('DisplayName:', user.displayName);
    }
  }, [user]);

  return (
    <div className={css.header_container}>
      <header className={css.header}>
        <div className={css.logo}>
          <span>psychologists.</span>services
        </div>

        <nav className={css.nav_menu}>
          <NavLink to="/" end className={({ isActive }) => (isActive ? css.active : '')}>
            Home
          </NavLink>
          <NavLink to="/psychologists" className={({ isActive }) => (isActive ? css.active : '')}>
            Psychologists
          </NavLink>
          {authenticated && (
            <NavLink to="/favorites" className={({ isActive }) => (isActive ? css.active : '')}>
              Favorites
            </NavLink>
          )}
        </nav>
        <div className={css.auth_buttons}>
          {authenticated ? (
            <div className={css.user_info}>
              <button className={css.auth_button_user}>
                <svg className={css.avatar}>
                  <use href={`${sprite}#icon-avatar`} />
                </svg>
                <div className={css.user_name}>{user.displayName || 'User'}</div>
              </button>
              <button className={css.auth_button_logout} onClick={handleLogout}>
                Log out
              </button>
            </div>
          ) : (
            <>
              <button className={css.auth_button_login} onClick={() => openModal('login')}>
                Login
              </button>
              <button
                className={css.auth_button_registration}
                onClick={() => openModal('register')}
              >
                Registration
              </button>
            </>
          )}
        </div>
      </header>
      <ModalAuth isOpen={modalState !== null} onClose={closeModal} type={modalState} />
    </div>
  );
};

export default Header;
