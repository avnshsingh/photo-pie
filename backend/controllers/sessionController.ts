import { Request, Response } from "express";
import { SessionRequest } from "supertokens-node/framework/express";

export const getSessionInfo = async (req: SessionRequest, res: Response) => {
  try {
    const session = req.session;
    res.send({
      sessionHandle: session!.getHandle(),
      userId: session!.getUserId(),
      accessTokenPayload: session!.getAccessTokenPayload(),
    });
  } catch (error: any) {
    console.error("Error in getSessionInfo", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};
