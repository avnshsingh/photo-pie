import { Router } from "express";
import { getSessionInfo } from "../controllers/sessionController";
import { verifySession } from "supertokens-node/recipe/session/framework/express";

const router = Router();

router.get("/sessioninfo", verifySession(), getSessionInfo);

export default router;
