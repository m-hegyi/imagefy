import mongoose, { Schema, Document } from "mongoose";

export interface IImageVariant extends Document {
  path: string;
  width?: string;
  height?: string;
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside'; // TODO enum
  quality?: string;
  format?: string // TODO enumm
}

export const ImageVariantScheme = new Schema({
  path: { type: String, required: true },
  width: Number,
  height: Number,
  fit: String,
  quality: { type: Number, min: 0, max: 100 },
  format: String
});

export default mongoose.model<IImageVariant>('ImageVariant', ImageVariantScheme);