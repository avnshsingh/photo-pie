import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  uid: String,
  images: [
    {
      url: String,
      public_id: String,
      display_name: String,
      original_filename: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

export const User = mongoose.model("User", UserSchema);
