import styles from '@components/landings/LearningPage/styles.module.less';

export const LandingHeader = ({ title, desc }) => (
  <section className={styles.slogan}>
    <div className={styles.slogan__title}>{title}</div>
    <div className={styles.slogan__description}>{desc}</div>
  </section>
);
