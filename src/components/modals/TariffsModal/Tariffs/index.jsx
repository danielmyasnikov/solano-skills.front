import styles from './styles.module.less';
import { useHistory } from 'react-router-dom';
import Icon from './assets/Icon.svg';
import cn from 'classnames';
import { useCallback } from 'react';
import { Button } from '@mui/material';
import { closeTariffsModal } from '@store/global/modals';
import { useDispatch } from 'react-redux';

export const Tariffs = ({ tariffList, isTariffs }) => {
  const IconItem = () => <img src={Icon} alt="icon" />;

  const dispatch = useDispatch();
  const history = useHistory();

  const Sections = useCallback((isEconomy) => {
    return (
      <ul className={cn(styles.list)}>
        <li className={styles.listItem}>
          {IconItem()}
          <span className={styles.listItemText}>15 курсов</span>
        </li>
        <li className={cn(styles.listItem, { [styles.listItemEconomy]: isEconomy })}>
          {IconItem()}
          <span className={styles.listItemText}>Полный доступ</span>
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
      {tariffList.map(
        ({
          id,
          title,
          old_price,
          total_price,
          is_economy,
          is_optimal,
          price,
          description,
          cycle,
          confirmation_text,
        }) => (
          <div
            key={id}
            className={cn(styles.wrapper, {
              [styles.border]: isTariffs,
              [styles.wrapperGreen]: is_optimal,
            })}
          >
            <div className={styles.container}>
              <div className={styles.wrapperTitleContainer}>
                <div className={styles.wrapperTitle}>{title}</div>
              </div>
              {Sections(is_economy)}
            </div>
            <div className={styles.actionContainer}>
              <div className={cn(styles.wrapperPrice, { [styles.wrapperPriceGreen]: is_optimal })}>
                <span>{(is_economy && price) || `${price}₽/месяц`}</span>
                {id === 1 && (
                  <small>
                    * К оплате 11 880 руб за годовой доступ ко всему контенту образовательной
                    платформы DeepSkills
                  </small>
                )}
              </div>
              <Button
                onClick={() => {
                  dispatch(closeTariffsModal({}));
                  history.push({
                    pathname: '/payment',
                    state: {
                      id: id,
                      title: title,
                      price: price,
                      oldPrice: old_price,
                      totalPrice: total_price,
                      description: description,
                      confirmationText: confirmation_text,
                      cycle: cycle,
                    },
                  });
                }}
                to="/payment"
                className={styles.wrapperButton}
                variant={id === 1 ? 'outlinePurple' : 'containedPurple'}
              >
                Активировать
              </Button>
            </div>
          </div>
        ),
      )}
    </>
  );
};
