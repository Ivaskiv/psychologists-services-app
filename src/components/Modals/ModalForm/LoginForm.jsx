import css from './style.module.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/auth/authOperation';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginForm = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = async data => {
    const { email, password } = data;
    try {
      await dispatch(login({ email, password })).unwrap();
      console.log('Login successful');
      if (onClose) onClose();
    } catch (error) {
      console.error('Login failed:', error.message);
      setError('Login failed: ' + error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <h2>Login</h2>
      <div className={css.text_form}>
        Welcome back! Please enter your credentials to access your account and continue your search
        for a psychologist.
      </div>
      <div className={css.input_block}>
        <label>
          <input type="email" placeholder="Email" {...register('email')} />
          {errors.email && <p className={css.validation_error}>{errors.email.message}</p>}
        </label>
        <label style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            {...register('password')}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            onClick={togglePasswordVisibility}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
            }}
          />
          {errors.password && <p className={css.validation_error}>{errors.password.message}</p>}
        </label>
      </div>
      <button type="submit" className={css.button_login}>
        Login
      </button>
      {error && <p className={css.validation_error}>{error}</p>} {/* Відображення помилок */}
    </form>
  );
};

export default LoginForm;
