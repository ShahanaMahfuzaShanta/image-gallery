import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import DragImage from "./DragImage";

const ImageGallery = () => {
    const [selectedImages, setSelectedImages] = useState([]);
  const { refetch, data: images = [] } = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/images`);
      console.log(res?.data);
      return res?.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  // Initialize imageList with the fetched images
  const [imageList, setImageList] = useState(images);

  useEffect(() => {
    setImageList(images); // Update the imageList when images change
  }, [images]);

  const moveImage = (fromIndex, toIndex) => {
    const updatedImageList = [...imageList];
    const [movedImage] = updatedImageList.splice(fromIndex, 1);
    updatedImageList.splice(toIndex, 0, movedImage);
    setImageList(updatedImageList);
  };

  const toggleImageSelection = (imageId) => {
    // Check if the image is already selected, if so, deselect it, otherwise select it
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };
  return (
    <>
    <div className=" p-10 w-[1000px] mx-auto bg-white shadow-lg rounded-lg my-10">
    <div className="flex justify-between">
        <p>{selectedImages.length} Files Selected</p>
        <button>Delete Files</button>
    </div>
      <div className="grid grid-cols-5 gap-5 my-8">
        {imageList?.map((image, index) => (
          <DragImage
          key={image._id}
          image={image}
          index={index}
          moveImage={moveImage}
          isSelected={selectedImages.includes(image._id)}
          toggleImageSelection={() => toggleImageSelection(image._id)}
        />
        ))}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="file" placeholder="file" {...register("file")} />
          <input type="submit" value="Add Images" />
        </form>
      </div>
      </div>
    </>
  );
};

export default ImageGallery;
