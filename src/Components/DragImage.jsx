import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const DragImage = ({ image, index, moveImage }) => {
    console.log(image)
    const [, ref] = useDrag({
        type: ItemTypes.IMAGE,
        item: { index },
      });
    
      const [, drop] = useDrop({
        accept: ItemTypes.IMAGE,
        hover: (draggedItem) => {
          if (draggedItem.index !== index) {
            moveImage(draggedItem.index, index);
            draggedItem.index = index;
          }
        },
      });
    return (
        <div ref={(node) => ref(drop(node))} className={index===0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}>
      <img className="border-2 rounded-lg" src={image.image} alt="" />
    </div>
    );
};

export default DragImage;