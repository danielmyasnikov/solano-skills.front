import React, { useEffect, useState } from 'react';
import styles from './styles.module.less';
import cn from 'classnames';
import AvatarDefault from '@assets/avatarDefault.png';
import AddImage from '@assets/AddImage';
import Edit from '@assets/Edit';
import Button from '@components/mui/button';
import { Link } from 'react-router-dom';
import Card from './card';
import { useRef } from 'react';
import CropImage from './cropImage';
import { useDispatch, useSelector } from 'react-redux';
import * as AuthStore from '@store/auth';
import { patchProfile, getProfile } from '@store/profile/actions';
import { selectProfile } from '@store/profile/selector';

const Profile = () => {
  const [activeEditField, setActiveEditField] = useState('');
  const [fullName, setFullName] = useState('');
  const [information, setInformation] = useState('');
  const fullnameRef = useRef();
  const informationRef = useRef();
  const dispatch = useDispatch();
  const { headers } = useSelector(AuthStore.Selectors.getAuth);
  const profile = useSelector(selectProfile);

  const saveProfile = () => {
    setActiveEditField('');
    setFullName(fullnameRef.current.innerText);
    setInformation(informationRef.current.innerText);
    dispatch(
      patchProfile({
        name: fullnameRef.current.innerText,
        about: informationRef.current.innerText,
        headers: headers,
      }),
    );
  };

  const EditFragment = ({ name }) => {
      <div className={styles.edit}>
        {activeEditField !== name ? (
          <div onClick={() => setActiveEditField(name)}>
            <Edit />
          </div>
        ) : (
          <div onClick={saveProfile} className={styles.save}>
            Сохранить
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (headers.uid) {
      dispatch(getProfile({ headers: headers }));
    }
  }, [headers]);

  useEffect(() => {
    setFullName(profile.name);
    setInformation(profile.about);
  }, [profile]);

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
            <div
              name="fullname"
              contentEditable={activeEditField === 'fullname'}
              suppressContentEditableWarning={true}
              ref={fullnameRef}
              className={cn(styles.unstyled, {
                [styles.active]: activeEditField === 'fullname',
              })}
            >
              {fullName}
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
              <EditFragment name="information" />
            </div>
            <div className={styles.items}>
              <div
                name="information"
                contentEditable={activeEditField === 'information'}
                suppressContentEditableWarning={true}
                ref={informationRef}
                className={cn(styles.about, {
                  [styles.active]: activeEditField === 'information',
                })}
                dangerouslySetInnerHTML={{ __html: information }}
              />
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
