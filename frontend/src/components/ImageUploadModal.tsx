import React, { useState, ChangeEvent, FormEvent, useRef } from "react";
import axios from "axios";
import { getApiDomain } from "../config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUploadImageMutation from "../hooks/useUploadImage";
import toast from "react-hot-toast";

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending, isError, isSuccess } = useUploadImageMutation(
    onSuccess,
    onError
  );

  function onSuccess() {
    queryClient.invalidateQueries({ queryKey: ["images"] });
    toast.success("Image uploaded successfully", {
      position: "top-right",
      duration: 3000,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFile(null);
    setPreview(null);
    setError(null);

    onClose();
  }
  function onError(error: any) {
    console.error("Upload failed:", error);
    setError("Failed to upload image. Please try again.");
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    console.log("selectedFile", selectedFile);

    if (selectedFile && selectedFile?.size > 1 * 1024 * 1024) {
      setError("File size should be less than 1MB");
      return;
    }

    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError("Please select an image to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    mutate(formData);
  };

  console.log("file", file);

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h2 className="text-2xl font-bold mb-4 text-center">Upload Image</h2>
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Choose an image</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full file-input-accent"
              ref={fileInputRef}
            />
          </div>

          {preview && (
            <div className="mt-4">
              <img
                src={preview}
                alt="Preview"
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          )}

          <button
            type="submit"
            className={`btn btn-accent w-full`}
            disabled={isPending || !file}
          >
            {isPending ? (
              <>
                <span className="loading loading-spinner"></span>
                Loading...
              </>
            ) : (
              "Upload Image"
            )}
          </button>

          {error && <div className="alert alert-error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default ImageUploadModal;
