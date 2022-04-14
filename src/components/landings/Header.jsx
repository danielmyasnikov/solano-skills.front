import styles from '@components/landings/LearningPage/styles.module.less';

export const LandingHeader = ({ title, desc }) => (
  <section className={styles.slogan}>
    <h1 className={styles.slogan__title}>{title}</h1>
    <div className={styles.slogan__description}>{desc}</div>
  </section>
);
