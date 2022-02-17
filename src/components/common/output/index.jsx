import React, { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { compileShell, startKernel } from '@store/terminal/actions';
import { selectTerminal } from '@store/terminal/selector';

import { PDFViewer } from '../pdfViewer';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import styles from './styles.module.less';
import cn from 'classnames';

const Output = ({ variant, presentation_url }) => {
  const [activeTab, setActiveTab] = useState('output');
  const [lineNumber, setLineNumber] = useState(1);
  const [code, setCode] = useState('');

  const { exerciseId } = useParams();

  const terminal = useSelector(selectTerminal);

  const dispatch = useDispatch();

  const memoOutputs = useMemo(() => {
    return terminal.outputs.map((item, i) => (
      <React.Fragment key={i}>
        <span className={styles[item.status]}>
          {(item.status === 'error' && item.error) || item.output}
        </span>
      </React.Fragment>
    ))
  }, [terminal.outputs])

  const onSubmit = (e) => {
    if (e.keyCode === 13) {
      dispatch(
        compileShell({
          code: code,
          exerciseId: exerciseId,
          lineNumber: lineNumber,
          kernelId: terminal.kernelId,
        }),
      );
      setLineNumber(lineNumber + 1);
      setCode('');
    }
  };

  useEffect(() => {
    dispatch(startKernel(exerciseId));
  }, [exerciseId]);

  return (
    <div className={styles.outputWrapper}>
      <div className={cn(styles.terminalHeader, styles.outputHeader)}>
        <div
          onClick={() => setActiveTab('output')}
          className={cn((activeTab === 'output' && styles.tabActive) || '', styles.tab)}
        >
          Консоль
        </div>
        <div
          onClick={() => setActiveTab('slides')}
          className={cn((activeTab === 'slides' && styles.tabActive) || '', styles.tab)}
        >
          Слайды
        </div>
      </div>
      <div className={styles[variant]}>
        {
          (
            activeTab === 'slides' && <PDFViewer src={presentation_url} />
          )
          || (
            <>
              {memoOutputs}
              <div className={styles.shell}>
                <span>In [{lineNumber}]:</span>
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  type="text"
                  onKeyDown={onSubmit}
                />
              </div>
            </>
          )
        }
      </div>

    </div >
  );
};

export default Output;
