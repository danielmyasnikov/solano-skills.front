import React, { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import * as AuthStore from '@store/auth';
import { selectIsAuth, selectProfile } from '@store/profile/selector';
import { patchProfile } from '@store/profile/actions';
import { useGetCertificatesQuery } from '@src/features/certificates/certificates.api';

import Certificate from './Certificate';
import Button from '@components/mui/button';
import { Avatar } from '@components/profile/Avatar';

import Edit from '@assets/Edit';
import DefaultAvatar from '@assets/defaultUserAvatarBig.png';

import cn from 'classnames';

import styles from './styles.module.less';
import { Preloader } from '@components/mui/preloader';
import { Grid } from '@mui/material';
import { Redirect } from 'react-router';

const CertificatesPage = () => {
  const fullnameRef = useRef();
  const [activeEditField, setActiveEditField] = useState('');
  const [fullname, setFullname] = useState('');
  const [isFullnameActive, setIsFullnameActive] = useState(false);
  const { data: certificates, isLoading, error } = useGetCertificatesQuery();

  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);
  const { headers } = useSelector(AuthStore.Selectors.getAuth);
  const profile = useSelector(selectProfile);

  const saveProfile = () => {
    setIsFullnameActive(false);
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

  useEffect(() => {
    if (profile.name) {
      setFullname(profile.name);
    }
  }, [profile]);

  if (!isAuth) {
    return <Redirect to="/courses" />;
  }

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
          {isLoading ? (
            <div className={styles.preloader}>
              <Preloader size="100px" />
            </div>
          ) : (
            <Grid container spacing={4}>
              {error ? (
                <Grid item xl={3} md={4} sm={6} xs={12}>
                  Что-то пошло не так...
                </Grid>
              ) : (
                certificates.map((certificate) => (
                  <Grid key={certificate.id} item xl={3} md={4} sm={6} xs={12}>
                    <Certificate id={certificate.id} pdfUrl={certificate.url} />
                  </Grid>
                ))
              )}
            </Grid>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificatesPage;
