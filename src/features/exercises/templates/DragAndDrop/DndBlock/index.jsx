import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Button from '@components/mui/button';
import Basket from '../Basket';
import styles from './styles.module.less';

const DndBlock = ({ variant, initBaskets, initStatements, checkAnswer }) => {
  const [baskets, setBaskets] = useState(
    initBaskets.map((basket) => {
      if (basket.is_main) {
        basket.statements = initStatements;
        return basket;
      } else return basket;
    }),
  );

  const onDragHandler = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index)
      return;

    const sourceBasketIndex = baskets.findIndex((e) => e.id === source.droppableId);
    const destinationBasketIndex = baskets.findIndex((e) => e.id === destination.droppableId);

    const sourceBasket = baskets[sourceBasketIndex];
    const destinationBasket = baskets[destinationBasketIndex];

    const sourceStatements = sourceBasket.statements;
    const destinationStatements = destinationBasket.statements;
    const [removed] = sourceStatements.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceStatements.splice(destination.index, 0, removed);
    } else {
      destinationStatements.splice(destination.index, 0, removed);
    }

    setBaskets(baskets);
  };

  return (
    <DragDropContext onDragEnd={onDragHandler}>
      <Basket
        key={baskets[0].id}
        variant={variant}
        bascketInfo={baskets.filter((basket) => basket.is_main)[0]}
      />
      {baskets.length > 1 && (
        <div className={styles.dnd}>
          {baskets
            .filter((basket) => !basket.is_main)
            .map((basket) => (
              <Basket key={basket.id} variant={'common_basket'} bascketInfo={basket} />
            ))}
        </div>
      )}
      <div className={styles.checkAnswerBtn}>
        <Button
          variant="containedPurple"
          onClick={() => {
            checkAnswer(baskets);
          }}
        >
          Ответить
        </Button>
      </div>
    </DragDropContext>
  );
};

export default DndBlock;
