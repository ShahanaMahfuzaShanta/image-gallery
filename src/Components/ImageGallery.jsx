import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import DragImage from "./DragImage";

const ImageGallery = () => {
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
  return (
    <>
      <div className="grid grid-cols-5 gap-5 p-10 w-[1000px] mx-auto bg-white shadow-lg rounded-lg my-10">
        {imageList?.map((image, index) => (
          <DragImage
            key={image._id}
            image={image}
            index={index}
            moveImage={moveImage}
          />
        ))}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="file" placeholder="file" {...register("file")} />
          <input type="submit" value="Add Images" />
        </form>
      </div>
    </>
  );
};

export default ImageGallery;
