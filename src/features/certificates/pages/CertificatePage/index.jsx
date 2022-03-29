import { Redirect, useParams } from 'react-router';
import { PDFViewer } from '@components/common/pdfViewer';
import { Preloader } from '@components/mui/preloader';
import styles from './styles.module.less';
import { useGetCertificateQuery } from '@src/features/certificates/certificates.api';

const CertificatePage = () => {
  const { certificateId } = useParams();
  const { data, error, isLoading } = useGetCertificateQuery(certificateId);

  if (error) {
    return <Redirect to="/404" />;
  }

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <div className={styles.preloader}>
          <Preloader size="100px" />
        </div>
      ) : (
        <PDFViewer src={data.url.pdf} />
      )}
    </div>
  );
};

export default CertificatePage;
