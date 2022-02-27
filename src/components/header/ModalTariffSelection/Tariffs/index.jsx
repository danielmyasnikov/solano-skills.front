import styles from './styles.module.less';
import { TariffList } from './constants';
import Button from '@components/mui/button';
import Icon from '../assets/Icon.svg';
import cn from 'classnames';
import { useCallback, useMemo } from 'react';

export const Tariffs = () => {
  const IconItem = () => <img src={Icon} alt="icon" />;

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
    return TariffList.map(({ id, title, isEconomy, isOptimal, price }) => (
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
            {price}
          </div>
          <Button className={styles.wrapperButton} variant="containedPurple">
            Активировать
          </Button>
        </div>
      </div>
    ));
  }, [Sections]);

  return <>{RenderTariffList}</>;
};
