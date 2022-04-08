import { BasePresentationURL } from './constants';

import styles from './styles.module.less';
import cn from 'classnames';

export const PDFViewer = ({ src, hide }) => {
  return (
    <div className={cn(styles.pdfViewerContainer, { [styles.hide]: hide })}>
      <iframe
        className={styles.pdfViewer}
        frameBorder="0"
        src={src || BasePresentationURL}
        title="PDFViewer"
      ></iframe>
    </div>
  );
};
