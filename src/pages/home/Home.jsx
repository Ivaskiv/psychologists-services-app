import css from './style.module.css';
import sprite from '../../assets/sprite.svg';
import titleImg from '../../assets/images/image3x.jpg';

const handleRedirect = () => {
  window.location.href = '/psychologists';
};

const Home = () => {
  return (
    <div className={css.home_page}>
      <div className={css.title_container}>
        <div className={css.background_blur}></div>
        <div className={css.title}>
          <div className={css.title_text}>
            The road to the <span>depths</span> of the human soul
          </div>
          <p className={css.title_p}>
            We help you to reveal your potential, overcome challenges and find a guide in your own
            life with the help of our experienced psychologists.
          </p>
          <button className={css.btn_started} onClick={handleRedirect}>
            Get started
            <svg className={css.icon_arrow}>
              <use href={`${sprite}#icon-arrow16`}></use>
            </svg>
          </button>
        </div>
      </div>
      <div className={css.img_title_container}>
        <div className={css.img_title}>
          <img className={css.img} src={titleImg} alt="Psychologists" />

          <div className={css.icon_container}>
            <div className={css.block_check}>
              <button className={css.btn_check}>
                <svg className={css.icon_check}>
                  <use href={`${sprite}#icon-fe_check`}></use>
                </svg>
              </button>
              <div className={css.btn_title}>
                <div>Experienced psychologists</div>
                <div className={css.icon_count}>15,000</div>
              </div>
            </div>
            <div className={css.block_btn}>
              <button className={css.btn_question}>
                <div className={css.icon_question}>?</div>
              </button>
              <button className={css.btn_users}>
                <svg className={css.icon_users}>
                  <use href={`${sprite}#icon-users`}></use>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
