import React, { useState } from 'react';
import styles from './styles.module.less';
import cn from 'classnames';
import AvatarDefault from '@assets/avatarDefault.png';
import AddImage from '@assets/AddImage';
import Edit from '@assets/Edit';
import Button from '@components/mui/button';
import { Link } from 'react-router-dom';
import Card from './card';
import { useRef } from 'react';

const Profile = () => {
  const [fullnameActive, setFullnameActive] = useState(false);
  const [fullName, setFullName] = useState('Кира Борисенко');

  const EditFragment = ({ name }) => {
    return (
      <div onClick={() => setEditActive(name)} className={styles.edit}>
        {!fullnameActive ? <Edit /> : <div className={styles.save}>Сохранить</div>}
      </div>
    );
  };

  const handleValue = (e) => {
    setFullName(e.target.value);
  };

  const setEditActive = (name) => {
    switch (name) {
      case 'fullname':
        setFullnameActive(!fullnameActive);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Личный кабинет</h1>
        <p className={styles.description}>
          Здесь вы можете просматривать информацию о себе, своих достижениях, историю обучения и
          обновлять свой тарифный план.
        </p>
      </div>
      <div className={styles.content}>
        <div className={cn(styles.profile, styles.card)}>
          <div className={styles.profileInfo}>
            <div className={styles.avatar}>
              <img src={AvatarDefault} />
              <div className={styles.addImage}>
                <AddImage />
              </div>
            </div>
            <div className={cn(styles.fullName, { [styles.active]: fullnameActive })}>
              <div
                name="fullname"
                contentEditable={fullnameActive}
                onInput={(e) => handleValue(e)}
                className={styles.unstyled}
              >
                {fullName}
              </div>
            </div>
            <EditFragment name="fullname" />
          </div>
          <div className={cn(styles.desktop, styles.links)}>
            <Button variant="containedPurple">Обзор профиля</Button>
            <Link to="/certificates">Сертификаты</Link>
          </div>
        </div>
        <div className={cn(styles.links, styles.mobile)}>
          <Button variant="containedPurple">Обзор профиля</Button>
          <Link to="/certificates">Сертификаты</Link>
        </div>
        <div className={styles.mainInfo}>
          <div className={styles.statistics}>
            <div className={styles.blocks}>
              <div className={styles.block}>
                <span className={styles.title}>492 870</span>
                <span className={styles.description}>опыта набрано</span>
              </div>

              <div className={styles.block}>
                <span className={styles.title}>104</span>
                <span className={styles.description}>курса пройдено</span>
              </div>

              <div className={styles.block}>
                <span className={styles.title}>5 396</span>
                <span className={styles.description}>упражнений выполнено</span>
              </div>

              <div className={styles.block}>
                <span className={styles.title}>4</span>
                <span className={styles.description}>часа</span>
              </div>
            </div>
          </div>
          <div className={cn(styles.card, styles.information)}>
            <div className={styles.title}>
              Информация
              {/* <EditFragment name="fullname" /> */}
            </div>
            <div className={styles.items}>
              <ul>
                <li>- Политик</li>
                <li>- Frontend разработчик</li>
                <li>- UI/UX designer</li>
              </ul>
              <div className={styles.additionalInfo}>
                <div>
                  <span>ID:</span> @Kiraborisenko
                </div>
                <div>
                  <span>E-mail:</span> Kirarslwebdesign@gmail.com
                </div>
                <div>
                  <span>Дата регистрации:</span> 01/01/2021
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.courses}>
          <Card />
        </div>
      </div>
    </div>
  );
};

export default Profile;
