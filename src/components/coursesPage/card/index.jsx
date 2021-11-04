import React from 'react';
import css from './styles.module.less';
import { Link } from 'react-router-dom';
import Button from '@components/mui/button';
import TimerOutlined from '@assets/TimerOutlined.png';

export const Card = ({ info }) => {
  return (
    <div className={css.wrapper}>
      <div className={css.about}>
        <h2 className={css.title}>{info.title}</h2>
        <span className={css.description}>{info.description}</span>
        <div className={css.time}>
          <img className={css.timeIcon} src={TimerOutlined} alt="" />
          {info.time}
        </div>
      </div>
      <div className={css.actionBlock}>
        <Link className={css.link} to={`/courses/${info.slug}`}>
          <Button variant="outlinePurple">Показать стенограмму</Button>
        </Link>
      </div>
    </div>
  );
};
