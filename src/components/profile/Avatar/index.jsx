import React, { useState } from 'react';

import { AddAvatar } from './addAvatar/index.jsx';

import AvatarDefault from '@assets/avatarDefault.png';
import AddImage from '@assets/AddImage';

import styles from './styles.module.less';

export const Avatar = () => {
  const [avatarEdit, setAvatarEdit] = useState(false);

  const avatarEditHandler = () => setAvatarEdit(!avatarEdit);

  return (
    <>
      <div className={styles.avatar} onClick={avatarEditHandler}>
        <img src={AvatarDefault} alt="Аватарка пользователя" />
        <div className={styles.addImage}>
          <AddImage />
        </div>
      </div>

      {avatarEdit && <AddAvatar open={avatarEdit} handleClick={avatarEditHandler} />}
    </>
  );
};
