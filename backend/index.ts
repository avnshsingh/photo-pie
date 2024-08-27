import express from "express";
import cors from "cors";
import dotEnv from "dotenv";
import supertokens from "supertokens-node";
import { middleware, errorHandler } from "supertokens-node/framework/express";
import { getWebsiteDomain, SuperTokensConfig } from "./config/config";
import mongoose from "mongoose";
import imageRoutes from "./routes/imageRoutes";
import sessionRoutes from "./routes/sessionRoutes";

dotEnv.config();
supertokens.init(SuperTokensConfig);

const app = express();

app.use(
  cors({
    origin: getWebsiteDomain(),
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("MongoDB connection error", err));

app.use(middleware());
app.use("/api/images", imageRoutes);
app.use("/api/session", sessionRoutes);
app.use(errorHandler());

app.get("/", (req, res) => {
  res.send("Server is Running");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
