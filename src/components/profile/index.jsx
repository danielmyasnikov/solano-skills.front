import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styles from './styles.module.less';
import cn from 'classnames';
import Edit from '@assets/Edit';
import Button from '@components/mui/button';
import { Link } from 'react-router-dom';
import Card from './card';
import { Avatar } from './Avatar';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as AuthStore from '@store/auth';
import { patchProfile } from '@store/profile/actions';
import { selectProfile } from '@store/profile/selector';
import { TextareaAutosize } from '@mui/material';
import HeaderPage from '../common/headerPage';
import { Preloader } from '../mui/preloader';
import DefaultAvatar from '@assets/defaultUserAvatarBig.png';

const Profile = () => {
  const [activeEditField, setActiveEditField] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [registerationDate, setRegisterationDate] = useState('');
  const [isFullnameActive, setIsFullnameActive] = useState(false);
  const [information, setInformation] = useState('');
  const [isInformationActive, setIsInformationActive] = useState(false);
  const fullnameRef = useRef();

  const dispatch = useDispatch();

  const history = useHistory();

  const { headers } = useSelector(AuthStore.Selectors.getAuth);
  const profile = useSelector(selectProfile);

  const uid = localStorage.getItem('uid');
  const client = localStorage.getItem('client');
  const accessToken = localStorage.getItem('access-token');

  const saveProfile = () => {
    setIsFullnameActive(false);
    setIsInformationActive(false);
    setActiveEditField('');
    dispatch(
      patchProfile({
        name: fullname,
        about: information,
        headers: headers,
      }),
    );
  };

  const handleChange = (e) => {
    if (e.target?.name === 'fullname') {
      setFullname(e.target.value);
    }
    if (e.target?.name === 'information') {
      setInformation(e.target.value);
    }
  };

  const handleActiveField = (name) => {
    switch (name) {
      case 'fullname':
        setIsFullnameActive(!isFullnameActive);
        setActiveEditField(isFullnameActive ? '' : 'fullname');
        break;
      case 'information':
        setIsInformationActive(!isInformationActive);
        setActiveEditField(isInformationActive ? '' : 'information');
        break;
      default:
        break;
    }
  };

  const EditFragment = ({ name }) => {
    return (
      <div className={styles.edit}>
        {activeEditField !== name ? (
          <div onClick={() => handleActiveField(name)}>
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
    if (!uid && !client && !accessToken) {
      history.push('/courses');
    }
  }, []);

  useEffect(() => {
    if (profile) {
      const date = new Date(profile.registeration_date);
      const dateSrc = date.toLocaleString('ru-RU', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });
      setFullname((profile.name && profile.name) || 'Неизвестный пользователь');
      setInformation((profile.about && profile.about) || 'Здесь может быть информация о тебе');
      setEmail(profile.email);
      setRegisterationDate(dateSrc);
    }
  }, [profile]);

  return (
    <div className={styles.wrapper}>
      <HeaderPage content="profile" />
      {(Object.keys(profile).length !== 0 && (
        <div className={styles.content}>
          <div className={cn(styles.profile, styles.card)}>
            <div className={styles.profileInfo}>
              <Avatar avatar={(profile.avatar_url && profile.avatar_url) || DefaultAvatar} />
              {isFullnameActive && (
                <input
                  name="fullname"
                  onChange={handleChange}
                  ref={fullnameRef}
                  className={cn(styles.unstyled, styles.fullname, {
                    [styles.activeFullname]: activeEditField === 'fullname',
                  })}
                  value={fullname}
                />
              )}
              {!isFullnameActive && (
                <div
                  name="fullname"
                  onChange={handleChange}
                  ref={fullnameRef}
                  className={cn(styles.unstyled, styles.fullname)}
                >
                  {fullname}
                </div>
              )}
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
            <div
              className={cn(styles.card, styles.information, {
                [styles.activeInformation]: isInformationActive,
              })}
            >
              <div className={styles.title}>
                Информация
                <EditFragment name="information" />
              </div>
              <div className={styles.items}>
                <TextareaAutosize
                  disabled={!isInformationActive}
                  name="information"
                  aria-label="empty textarea"
                  value={(information && information) || ''}
                  onChange={handleChange}
                />
                <div className={styles.additionalInfo}>
                  <div>
                    <span>E-mail: </span> {email}
                  </div>
                  <div>
                    <span>Дата регистрации: </span> {registerationDate}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )) || (
        <div className={styles.preloaderContainer}>
          <Preloader size="60px" />
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.courses}>
          <Card />
        </div>
      </div>
    </div>
  );
};

export default Profile;
