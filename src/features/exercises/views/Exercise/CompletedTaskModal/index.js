import styles from './styles.module.less';
import Complete from '@assets/Complete';
import Close from '@assets/Close.png';
import { useSelector } from 'react-redux';
import {
  selectRootExercise,
  selectRootExerciseType,
  selectSteps,
} from '@src/features/exercises/store/selectors/exercises.selectors';
import { selectExerciseContext } from '@src/features/exercises/store/selectors/exercise.selectors';
import { Button, Rating } from '@mui/material';

const CompletedTaskModal = ({ onClick, onClose }) => {
  const rootExercise = useSelector(selectRootExercise);
  const { xp, exercise } = useSelector(selectExerciseContext);
  const type = useSelector(selectRootExerciseType);
  const { totalXp } = useSelector(selectSteps);

  const value = type === 'bullet_point_exercise' ? totalXp : xp;
  const max =
    type === 'bullet_point_exercise'
      ? rootExercise.nested_exercises
          .map((e) => e.xp)
          .reduce((accumulator, curr) => accumulator + curr)
      : exercise.xp;

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <img src={Close} className={styles.closeModal} onClick={onClose} />
        <Complete />
        <span className={styles.xp}>{value !== 0 ? `+${value} XP` : `${value} XP`}</span>
        <div className={styles.rating}>
          <Rating readOnly value={(5 * value) / max} />
        </div>
        <span className={styles.title}>
          {exercise.correct_message || 'Отлично!\nВы выполнили задание!'}
        </span>
        <span className={styles.dis}>Нажмите кнопку ниже</span>
        <Button onClick={onClick} variant="containedWhite">
          Следующее упражнение
        </Button>
      </div>
    </div>
  );
};

export default CompletedTaskModal;
