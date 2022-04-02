import styles from './styles.module.less';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBaskets,
  selectExerciseContext,
  selectOrderIds,
} from '@src/features/exercises/store/selectors';
import { Button } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import cn from 'classnames';
import { openSignUpModal } from '@store/global/modals';
import { exerciseSlice } from '@src/features/exercises/store/slices/exercise.slice';
import { selectIsAuth } from '@store/profile/selector';

const SingleRanging = () => {
  const dispatch = useDispatch();

  const baskets = useSelector(selectBaskets);

  const { completed } = useSelector(selectExerciseContext);

  const [isDraggable, setIsDraggable] = useState(true);
  const [items, setItems] = useState(baskets[0].items);

  const orderIds = useSelector(selectOrderIds);
  const isAuth = useSelector(selectIsAuth);

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const newItems = [...items];
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setItems(newItems);
  }

  function checkAnswer() {
    setIsDraggable(false);
    let error = false;
    let n = 1;
    const answers = orderIds.split(',');

    setItems(
      items.map((e) => {
        const id = e.id.replace('item-', '');
        const answerId = answers[n - 1];
        if (Number(id) !== Number(answerId)) {
          error = true;
          n += 1;
          return {
            ...e,
            isError: true,
          };
        }
        n += 1;
        return {
          ...e,
          isError: false,
        };
      }),
    );

    if (!error) {
      if (isAuth) {
        dispatch(exerciseSlice.actions.onComplete(undefined));
      } else {
        dispatch(openSignUpModal());
      }
    }
  }

  return (
    <div className={styles.layout}>
      <div className={styles.baskets}>
        <div className={styles.basket}>
          <h5 className={styles.title}>{baskets[0].label}</h5>
          <DragDropContext onDragStart={() => setIsDraggable(true)} onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={styles.dropZone}
                >
                  {items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(itemProvider, itemSnapshot) => (
                        <div
                          ref={itemProvider.innerRef}
                          {...itemProvider.draggableProps}
                          {...itemProvider.dragHandleProps}
                          className={cn(styles.card, {
                            [styles.error]: !isDraggable && item.isError,
                          })}
                        >
                          <p>{item.label}</p>
                          {isDraggable ? (
                            <svg
                              aria-label="bars icon"
                              fill="currentColor"
                              height="16"
                              role="Img"
                              width="16"
                              viewBox="0 0 18 18"
                              style={{ opacity: 0.3 }}
                            >
                              <path d="M18 14.75v1.5c0 .2-.07.38-.22.53a.72.72 0 01-.53.22H.75a.72.72 0 01-.53-.22.72.72 0 01-.22-.53v-1.5c0-.2.07-.38.22-.53A.72.72 0 01.75 14h16.5c.2 0 .38.07.53.22.15.15.22.33.22.53zm0-6v1.5c0 .2-.07.38-.22.53a.72.72 0 01-.53.22H.75a.72.72 0 01-.53-.22.72.72 0 01-.22-.53v-1.5c0-.2.07-.38.22-.53A.72.72 0 01.75 8h16.5c.2 0 .38.07.53.22.15.15.22.33.22.53zm0-6v1.5c0 .2-.07.38-.22.53a.72.72 0 01-.53.22H.75a.72.72 0 01-.53-.22.72.72 0 01-.22-.53v-1.5c0-.2.07-.38.22-.53A.72.72 0 01.75 2h16.5c.2 0 .38.07.53.22.15.15.22.33.22.53z" />
                            </svg>
                          ) : (
                            <>
                              {item.isError ? (
                                <svg
                                  aria-label="error icon"
                                  fill="currentColor"
                                  height="16"
                                  role="Img"
                                  width="16"
                                  viewBox="0 0 18 18"
                                  style={{ color: 'var(--error-red)' }}
                                >
                                  <path
                                    d="M9 18A9 9 0 119 0a9 9 0 010 18zm0-1.837A7.163 7.163 0 109 1.837a7.163 7.163 0 000 14.326zM5.892 7.25a.959.959 0 011.356-1.356l1.808 1.809 1.809-1.809A.959.959 0 0112.22 7.25l-1.809 1.809 1.809 1.808a.959.959 0 11-1.356 1.356l-1.809-1.809-1.808 1.809a.959.959 0 01-1.356-1.356L7.7 9.059 5.891 7.25z"
                                    fillRule="evenodd"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  aria-label="checkmark_circle icon"
                                  fill="currentColor"
                                  height="16"
                                  role="Img"
                                  width="16"
                                  viewBox="0 0 18 18"
                                  style={{ color: 'var(--color-green)' }}
                                >
                                  <path
                                    d="M9 18A9 9 0 119 0a9 9 0 010 18zm0-1.837A7.163 7.163 0 109 1.837a7.163 7.163 0 000 14.326zM6.655 8.672l1.247 1.559 3.683-4.093A1.011 1.011 0 1113.09 7.49l-4.48 4.978a1.011 1.011 0 01-1.542-.045L5.076 9.935a1.011 1.011 0 111.579-1.263z"
                                    fillRule="evenodd"
                                  />
                                </svg>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
      <div className={styles.actions}>
        <Button variant="containedPurple" onClick={checkAnswer} disabled={completed}>
          Ответить
        </Button>
      </div>
    </div>
  );
};

export default SingleRanging;
