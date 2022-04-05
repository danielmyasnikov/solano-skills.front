import { requisites } from './constants';

import styles from './styles.module.less';

export const Requisites = ({}) => {
  return (
    <>
      {requisites.map(({ name, value }) => (
        <div className={styles.requisites}>
          <span>{name}</span>
          <span>{value}</span>
        </div>
      ))}
    </>
  );
};
