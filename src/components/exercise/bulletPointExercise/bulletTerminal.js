import React from 'react';
import styles from './styles.module.less';
import cn from 'classnames';
import Terminal from '@components/common/terminal';
import Output from '@components/common/output';

function BulletTerminal({ exercise, solution, terminal, correct, activeExercise }) {
  return (
    <div className={styles.terminal}>
      <Terminal
        solution={solution}
        sampleCode={exercise?.nested_exercises[activeExercise].sample_code}
        exerciseId={exercise?.nested_exercises[activeExercise].id}
        correct={correct}
        bytePayload={terminal.bytePayload}
        isGraphRequired={exercise?.nested_exercises[activeExercise].is_graph_required}
      />
      <Output
        output={terminal.outputs}
        presentation_url={exercise?.nested_exercises[activeExercise].presentation_url}
        className={styles.outputContainer}
      >
        {terminal.outputs.map((item, i) => (
          <React.Fragment key={i}>
            <span className={styles[item.status]}>
              {item.status === 'error' ? item.error : item.output}
            </span>
          </React.Fragment>
        ))}
      </Output>
    </div>
  );
}

export default BulletTerminal;
