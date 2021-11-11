import React from 'react';
import css from './styles.module.less';
import { Link } from 'react-router-dom';
import Button from '@components/mui/button';
import TimerOutlined from '@assets/TimerOutlined.png';
import Py from '@assets/py.png';

export const Card = ({ info }) => {
  const getTypeImg = () => {
    switch (info.lang) {
      case 'python':
        return Py;
      default:
        break;
    }
  };

  return (
    <Link className={css.wrapper} to={`/courses/${info.slug}`}>
      <div className={css.about}>
        <img className={css.langImg} src={getTypeImg()} alt="" />
        <h2 className={css.title}>{info.title}</h2>
        <span className={css.description}>{info.description}</span>
        <div className={css.time}>
          <img className={css.timeIcon} src={TimerOutlined} alt="" />
          {info.time}
        </div>
      </div>
      <div className={css.actionBlock}>
        <Button variant="outlinePurple">Перейти</Button>
      </div>
    </Link>
  );
};
