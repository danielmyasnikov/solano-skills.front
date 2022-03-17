import styles from './styles.module.less';
import { useHistory } from 'react-router-dom';
import Button from '@components/mui/button';
import Icon from './assets/Icon.svg';
import cn from 'classnames';
import { useCallback } from 'react';

export const Tariffs = ({ tariffList }) => {
  const IconItem = () => <img src={Icon} alt="icon" />;

  const history = useHistory();

  const Sections = useCallback((isEconomy) => {
    return (
      <ul className={cn(styles.list)}>
        <li className={styles.listItem}>
          {IconItem()}
          <span className={styles.listItemText}>3 курса</span>
        </li>
        <li className={cn(styles.listItem, { [styles.listItemEconomy]: isEconomy })}>
          {IconItem()}
          <span className={styles.listItemText}>Выбор профессий</span>
        </li>
        <li className={cn(styles.listItem, { [styles.listItemEconomy]: isEconomy })}>
          {IconItem()}
          <span className={styles.listItemText}>Сертификат</span>
        </li>
      </ul>
    );
  }, []);

  return (
    <>
      {tariffList.map(({ id, title, old_price, total_price, is_economy, is_optimal, price }) => (
        <div key={id} className={cn(styles.wrapper, { [styles.wrapperGreen]: is_optimal })}>
          <div className={styles.container}>
            <div className={styles.wrapperTitleContainer}>
              <div className={styles.wrapperTitle}>{title}</div>
            </div>
            {Sections(is_economy)}
          </div>
          <div className={styles.actionContainer}>
            <div className={cn(styles.wrapperPrice, { [styles.wrapperPriceGreen]: is_optimal })}>
              {(is_economy && price) || `${price}₽/месяц`}
            </div>
            <Button
              onClick={() =>
                history.push({
                  pathname: '/payment',
                  state: {
                    title: title,
                    price: price,
                    oldPrice: old_price,
                    totalPrice: total_price,
                  },
                })
              }
              to="/payment"
              className={styles.wrapperButton}
              variant="containedPurple"
            >
              Активировать
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};
