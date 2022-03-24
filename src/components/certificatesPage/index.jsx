import React, { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router';

import { Link } from 'react-router-dom';

import * as AuthStore from '@store/auth';
import { getCertificates } from '@store/api/certificate';
import { selectProfile } from '@store/profile/selector';
import { patchProfile } from '@store/profile/actions';

import Certificate from './certificate';
import Button from '@components/mui/button';
import { Avatar } from '../profile/Avatar';

import Edit from '@assets/Edit';
import DefaultAvatar from '@assets/defaultUserAvatarBig.png';

import cn from 'classnames';

import styles from './styles.module.less';
import { Preloader } from '../mui/preloader';

export const CertificatesPage = () => {
  const fullnameRef = useRef();

  const [certificates, setCertificates] = useState();
  const [activeEditField, setActiveEditField] = useState('');
  const [fullname, setFullname] = useState('');
  const [isFullnameActive, setIsFullnameActive] = useState(false);
  const [information, setInformation] = useState('');
  const [isInformationActive, setIsInformationActive] = useState(false);

  const dispatch = useDispatch();

  const { headers } = useSelector(AuthStore.Selectors.getAuth);
  const profile = useSelector(selectProfile);

  const history = useHistory();

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
        headers: headers,
      }),
    );
  };

  const handleChange = (e) => setFullname(e.target.value);

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

  const asyncGetCertificates = async () => {
    setCertificates(await getCertificates());
  };

  useEffect(() => {
    asyncGetCertificates();
  }, []);

  useEffect(() => {
    if (profile.name) {
      setFullname(profile.name);
    }
  }, [profile]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Сертификаты</h1>
        <p className={styles.description}>
          Здесь вы можете просматривать сертификаты и делиться ими
        </p>
      </div>
      <div className={styles.content}>
        {(Object.keys(profile).length !== 0 && (
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
                  {(fullname && fullname) || 'Неизвестный пользователь'}
                </div>
              )}
              <EditFragment name="fullname" />
            </div>
            <div className={cn(styles.desktop, styles.links)}>
              <Link to="/profile">Обзор профиля</Link>
              <Button variant="containedPurple">Сертификаты</Button>
            </div>
          </div>
        )) || (
          <div className={styles.preloaderContainer}>
            <Preloader size="60px" />
          </div>
        )}
        <div className={cn(styles.links, styles.mobile)}>
          <Link to="/profile">Обзор профиля</Link>
          <Button variant="containedPurple">Сертификаты</Button>
        </div>
        <div className={styles.certificates}>
          {(certificates &&
            certificates.map((certificate) => (
              <Certificate key={certificate.id} id={certificate.id} />
            ))) || (
            <div className={styles.preloader}>
              <Preloader size="100px" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
