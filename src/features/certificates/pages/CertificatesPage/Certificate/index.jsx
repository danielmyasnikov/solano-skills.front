import React, { useState } from 'react';
import certificateImg from '@assets/certificate.png';
import { DownloadIcon } from '@assets/DownloadIcon';
import { ShareIcon } from '@assets/ShareIcon';
import styles from './styles.module.less';
import { Tooltip } from '@mui/material';

const Certificate = ({ id, pdfUrl, jpfUrl }) => {
  const [value, setValue] = useState('Нажмите, чтобы скопировать');

  const copyToClipboard = async () => {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(
        `${window.location.origin.toString()}/certificates/${id}`,
      );
    } else {
      document.execCommand('copy', true, `${window.location.origin.toString()}/certificates/${id}`);
    }
    setValue('Ссылка успешна скопирована !');
  };

  return (
    <div className={styles.sertificate}>
      <div className={styles.img}>
        <img src={jpfUrl || certificateImg} />
      </div>
      <div className={styles.settings}>
        {/*
          <Link to={`/certificates/${id}`}>
            <ZoomIcon />
          </Link>
        */}
        <a href={pdfUrl} download target="_blank">
          <DownloadIcon />
        </a>
        <Tooltip title={value}>
          <span onClick={copyToClipboard}>
            <ShareIcon />
          </span>
        </Tooltip>
      </div>
    </div>
  );
};

export default Certificate;
