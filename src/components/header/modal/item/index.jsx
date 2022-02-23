import { Link } from 'react-router-dom';
import Button from '@components/mui/button';
import EnableTick from '@assets/EnableTick.svg';
import DisableTick from '@assets/DisableTick.svg';
import styles from './styles.module.less';

export const ModalItem = ({ title, activeItems, active, price, href }) => (
  <div>
    <div className={`${styles.item} ${active && styles.active}`}>
      <div className={styles.titleItem}>
        <p>{title}</p>
        {active && (
          <div>
            <span className={styles.mark}>Оптимальный</span>
          </div>
        )}
      </div>
      <div>
        <ul>
          <li>
            <img src={activeItems[0] ? EnableTick : DisableTick} alt="" />3 курса
          </li>
          <li>
            <img src={activeItems[1] ? EnableTick : DisableTick} alt="" />
            Выбор профессий
          </li>
          <li>
            <img src={activeItems[2] ? EnableTick : DisableTick} alt="" />
            Сертификат
          </li>
        </ul>
        <p className={styles.price}>{price}</p>
        <Link to={href}>
          <Button variant={active ? 'containedPurple' : 'outlinePurple'}>Активировать</Button>
        </Link>
      </div>
    </div>
  </div>
);
