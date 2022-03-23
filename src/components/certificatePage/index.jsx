import React, { useState, useEffect } from 'react';
import { PDFViewer } from '@components/common/pdfViewer';
import { Preloader } from '../mui/preloader';
import styles from './styles.module.less';
import { getCertificate } from '@store/api/certificate';

export const CertificatePage = () => {
  const [url, setUrl] = useState('');

  const asyncGetCertificate = async () => {
    const cid = localStorage.getItem('cid');
    setUrl(await getCertificate(cid));
    localStorage.removeItem('cid');
  };

  useEffect(() => {
    asyncGetCertificate();
  }, []);

  return (
    <div className={styles.wrapper}>
      {(url && <PDFViewer src={url} />) || (
        <div className={styles.preloader}>
          <Preloader size="100px" />
        </div>
      )}
    </div>
  );
};
