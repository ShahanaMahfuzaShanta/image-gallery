import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import DragImage from "./DragImage";
import { BsImage } from "react-icons/bs";

const ImageGallery = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Using react query (tanstack query) to fetch data from server
  const { refetch, data: images = [] } = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/images`);
      console.log(res?.data);
      return res?.data;
    },
  });

  // Initialize imageList with the fetched images
  const [imageList, setImageList] = useState(images);

  useEffect(() => {
    // Update the imageList when images change
    setImageList(images); 
  }, [images]);

  const moveImage = (fromIndex, toIndex) => {
    const updatedImageList = [...imageList];
    const [movedImage] = updatedImageList.splice(fromIndex, 1);
    updatedImageList.splice(toIndex, 0, movedImage);
    setImageList(updatedImageList);
  };

  const toggleImageSelection = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
      console.log(imageId)
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  const onSubmit = (data) => {
    //console.log(data);
  //console.log(errors);
}

  const deleteSelectedImages = () => {
    // Remove the selected images from the imageList
    const updatedImageList = imageList.filter(
      (image) => !selectedImages.includes(image._id)
    );
    setImageList(updatedImageList);
    // Clear the selected images
    setSelectedImages([]);
  };
  return (
    <>
      <div className="py-5 w-[300px] md:w-[700px] lg:w-[1000px] mx-auto bg-white shadow-lg rounded-lg my-10">
        <div className=" px-5 lg:px-10 text-lg md:text-xl lg:text-2xl font-bold flex justify-between">
          {selectedImages.length > 0 ? (
            <>
              <div>
                {selectedImages.length === 1 ? (
                  <p>{selectedImages.length} File Selected</p>
                ) : (
                  <p>{selectedImages.length} Files Selected</p>
                )}
              </div>
              <button className="text-red-600 text-sm md:text-lg" onClick={deleteSelectedImages}>{selectedImages.length === 1 ? (
                  <span>Delete File</span>
                ) : (
                  <span>Delete Files</span>
                )}</button>
            </>
          ) : (
            <p>Gallery</p>
          )}
        </div>
          <div className=" divider" />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-7 my-8 px-5 lg:px-10 ">
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
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className=" relative">
                <div
                  className={`border-2 border-dotted rounded-lg h-28 md:h-[150px] lg:h-[165px] border-gray-300 flex items-center justify-center relative mx-auto`}
                >
                  <div className="icon absolute top-8 right-15">
                    <BsImage />
                  </div>
                  <input
                    type="file"
                    className="opacity-0 w-full h-full absolute top-0 left-0 cursor-pointer"
                    {...register("image", { required: true })}
                  />
                </div>
                <input
                  type="submit"
                  value="Add Images"
                  className=" absolute top-12 left-4 md:left-8 lg:left-10"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageGallery;
