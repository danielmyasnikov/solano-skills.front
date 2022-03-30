import Button from '@components/mui/button';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import styles from './styles.module.less';
import { useSelector } from 'react-redux';
import { selectBaskets } from '@src/features/exercises/store/selectors';
import { Basket } from '@src/features/exercises/views/Simple/Stack/Ranging/Basket';

const Ranging = () => {
  const baskets = useSelector(selectBaskets);

  const [items, setItems] = useState([]);
  const [groups, setGroups] = useState({});

  useEffect(() => {
    buildAndSave(baskets);
  }, []);

  function buildAndSave(items) {
    const groups = {};
    for (let i = 0; i < Object.keys(items).length; ++i) {
      const currentGroup = items[i];
      groups[currentGroup.id] = i;
    }

    setItems(items);

    setGroups(groups);
  }

  return (
    <div className={styles.layout}>
      <div className={styles.baskets}>
        <DragDropContext
          onDragEnd={(result) => {
            const { destination, source, type } = result;

            if (!destination) {
              return;
            }

            if (
              destination.droppableId === source.droppableId &&
              destination.index === source.index
            ) {
              return;
            }

            if ('group' === type) {
              const sourceIndex = source.index;
              const targetIndex = destination.index;

              const workValue = items.slice();
              const [deletedItem] = workValue.splice(sourceIndex, 1);
              workValue.splice(targetIndex, 0, deletedItem);

              buildAndSave(workValue);

              return;
            }

            const sourceDroppableIndex = groups[source.droppableId];
            const targetDroppableIndex = groups[destination.droppableId];
            const sourceItems = items[sourceDroppableIndex].items.slice();
            const targetItems =
              source.droppableId !== destination.droppableId
                ? items[targetDroppableIndex].items.slice()
                : sourceItems;

            const [deletedItem] = sourceItems.splice(source.index, 1);
            targetItems.splice(destination.index, 0, deletedItem);

            const workValue = items.slice();
            workValue[sourceDroppableIndex] = {
              ...items[sourceDroppableIndex],
              items: sourceItems,
            };
            workValue[targetDroppableIndex] = {
              ...items[targetDroppableIndex],
              items: targetItems,
            };

            setItems(workValue);
          }}
        >
          <Droppable droppableId="ROOT" type="group">
            {(rootProvided) => (
              <div {...rootProvided.droppableProps} ref={rootProvided.innerRef}>
                {items.map((item, index) => {
                  const component = (
                    <Draggable draggableId={item.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Basket {...item} />
                        </div>
                      )}
                    </Draggable>
                  );

                  if (item.isMain) {
                    return (
                      <div key={item.id} className={styles.mainBasketWrapper}>
                        {component}
                      </div>
                    );
                  }

                  return (
                    <div key={item.id} style={{ width: `${100 / (items.length - 1)}%` }}>
                      {component}
                    </div>
                  );
                })}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className={styles.actions}>
        <Button
          variant="containedPurple"
          onClick={() => {
            // checkAnswer(baskets);
          }}
        >
          Ответить
        </Button>
      </div>
    </div>
  );
};

export default Ranging;
