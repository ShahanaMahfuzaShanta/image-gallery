import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { ImCheckboxUnchecked } from "react-icons/im";
import { AiFillCheckSquare } from "react-icons/ai";

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
    // Toggle the selection state when the checkbox is clicked
    toggleImageSelection(); 
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
            <div className="absolute top-0 left-0 w-full h-full bg-gray-400 opacity-60 rounded-lg cursor-pointer"></div>
          )}
          {isChecked && (
            <>
            <div className="absolute top-0 left-0 w-full h-full bg-gray-200 opacity-60 rounded-lg cursor-pointer"></div>
            <div className="absolute top-3 left-3">
              <button onClick={toggleChecked}>
                <AiFillCheckSquare className="text-blue-600 text-xl" />
              </button>
            </div>
            </>
          )}
          {isHovered && !isChecked && (
            <div className="absolute top-3 left-3">
              <button className="bg-white text-white rounded-md" onClick={toggleChecked}>
                <ImCheckboxUnchecked />
              </button>
            </div>
          )}
          <img
            className="border-2 rounded-lg shadow-md shadow-blue-100"
            src={image.image}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default DragImage;
