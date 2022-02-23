import React from 'react';
import AvatarDefault from '@assets/avatarDefault.png';
import css from './styles.module.less';

export const Auth = ({ instructor }) => {
  return (
    <div className={css.wrapper}>
      <img src={instructor?.avatar_url || AvatarDefault} className={css.avatar} alt="" />

      <div className={css.infoWrap}>
        <div className={css.label}>Преподаватель</div>
        <h4 className={css.title}>{`${instructor?.first_name} ${instructor?.last_name}`}</h4>
        <p className={css.text} dangerouslySetInnerHTML={{ __html: instructor?.description }} />
      </div>
    </div>
  );
};
