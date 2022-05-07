import { Link } from 'react-router-dom';
import styles from './styles.module.less';
import HeaderLogo from '@assets/homepage/HeaderLogo';
import Burger from '@assets/Burger';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '@store/profile/selector';
import { Button } from '@mui/material';
import { openFeedbackModal } from '@store/global/modals';

const HeaderHome = ({ handleBurger }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.header__block}>
          <div className={styles.header__logo}>
            <Link to="/">
              Solano Skills
            </Link>
          </div>
          <div className={styles.header__menu}>
            <Link to="/courses">Education</Link>
            <Link to="/tariffs">Tariffs</Link>
            <span style={{ cursor: 'pointer' }} onClick={() => dispatch(openFeedbackModal({}))}>
              Support
            </span>
          </div>
        </div>
        <div className={styles.header__block}>
          {!isAuth && (
            <>
              <Link to={'/sign-in'}>
                <Button variant="outlinePurple">Login</Button>
              </Link>
              <Link to={'/sign-up'}>
                <Button variant="containedPurple">Registration</Button>
              </Link>
            </>
          )}
          <div className={styles.header__burger} onClick={handleBurger}>
            <Burger />
          </div>
        </div>
      </header>
    </div>
  );
};

export default HeaderHome;
