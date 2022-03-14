import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.less';
import Certificate from './certificate';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import cn from 'classnames';
import Edit from '@assets/Edit';
import Button from '@components/mui/button';
import * as AuthStore from '@store/auth';
import { selectProfile } from '@store/profile/selector';
import { getProfile, patchProfile } from '@store/profile/actions';
import { Avatar } from '../profile/Avatar';
import { Link } from 'react-router-dom';

export const CertificatesPage = () => {
  const [sertificates, setSertificates] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [activeEditField, setActiveEditField] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [friendlyid, setFriendlyid] = useState('');
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
    setFullname(e.target.value);
  };

  const handleActiveField = (name) => {
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
      history.push('/certificates');
    }
  }, []);

  useEffect(() => {
    if (headers.uid) {
      dispatch(getProfile({ headers }));
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
            <Avatar avatar={profile.avatar_url} />
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
            <Link to="/profile">Обзор профиля</Link>
            <Button variant="containedPurple">Сертификаты</Button>
          </div>
        </div>
        <div className={cn(styles.links, styles.mobile)}>
          <Link to="/profile">Обзор профиля</Link>
          <Button variant="containedPurple">Сертификаты</Button>
        </div>
        <div className={styles.sertificates}>
          {sertificates.map(() => (
            <Certificate />
          ))}
        </div>
      </div>
    </div>
  );
};
