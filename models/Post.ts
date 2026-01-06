import { Schema, model, models, Document } from "mongoose";

export interface IPostDocument extends Document {
  imageUrl: string;
  createdAt: Date;
}

const PostSchema = new Schema<IPostDocument>({
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default models.Post || model<IPostDocument>("Post", PostSchema);
