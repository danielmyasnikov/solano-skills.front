import React from 'react';
import css from './styles.module.less';
import { Link } from 'react-router-dom';
import Button from '@components/mui/button';
import TimerOutlined from '@assets/TimerOutlined.png';
import AvatarDefault from '@assets/avatarDefault.png';
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

  const status = info.status;
  const author = info.instructor;

  return (
    <Link className={css.wrapper} to={`/courses/${info.slug}`}>
      <div className={css.about}>
        <img className={css.langImg} src={getTypeImg()} alt="" />
        <h2 className={css.title}>{info.title}</h2>
        <span className={css.description} dangerouslySetInnerHTML={{ __html: info?.description }} />
        <div className={css.time}>
          <img className={css.timeIcon} src={TimerOutlined} alt="" />
          {info.time}
        </div>
      </div>
      <div className={css.actionBlock}>
        {status === 'in_progress' || status === 'done' ? (
          <Button variant="outlinePurple">
            {status === 'in_progress' ? 'Продолжить курс' : 'Пройти заново курс'}{' '}
          </Button>
        ) : (
          <div className={css.author}>
            <img src={author?.avatar_url || AvatarDefault} className={css.avatar} alt="" />
            <div className={css.infoWrap}>
              <h4 className={css.authorTitle}>{`${author.first_name} ${author.last_name}`}</h4>
              <p className={css.text} dangerouslySetInnerHTML={{ __html: author?.subtitle }} />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};
