import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";

const DragImage = ({ image, index, moveImage, isSelected, toggleImageSelection }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

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

  const toggleChecked = () => {
    setIsChecked(!isChecked)
    toggleImageSelection(); // Toggle the selection state when the checkbox is clicked
  };

  return (
    <>
      <div
        ref={(node) => ref(drop(node))}
        className={` ${
          index === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className=" relative">
          {isHovered && (
            <div className="absolute top-3 left-3">
              <button onClick={toggleChecked}>
                {isChecked ? (
                  <GrCheckboxSelected></GrCheckboxSelected>
                ) : (
                  <GrCheckbox></GrCheckbox>
                )}
              </button>
            </div>
          )}
          <img
            className="border-2 rounded-lg cursor-pointer "
            src={image.image}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default DragImage;
