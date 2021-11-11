import React from 'react';
import AvatarDefault from '@assets/avatarDefault.png';
import css from './styles.module.less';

export const Auth = () => {
  return (
    <div className={css.wrapper}>
      <img src={AvatarDefault} className={css.avatar} alt="" />

      <div className={css.infoWrap}>
        <div className={css.label}>Преподаватель</div>
        <h4 className={css.title}>Имя преподавателя</h4>
        <p className={css.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  );
};
