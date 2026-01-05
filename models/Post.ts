import { Schema, model, models, Document } from "mongoose";

export interface IPostDocument extends Document {
  title: string;
  imageUrl: string;
  createdAt: Date;
}

const PostSchema = new Schema<IPostDocument>({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default models.Post || model<IPostDocument>("Post", PostSchema);
