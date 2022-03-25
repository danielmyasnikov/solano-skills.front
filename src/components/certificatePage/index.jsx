import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { PDFViewer } from '@components/common/pdfViewer';
import { Preloader } from '../mui/preloader';
import styles from './styles.module.less';
import { getCertificate } from '@store/api/certificate';

export const CertificatePage = () => {
  const [url, setUrl] = useState('');
  const { certificateId } = useParams();
  const history = useHistory();

  const asyncGetCertificate = async () => {
    const res = await getCertificate(certificateId);
    res.error ? history.push('/notFound') : setUrl(res.data.url);
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
