import styles from './styles.module.less';

const Container = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Container;
