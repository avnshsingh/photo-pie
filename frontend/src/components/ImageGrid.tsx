import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import useDeleteImageMutation from "../hooks/useDeleteImage";
import toast from "react-hot-toast";

import DeleteIcon from "../assets/images/delete-icon.svg";

export interface Image {
  url: string;
  public_id: string;
  display_name: string;
  original_filename: string;
  _id: string;
  createdAt: string;
}

interface ImageGridProps {
  images: Image[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const queryClient = useQueryClient();

  const openModal = (image: Image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const { mutate, isPending, isError } = useDeleteImageMutation(
    onSuccess,
    onError
  );

  function onSuccess() {
    queryClient.invalidateQueries({ queryKey: ["images"] });
    toast.success("Image deleted successfully", {
      position: "top-right",
      duration: 3000,
    });
    closeModal();
  }
  function onError(error: any) {
    console.error("Upload failed:", error);
  }

  return (
    <div>
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 max-w-7xl mx-auto space-y-4">
        {images.map(image => (
          <div
            key={image._id}
            className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <img
              src={image.url}
              alt={image.display_name}
              className="w-full h-auto max-h-svh object-cover cursor-pointer transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
              onClick={() => openModal(image)}
            />
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
              <p className="text-white text-sm truncate">
                {image.display_name}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="modal-box max-w-3xl w-full">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-1 z-10"
              onClick={closeModal}
            >
              ✕
            </button>
            <img
              src={selectedImage.url}
              alt={selectedImage.display_name}
              className="w-full h-full max-h-[80vh] object-contain mt-2 rounded-xl"
            />
            <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
              <div className="flex items-center gap-x-2">
                <p className="text-base text-accent font-medium">
                  Uploaded on:
                </p>
                <p className="text-base text-primary-content font-medium">
                  {new Date(selectedImage?.createdAt!).toLocaleDateString()}
                </p>
              </div>
              <button
                className="btn btn-accent font-medium"
                disabled={isPending}
                onClick={() => mutate(selectedImage._id)}
              >
                {isPending ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Deleting...
                  </>
                ) : (
                  <>
                    Delete
                    <img src={DeleteIcon} alt="delete" />
                  </>
                )}
              </button>
            </div>
            {isError && (
              <div className="alert alert-error mt-2">
                Something went wrong, while deleting image
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGrid;
