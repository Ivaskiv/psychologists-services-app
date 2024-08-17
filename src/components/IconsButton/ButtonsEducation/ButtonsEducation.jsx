import css from './style.module.css';

const ButtonsEducation = ({ id, count = null }) => {
  if (count === 0) {
    return null;
  }

  return (
    <button className={css.icon_btn} key={id}>
      {count}
      {count && ' '}
      {id}
    </button>
  );
};
export default ButtonsEducation;
