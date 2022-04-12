import { useRef, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { compileShell, startKernel } from '../../store/actions/terminal.actions';
import { selectTerminal } from '../../store/selectors/terminal.selector';

import { PDFViewer } from '@components/common/pdfViewer';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import styles from './styles.module.less';
import cn from 'classnames';
import { styled } from '@mui/material/styles';
import { Box, TextareaAutosize } from '@mui/material';
import { selectRootExercise } from '@src/features/exercises/store/selectors/exercises.selectors';
import { selectCurrentExercise } from '@src/features/exercises/store/selectors/exercise.selectors';
import { Plot } from '@src/features/exercises/Stack/Plot';
import { useShell } from '@src/features/exercises/hooks/useShell';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Placeholder = styled(Box)`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 18px;
  z-index: 100;
  background-color: rgb(0 0 0 / 15%);
  backdrop-filter: blur(2px);
`;

const Separator = styled(Box)`
  width: 2px;
  min-height: 44px;

  background-color: #2c2a3f;
`;

const FolderIcon = styled(Box)`
  display: flex;
  align-items: center;

  margin-left: auto;

  height: 100%;
  width: auto;

  cursor: pointer;
`;

const IconWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 16px;
  margin-left: 14px;
  margin-bottom: -4px;

  &.left {
    margin: 0;
  }

  &.open {
    margin-left: 10px;
  }

  width: 24px;
  height: 24px;
`;

const Output = ({ variant }: any) => {
  const dispatch = useDispatch();

  const ref = useRef(null);

  const terminal = useSelector(selectTerminal);
  const rootExercise = useSelector(selectRootExercise);
  const exercise = useSelector(selectCurrentExercise);

  const [folded, setFolded] = useState(false);
  const [activeTab, setActiveTab] = useState('output');

  const { acceptInput, onChange, code, line } = useShell({
    ref,
    isMulti: exercise.multy_console,
    submitCallback: ({ code, line }: any) => {
      dispatch(
        compileShell({
          code,
          exerciseId: exercise?.id,
          lineNumber: line,
          kernelId: terminal.kernelId,
          isGraphRequired: false,
        }),
      );
    },
  });

  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rootExercise) {
      dispatch(startKernel(rootExercise.id));
    }
  }, [rootExercise]);

  useEffect(() => {
    if (terminal.status === 'success') {
      // @ts-ignore
      ref.current?.focus();
    }
    if (terminal.bytePayload.length > 0) {
      setActiveTab('plots');
    }
    if (outputRef.current && terminal.outputs) {
      outputRef.current?.scroll({ top: outputRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [terminal]);

  return (
    <div
      className={cn(
        styles.outputWrapper,
        {
          [styles.fullHeight]: variant === 'quizOutputContainer',
        },
        {
          [styles.folded]: folded,
        },
      )}
    >
      <div className={cn(styles.terminalHeader, styles.outputHeader)}>
        <div
          onClick={() => setActiveTab('output')}
          className={cn({ [styles.tabActive]: activeTab === 'output' }, styles.tab)}
        >
          Консоль
        </div>
        <div
          onClick={() => setActiveTab('slides')}
          className={cn({ [styles.tabActive]: activeTab === 'slides' }, styles.tab)}
        >
          Слайды
        </div>
        {terminal.bytePayload.length > 0 && exercise.is_graph_required && (
          <div
            onClick={() => setActiveTab('plots')}
            className={cn({ [styles.tabActive]: activeTab === 'plots' }, styles.tab)}
          >
            Графики
          </div>
        )}

        <FolderIcon onClick={() => setFolded(!folded)}>
          <Separator />
          <IconWrapper>
            <svg
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
              style={
                folded
                  ? {
                      transform: 'rotate(180deg)',
                      marginBottom: '2.5px',
                    }
                  : {}
              }
            >
              <path
                d="M1.88 0.453125L8 6.55979L14.12 0.453125L16 2.33312L8 10.3331L0 2.33312L1.88 0.453125Z"
                fill="white"
              />
            </svg>
          </IconWrapper>
        </FolderIcon>
      </div>
      {!folded && (
        <div
          className={styles[variant]}
          style={{
            position: 'relative',
          }}
        >
          {!terminal.kernelId && <Placeholder />}
          <div
            ref={outputRef}
            className={cn(styles.content, { [styles.hide]: activeTab !== 'output' })}
          >
            {terminal.outputs.map((item: any, i) => {
              if (!item || (!item.output && !item.error)) {
                return null;
              }

              return (
                <div
                  key={i}
                  className={cn(styles.terminalLine, { [styles.shell]: item.status === 'shell' })}
                  dangerouslySetInnerHTML={{ __html: item.error || item.output }}
                />
              );
            })}
            <div className={styles.shell}>
              <span>In [{line}]:</span>
              <div className={styles.shellInput}>
                {exercise.multy_console ? (
                  <TextareaAutosize
                    ref={ref}
                    value={code}
                    onChange={onChange}
                    onKeyDown={acceptInput}
                    disabled={terminal.status === 'loading'}
                  />
                ) : (
                  <input
                    ref={ref}
                    value={code}
                    onChange={onChange}
                    type="text"
                    onKeyDown={acceptInput}
                    disabled={terminal.status === 'loading'}
                  />
                )}
              </div>
            </div>
          </div>

          <PDFViewer src={exercise?.presentation_url} hide={activeTab !== 'slides'} />

          <Plot hide={activeTab !== 'plots'} />
        </div>
      )}
    </div>
  );
};

export default Output;
