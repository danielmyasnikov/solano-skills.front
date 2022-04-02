import styles from './styles.module.less';
import { useDispatch, useSelector } from 'react-redux';
import { selectBaskets } from '@src/features/exercises/store/selectors';
import { Basket } from './Basket';
import { Button } from '@mui/material';
import { useState } from 'react';
import { selectIsAuth } from '@store/profile/selector';
import { DragDropContext } from 'react-beautiful-dnd';
import { exerciseSlice } from '@src/features/exercises/store/slices/exercise.slice';
import { openSignUpModal } from '@store/global/modals';

const MultipleRanging = () => {
  const dispatch = useDispatch();

  const data = useSelector(selectBaskets);
  const isAuth = useSelector(selectIsAuth);

  const [isDraggable, setIsDraggable] = useState(true);
  const [baskets, setBaskets] = useState(data);

  function onDragEnd(result) {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceBasket = baskets.find((e) => e.id === source.droppableId);
      const destBasket = baskets.find((e) => e.id === destination.droppableId);
      const sourceItems = [...sourceBasket.items];
      const destItems = [...destBasket.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setBaskets(
        baskets.map((e) => {
          if (e.id === source.droppableId) {
            return {
              ...sourceBasket,
              items: sourceItems,
            };
          }
          if (e.id === destination.droppableId) {
            return {
              ...destBasket,
              items: destItems,
            };
          }
          return e;
        }),
      );
    } else {
      const basket = baskets.find((e) => e.id === source.droppableId);
      const copiedItems = [...basket.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setBaskets(
        baskets.map((e) => {
          if (e.id === destination.droppableId) {
            return {
              ...basket,
              items: copiedItems,
            };
          }
          return e;
        }),
      );
    }
  }

  function checkAnswer() {
    setIsDraggable(false);
    let error = false;
    console.log(baskets);
    setBaskets(
      baskets.map((basket) => ({
        ...basket,
        items: basket.items.map((e) => {
          if (basket.id !== e.basketId) {
            error = true;
            return {
              ...e,
              isError: true,
            };
          }
          return {
            ...e,
            isError: false,
          };
        }),
      })),
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
        <DragDropContext onDragStart={() => setIsDraggable(true)} onDragEnd={onDragEnd}>
          {baskets.map((basket) => {
            if (basket.isMain) {
              return (
                <div key={basket.id} className={styles.mainBasketWrapper}>
                  <Basket {...basket} isDraggable={isDraggable} />
                </div>
              );
            }

            return (
              <div key={basket.id} style={{ width: `${100 / (baskets.length - 1)}%` }}>
                <Basket {...basket} isDraggable={isDraggable} />
              </div>
            );
          })}
        </DragDropContext>
      </div>
      <div className={styles.actions}>
        <Button variant="containedPurple" onClick={checkAnswer}>
          Ответить
        </Button>
      </div>
    </div>
  );
};

export default MultipleRanging;
