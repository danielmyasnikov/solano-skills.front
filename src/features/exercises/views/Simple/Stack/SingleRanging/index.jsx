import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Button from '@components/mui/button';
import styles from './styles.module.less';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectItems,
  selectMainBasketTitle,
  selectOrderIds,
} from '@src/features/exercises/store/selectors';
import { getItemStyle, getListStyle, reorder } from '@src/features/exercises/utils/dnd';
import { exerciseSlice } from '@src/features/exercises/store/slices/exercise.slice';

const SingleRanging = () => {
  const title = useSelector(selectMainBasketTitle);
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const ids = useSelector(selectOrderIds);

  const onDragEnd = ({ destination, source, draggableId }) => {
    if (!destination) {
      return;
    }

    dispatch(
      exerciseSlice.actions.updateItems({
        sourceIndex: source.index,
        destinationIndex: destination.index,
      }),
    );
  };

  function checkAnswer() {
    const errorIds = [];
    const answerIds = ids.split(',').map((e) => Number(e));
    const itemsIds = items.map((e) => Number(e.id));
    console.log(answerIds);
    console.log(itemsIds);
    for (let i = 0; i < itemsIds.length; i += 1) {
      if (answerIds[i] !== itemsIds[i]) {
        errorIds.push(itemsIds[i]);
      }
    }

    if (errorIds.length > 0) {
      dispatch(exerciseSlice.actions.updateErrorIds(errorIds));
    } else {
      dispatch(exerciseSlice.actions.onComplete({}));
    }
  }

  return (
    <>
      <div className={styles.basketWrapper}>
        <p className={styles.title}>{title}</p>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                className={styles.body}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppablePlaceholder}
                ref={provided.innerRef}
              >
                {items.map(({ id, isError, text, errorMessage }, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={isError ? styles.error : ''}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                      >
                        <div className={styles.itemInner}>
                          <p>{text}</p>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className={styles.actionsWrapper}>
        <Button variant="containedPurple" onClick={checkAnswer}>
          Ответить
        </Button>
      </div>
    </>
  );
};

export default SingleRanging;
