export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const getItemStyle = (isDragging, draggableStyle) => ({
  ...draggableStyle,
  userSelect: 'none',
  padding: '10px',
  background: 'white',
  borderRadius: '6px',
  fontFamily: 'Nunito',
  fontSize: '20px',
  height: 'min-content',
  marginBottom: '10px',

  border: '1px solid rgb(255, 255, 255)',
  boxShadow: 'rgb(0 0 0 / 15%) 0px 1px 3px 0px',
  zIndex: 1,
});

export const getListStyle = (isDraggingOver) => ({});
