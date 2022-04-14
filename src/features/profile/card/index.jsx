import React from 'react';
import styles from './styles.module.less';
import { useHistory } from 'react-router';
import cn from 'classnames';
import Python from '@assets/Python.png';
import ArrowRight from '@assets/ArrowRight';
import { Link } from 'react-router-dom';

export const Card = ({ data, title }) => {
  const history = useHistory();

  const renderImg = (type) => {
    switch (type) {
      case 'python':
        return <img src={Python} alt="Иконка Python" />;
      default:
        break;
    }
  };

  const courseClickHandler = (courseSlug) => history.push(`/courses/${courseSlug}`);

  return (
    <>
      <div className={cn(styles.card, styles.progress)}>
        <div className={styles.title}>
          {title}
          {/*
             <Link to="/">
            Все <ArrowRight />
          </Link>
          */}
        </div>
        <div className={styles.items}>
          {data?.map((e) => (
            <div onClick={() => courseClickHandler(e.slug)} className={styles.item}>
              {renderImg('python')} {e.title || e.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
