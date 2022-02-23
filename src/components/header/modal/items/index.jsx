import { v4 as uuid } from 'uuid';

import styles from './styles.module.less';
import { ModalItem } from '../item';

const items = [
  {
    title: 'Эконом',
    activeItems: [true, false, false],
    price: 'Бесплатно',
    href: '#',
  },
  {
    title: 'Годовой',
    activeItems: [true, true, true],

    price: '299₽/месяц',
    active: true,
    href: '#',
  },
  {
    title: 'Эконом',
    activeItems: [true, true, true],
    price: '2999₽/месяц',
    href: '#',
  },
];
export const ModalItems = () => (
  <div className={styles.items}>
    {items.map((el) => (
      <ModalItem {...el} key={uuid()} />
    ))}
  </div>
);
