import mongoose, { Schema, Document } from "mongoose";

export interface IImageVariant extends Document {
  path: string;
  hash: string;
  width?: string;
  height?: string;
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside'; // TODO enum
  quality?: string;
  format?: string // TODO enumm
  mimeType?: string; // TODO enum
}

export const ImageVariantScheme = new Schema({
  path: { type: String, required: true },
  hash: { type: String, required: true },
  width: Number,
  height: Number,
  fit: String,
  quality: { type: Number, min: 0, max: 100 },
  format: String
});

export default mongoose.model<IImageVariant>('ImageVariant', ImageVariantScheme);