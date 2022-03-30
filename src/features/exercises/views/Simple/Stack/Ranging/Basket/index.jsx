import { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import styles from '@src/features/exercises/views/Simple/Stack/Ranging/styles.module.less';

export const Basket = ({ id, items, label, isMain }) => {
  const [page, setPage] = useState(1);

  const next = () => {
    setPage(page === items.length ? 1 : page + 1);
  };
  const prev = () => {
    setPage(page === 1 ? items.length : page - 1);
  };
  const getIndex = () => {
    let newPage = page;
    if (page > items.length) {
      newPage = items.length;
      setPage(items.length);
    }
    return newPage - 1;
  };

  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className={styles.basket}>
          <h5 className={styles.title}>{label}</h5>
          <div className={styles.content}>
            {items.length > 0 ? (
              <>
                {isMain ? (
                  <Draggable draggableId={items[getIndex()].id} index={0}>
                    {(provided) => (
                      <div
                        className={styles.card}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <p>{items[getIndex()].label}</p>
                      </div>
                    )}
                  </Draggable>
                ) : (
                  <ul>
                    {items.map((item, index) => (
                      <li key={item.id}>
                        <Draggable draggableId={item.id} index={index}>
                          {(provided) => (
                            <div
                              className={styles.card}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <p>{item.label}</p>
                            </div>
                          )}
                        </Draggable>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <p>Перетащите карточки сюда</p>
            )}
          </div>
          {isMain && items.length > 1 && (
            <div className={styles.pagination}>
              <button onClick={prev}>
                <svg viewBox="0 0 18 18" aria-hidden="false" height="14" role="img" width="14">
                  <title>Left Arrow</title>
                  <path
                    fill="#FFFFFF"
                    d="M4.42 8L16 7.998a1 1 0 010 2L4.41 10l3.285 3.296a.998.998 0 11-1.417 1.41l-4.93-4.948A.998.998 0 011.36 8.23l4.933-4.938a1 1 0 011.414 0c.39.391.39 1.025 0 1.416L4.42 7.999z"
                    fillRule="evenodd"
                  />
                </svg>
              </button>
              <span>
                {page}/{items.length}
              </span>
              <button onClick={next}>
                <svg viewBox="0 0 18 18" aria-hidden="false" height="14" role="img" width="14">
                  <title>Right Arrow</title>
                  <path
                    fill="#FFFFFF"
                    d="M13.58 10L2 10.002a1 1 0 010-2L13.59 8l-3.285-3.296a.998.998 0 111.417-1.41l4.93 4.948a.998.998 0 01-.012 1.527l-4.933 4.938a1 1 0 01-1.414 0 1.002 1.002 0 010-1.416l3.287-3.29z"
                    fillRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </Droppable>
  );
};
