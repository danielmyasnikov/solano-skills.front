import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { PDFViewer } from '@components/common/pdfViewer';
import { Preloader } from '@components/mui/preloader';
import styles from './styles.module.less';
import { certificateApi } from '@src/features/certificates/certificates.api';

const CertificatePage = () => {
  const { certificateId } = useParams();
  const history = useHistory();
  const { data, error, isLoading } = certificateApi.useGetCertificateQuery(certificateId);

  useEffect(() => {
    if (error) history.push('/notFound');
  }, []);

  return (
    <div className={styles.wrapper}>
      {(!isLoading && <PDFViewer src={data.url} />) || (
        <div className={styles.preloader}>
          <Preloader size="100px" />
        </div>
      )}
    </div>
  );
};

export default CertificatePage;
