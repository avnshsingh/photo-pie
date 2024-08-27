import { Request, Response } from "express";
import { User } from "../models/userModel";
import multer from "multer";
import cloudinary from "../config/cloudinaryConfig";
import { SessionRequest } from "supertokens-node/framework/express";

const upload = multer({ storage: multer.memoryStorage() });

export const uploadImage = async (req: SessionRequest, res: Response) => {
  const session = req?.session;

  try {
    if (!req.file) {
      return res.status(400).send("No image file uploaded");
    }
    // upload image to cloudinary
    const uploadResult: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(req?.file?.buffer);
    });

    // update the user with the image url returned by cloudinary
    const user = await User.findOneAndUpdate(
      { uid: session!.getUserId() },
      {
        $push: {
          images: {
            url: uploadResult?.secure_url,
            public_id: uploadResult?.public_id,
            display_name: uploadResult?.display_name,
            original_filename: uploadResult?.original_filename,
          },
        },
      },
      { new: true, upsert: true }
    );

    res.json({
      message: "Image uploaded successfully",
      image: uploadResult,
      user,
    });
  } catch (error: any) {
    console.log("Error in image upload api", error);
    res.status(500).send(error?.message);
  }
};

export const getUserImages = async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;

    if (!uid) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // find the user
    const user = await User.findOne({ uid: uid });

    res.json({
      message: "User images retrieved successfully",
      uid: uid,
      images: user?.images || [],
    });
  } catch (error: any) {
    console.error("Error in get user images api", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

export const deleteImage = async (req: SessionRequest, res: Response) => {
  const { imageId } = req.params;
  const session = req?.session;

  try {
    // Find the user
    const user = await User.findOne({ uid: session!.getUserId() });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the image in the user's images array
    const imageIndex = user.images.findIndex(
      img => img?._id!.toString() === imageId
    );
    if (imageIndex === -1) {
      return res.status(404).json({ error: "Image not found" });
    }

    const image = user.images[imageIndex];

    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(image.public_id!);

    // Remove the image from the user's images array
    user.images.splice(imageIndex, 1);
    await user.save();

    res.json({ message: "Image deleted successfully", deletedImage: image });
  } catch (error) {
    console.error("Error deleting image:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the image" });
  }
};
