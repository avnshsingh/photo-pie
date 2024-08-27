import { Router } from "express";
import {
  uploadImage,
  getUserImages,
  deleteImage,
} from "../controllers/imageController";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import multer from "multer";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", verifySession(), upload.single("image"), uploadImage);
router.get("/:uid", verifySession(), getUserImages);
router.delete("/:imageId", verifySession(), deleteImage);

export default router;
