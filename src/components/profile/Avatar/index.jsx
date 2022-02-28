import React, { useEffect, useState } from 'react';

import { AddAvatar } from './addAvatar/index.jsx';

import AddImage from '@assets/AddImage';

import styles from './styles.module.less';

export const Avatar = (avatar) => {
  const [avatarEdit, setAvatarEdit] = useState(false);

  const avatarEditHandler = () => setAvatarEdit(!avatarEdit);

  return (
    <>
      <div className={styles.avatar} onClick={avatarEditHandler}>
        <img src={avatar.avatar} alt="Аватарка пользователя" />
        <div className={styles.addImage}>
          <AddImage />
        </div>
      </div>

      {avatarEdit && <AddAvatar open={avatarEdit} handleClick={avatarEditHandler} />}
    </>
  );
};
