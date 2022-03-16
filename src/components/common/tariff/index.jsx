import styles from './styles.module.less';
import { useHistory } from 'react-router-dom';
import Button from '@components/mui/button';
import Icon from './assets/Icon.svg';
import cn from 'classnames';
import { useCallback, useEffect, useMemo } from 'react';
import { TariffList } from '../../constants';
import * as TariffsStore from '@store/tariffs';
import { useDispatch, useSelector } from 'react-redux';
import { tariffs } from '@store/tariffs/selector';

export const Tariffs = () => {
  const IconItem = () => <img src={Icon} alt="icon" />;

  const dispatch = useDispatch();

  const tariffVariants = useSelector(tariffs);
  // const tariffVariants = TariffList;

  const history = useHistory();

  const Sections = useCallback((isEconomy, isOptimal) => {
    return (
      <ul className={cn(styles.list, { [styles.listOptimal]: isOptimal })}>
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

  const RenderTariffList = useMemo(() => {
    return tariffVariants.map(
      ({ id, title, oldPrice, totalPrice, isEconomy, isOptimal, price }) => (
        <div key={id} className={cn(styles.wrapper, { [styles.wrapperGreen]: isOptimal })}>
          <div className={styles.container}>
            <div className={styles.wrapperTitleContainer}>
              <div className={styles.wrapperTitle}>{title}</div>
              {isOptimal && <div className={styles.wrapperInfo}>Оптимальный</div>}
            </div>
            {Sections(isEconomy, isOptimal)}
          </div>
          <div className={styles.actionContainer}>
            <div className={cn(styles.wrapperPrice, { [styles.wrapperPriceGreen]: isOptimal })}>
              {(isEconomy && price) || `${price}₽/месяц`}
            </div>
            <Button
              onClick={() =>
                history.push({
                  pathname: '/payment',
                  state: {
                    title: title,
                    price: price,
                    oldPrice: oldPrice,
                    totalPrice: totalPrice,
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
      ),
    );
  }, [Sections]);

  useEffect(() => {
    dispatch(TariffsStore.Actions.getTariffs());
  }, []);

  return <>{tariffVariants && RenderTariffList}</>;
};
