import css from './style.module.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import { useDispatch } from 'react-redux';
// import { registerUser } from '../../../redux/auth/authOperation';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(15, 'Name must be between 3 and 15 characters')
    .required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const RegistrationForm = ({ onClose }) => {
  // Забезпечимо передачу значення поля name у виклик registerUser.
  // const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // const onSubmit = async data => {
  //   try {
  //     await dispatch(registerUser(data.email, data.password, data.name));
  //     onClose();
  //   } catch (error) {
  //     console.error('Registration failed', error);
  //   }
  // };
  // const togglePasswordVisibility = () => {
  //   setShowPassword(prevState => !prevState);
  // };
  const onSubmit = async data => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: data.name });
      console.log('User created:', user); // Логування користувача після створення
      console.log('User displayName:', user.displayName); // Логування displayName
      onClose();
    } catch (error) {
      console.error('Registration failed', error);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Registration</h2>
      <div className={css.text_form}>
        Thank you for your interest in our platform! In order to register, we need some information.
        Please provide us with the following information.
      </div>
      <div className={css.input_block}>
        <label>
          <input type="text" placeholder="Name" {...register('name')} />
          {errors.name && <p className={css.validation_error}>{errors.name.message}</p>}
        </label>
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
      <button type="submit" className={css.button_sign_up}>
        Sign Up
      </button>
    </form>
  );
};

export default RegistrationForm;
