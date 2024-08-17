import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { format } from 'date-fns';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import metadata from 'libphonenumber-js/metadata.min.json';
import { parsePhoneNumberFromString, getCountryCallingCode } from 'libphonenumber-js';
import DatePicker from 'react-datepicker';
import { GoClock } from 'react-icons/go';
import 'react-datepicker/dist/react-datepicker.css';
import css from './style.module.css';

const formSchema = yup.object({
  name: yup.string().required('Name is required'),
  tel: yup
    .string()
    .test('is-valid-phone', 'Telephone number is invalid', value => {
      const phoneNumber = parsePhoneNumberFromString(value || '', metadata);
      return phoneNumber ? phoneNumber.isValid() : false;
    })
    .required('Telephone number is required'),
  email: yup.string().email('Email must be a valid email').required('Email is required'),
  time: yup.date().required('Time is required').nullable(),
  comment: yup
    .string()
    .min(3, 'Comment must be at least 3 characters long')
    .max(30, 'Comment must be at most 30 characters long')
    .optional(),
});

const ModalMakeAnAppointment = ({ isOpen, onClose, onSubmit, psychologist }) => {
  const [defaultCountry, setDefaultCountry] = useState('UA');
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const watchTel = watch('tel');

  useEffect(() => {
    const countryCode = getCountryCallingCode(defaultCountry);
    setValue('tel', `+${countryCode}`);
  }, [defaultCountry, setValue]);

  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape, { passive: true });
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape, { passive: true });
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFormSubmit = data => {
    const formattedData = {
      ...data,
      time: format(new Date(data.time), 'HH:mm'),
    };

    console.log('Form Data:', formattedData);
    reset();
    onSubmit(formattedData);

    onClose();
  };

  const handlePhoneChange = value => {
    setValue('tel', value);

    const phoneNumber = parsePhoneNumberFromString(value, metadata);
    if (phoneNumber) {
      setDefaultCountry(phoneNumber.country?.toUpperCase() || 'UA');
    }
  };

  const getErrorMessages = () => {
    const messages = [];
    if (errors.tel) messages.push(errors.tel.message);
    if (errors.time) messages.push(errors.time.message);
    return messages.join(', ');
  };

  return (
    <div className={css.modal}>
      <div className={css.overlay} onClick={onClose}></div>
      <div className={css.container_form}>
        <button className={css.closeButton} onClick={onClose} aria-label="Close modal">
          &times;
        </button>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className={css.form_title}>
            <h3>Make an appointment with a psychologist</h3>
            <p>
              You are on the verge of changing your life for the better. Fill out the short form
              below to book your personal appointment with a professional psychologist. We guarantee
              confidentiality and respect for your privacy.
            </p>
          </div>
          <div className={css.psychologist_modal_avatar}>
            <img
              src={psychologist.avatar_url}
              alt={`${psychologist.name}'s avatar`}
              className={css.avatar_img}
            />
            <div className={css.subtitle_container}>
              <p className={css.subtitle}>Your psychologist</p>
              <p className={css.headerText}>{psychologist.name}</p>
            </div>
          </div>
          <div className={css.fields_container}>
            <input className={css.field} {...register('name')} type="text" placeholder="Name" />
            <p className={css.error_message}>{errors.name?.message}</p>
            <input className={css.field} {...register('email')} type="email" placeholder="Email" />
            <p className={css.error_message}>{errors.email?.message}</p>
            <div className={css.container_phone_date}>
              <PhoneInput
                international
                {...register('tel')}
                defaultCountry={defaultCountry}
                value={watchTel}
                onChange={handlePhoneChange}
                className={css.phone_input}
                placeholder="Enter phone number"
              />
              <Controller
                name="time"
                control={control}
                render={({ field }) => (
                  <div className={css.date_picker_wrapper}>
                    <DatePicker
                      className={css.time_picker}
                      {...field}
                      selected={field.value}
                      onChange={date => field.onChange(date)}
                      showTimeSelect
                      showTimeSelectOnly={false}
                      timeIntervals={30}
                      timeCaption="Select time"
                      dateFormat="EEEE, HH:mm"
                      placeholderText="Select date and time"
                      minDate={new Date()}
                      minTime={new Date()}
                      maxTime={new Date(new Date().setHours(18, 30))}
                      timeFormat="HH:mm"
                    />
                    <GoClock className={css.clock_icon} />
                  </div>
                )}
              />
            </div>
            <p className={css.error_message}>{getErrorMessages()}</p>
            <textarea
              className={css.textarea}
              {...register('comment')}
              placeholder="Comment"
            ></textarea>
            <p className={css.error_message}>{errors.comment?.message}</p>
          </div>
          <div className={css.btn_submit_container}>
            <button className={css.btn_send} type="submit">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalMakeAnAppointment;
