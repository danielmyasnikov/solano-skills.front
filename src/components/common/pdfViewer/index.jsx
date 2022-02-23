import { BasePresentationURL } from './constants';

import styles from './styles.module.less';

export const PDFViewer = ({ src }) => (
  <div className={styles.pdfViewerContainer}>
    <iframe
      className={styles.pdfViewer}
      frameBorder="0"
      src={src || BasePresentationURL}
      title="PDFViewer"
    />
  </div>
);
