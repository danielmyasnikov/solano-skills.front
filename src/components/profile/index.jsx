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
import CropImage from './cropImage';
import { useDispatch, useSelector } from 'react-redux';
import * as AuthStore from '@store/auth';
import { patchProfile, getProfile } from '@store/profile/actions';
import { selectProfile } from '@store/profile/selector';

const Profile = () => {
  const [activeEditField, setActiveEditField] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [friendlyid, setFriendlyid] = useState('');
  const [registerationDate, setRegisterationDate] = useState('');
  const [isFullnameActive, setIsFullnameActive] = useState(false);
  const [information, setInformation] = useState('');
  const fullnameRef = useRef();
  const informationRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const { headers } = useSelector(AuthStore.Selectors.getAuth);
  const profile = useSelector(selectProfile);

  const uid = localStorage.getItem('uid');
  const client = localStorage.getItem('client');
  const accessToken = localStorage.getItem('access-token');

  const saveProfile = () => {
    setIsFullnameActive(false);
    setActiveEditField('');
    setInformation(informationRef.current.innerText);
    dispatch(
      patchProfile({
        name: fullname,
        about: informationRef.current.innerText,
        headers: headers,
      }),
    );
  };

  const handleChange = (e) => {
    if (e.target?.name === 'fullname') {
      setFullname(e.target.value);
    }
  };

  const handleActiveField = (name) => {
    console.log(name);
    switch (name) {
      case 'fullname':
        setIsFullnameActive(!isFullnameActive);
        setActiveEditField(isFullnameActive ? '' : 'fullname');
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
    if (headers.uid) {
      dispatch(getProfile({ headers: headers }));
    }
  }, [headers]);

  useEffect(() => {
    if (profile.name) {
      const date = new Date(profile.registeration_date);
      setFullname(profile.name);
      setInformation(profile.about);
      setEmail(profile.email);
      setFriendlyid(profile.friendly_id);
      setRegisterationDate(`${date.getUTCDay()}/${date.getMonth()}/${date.getFullYear()}`);
    }
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
            <Avatar />
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
              >
                {information}
              </div>
              <div className={styles.additionalInfo}>
                <div>
                  <span>ID: </span> {friendlyid}
                </div>
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
        <div className={styles.courses}>
          <Card />
        </div>
      </div>
    </div>
  );
};

export default Profile;
