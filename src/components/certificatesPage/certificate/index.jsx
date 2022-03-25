import React from 'react';
import { Link } from 'react-router-dom';
import certificateImg from '@assets/certificate.png';
import { ZoomIcon } from '@assets/ZoomIcon';
import { DownloadIcon } from '@assets/DownloadIcon';
import { ShareIcon } from '@assets/ShareIcon';
import styles from './styles.module.less';

const Certificate = ({ id }) => {
  return (
    <div className={styles.sertificate}>
      <img src={certificateImg} />
      <div className={styles.settings}>
        <Link to={`/certificates/${id}`}>
          <ZoomIcon />
        </Link>
        <DownloadIcon />
        <ShareIcon />
      </div>
    </div>
  );
};

export default Certificate;
