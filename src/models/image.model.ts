import mongoose, { Schema, Document, Mongoose } from "mongoose";
import { IImageVariant, ImageVariantScheme } from "./image-variant.model";

export interface IImage extends Document {
  name: string;
  path: string;
  mimeType: string;
  variants: [IImageVariant];
  createdAt: Date;
}

const ImageSchema = new Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  mimeType: { type: String, required: true },
  variants: [ImageVariantScheme],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IImage>('Image', ImageSchema);