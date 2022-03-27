import { Droppable, Draggable } from 'react-beautiful-dnd';
import cn from 'classnames';
import usePagination from '@mui/material/usePagination';
import styles from './styles.module.less';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const Statement = styled(Box)`
  padding: 10px;
  background: var(--very-light-gray);
  border-radius: 6px;
  font-family: 'Nunito';
  font-size: 20px;
  height: min-content;
  margin-bottom: 10px;
`;

const Basket = ({ variant, basketInfo }) => {
  const { items } = usePagination({
    count: basketInfo.statements.length,
  });

  return (
    <div className={cn(styles.basketWrap, styles[variant])}>
      <div className={styles.basketWrap__title}>{basketInfo.title}</div>
      <Droppable key={basketInfo.id} droppableId={basketInfo.id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            className={cn(styles.basket, styles[variant])}
            ref={provided.innerRef}
          >
            {basketInfo.statements.map(({ id, basketId, text, errorMessage }, i) => (
              <Draggable key={id} draggableId={id} index={i}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      opacity: (snapshot.isDragging && '0.5') || '1',
                    }}
                    // className={cn({ [styles.hidden]: id !== currentStatement.id })}
                  >
                    <Statement>{text}</Statement>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {variant === 'multiple_basket' && (
        <>
          <ul className={styles.pagination}>
            {items.map(({ page, type, selected, ...item }, index) => {
              let children = null;
              if (type === 'previous') {
                children = <p {...item}>{'Предыдущее'}</p>;
              }
              if (type === 'next') {
                children = <p {...item}>{'Следующее'}</p>;
              }
              return (
                <li className={styles.pagination__item} key={index}>
                  {children}
                </li>
              );
            })}
          </ul>
          <div className={styles.statementsCount}>
            {basketInfo.statements.length} утверждений осталось
          </div>
        </>
      )}
    </div>
  );
};

export default Basket;
