import React from 'react';
import styles from './styles.module.less';
import { useHistory } from 'react-router';
import cn from 'classnames';
import Python from '@assets/Python.png';
import ArrowRight from '@assets/ArrowRight';
import { Link } from 'react-router-dom';

export const Card = ({ data }) => {
  const history = useHistory();

  const renderImg = (type) => {
    switch (type) {
      case 'python':
        return <img src={Python} alt="Иконка" />;
      default:
        break;
    }
  };

  const courseClickHandler = (courseSlug) => history.push(`/courses/${courseSlug}`);

  return (
    <>
      <div className={cn(styles.card, styles.progress)}>
        <div className={styles.title}>
          Завершенные курсы
          <Link to="/">
            Все <ArrowRight />
          </Link>
        </div>
        <div className={styles.items}>
          {data?.map(({ title, slug }) => (
            <div onClick={() => courseClickHandler(slug)} className={styles.item}>
              {renderImg('python')} {title}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
