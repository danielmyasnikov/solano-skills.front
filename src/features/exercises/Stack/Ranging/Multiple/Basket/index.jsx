import { useState } from 'react';
import styles from './styles.module.less';
import { Card } from '../Card';
import cn from 'classnames';
import { Droppable } from 'react-beautiful-dnd';

export const Basket = ({ id, items, label, isMain, isDraggable }) => {
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
    <div className={cn(styles.basket, { [styles.isMain]: isMain })}>
      <h5 className={styles.title}>{label}</h5>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className={styles.dropZone}>
            {items.length > 0 ? (
              <>
                {isMain ? (
                  <Card {...items[getIndex()]} index={0} white={isMain} isDraggable={isDraggable} />
                ) : (
                  <ul>
                    {items.map((item, index) => (
                      <li key={item.id}>
                        <Card {...item} index={index} white={isMain} isDraggable={isDraggable} />
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <p>Перетащите карточки сюда</p>
            )}
          </div>
        )}
      </Droppable>
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
  );
};
