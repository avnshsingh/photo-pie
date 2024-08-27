import ImageGrid from "../components/ImageGrid";
import ImageUploadModal from "../components/ImageUploadModal";
import useUserId from "../hooks/useUserId";
import useImageDataApi from "../hooks/useImageData";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Home() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const userId = useUserId();
  const { data: imagesData, isLoading, isError, error } = useImageDataApi();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  console.log("imagesData", imagesData);
  // handle loading
  if (!userId || isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span className="loading loading-bars loading-lg"></span>;
      </div>
    );
  }
  // handle error
  if (isError) {
    console.error("Error in fetching images", error);
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="alert alert-error w-fit">
          Something Went Wrong while fetching images
        </div>
      </div>
    );
  }
  return (
    <div className="lg:pt-2 relative">
      <Navbar openModal={openModal} />
      <ImageUploadModal isOpen={isModalOpen} onClose={closeModal} />
      {imagesData?.data?.images && (
        <ImageGrid images={imagesData?.data?.images} />
      )}
      {imagesData?.data?.images && imagesData?.data?.images.length === 0 && (
        <div className="w-full h-screen flex items-center justify-center">
          <h3 className="text-xl">
            You don't have any images, please upload some to see here
          </h3>
        </div>
      )}
    </div>
  );
}
