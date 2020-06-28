import { model, Schema, Document, Types } from "mongoose";

export interface IVariantStatistic extends Document {
  variantId: string;
  created: Date;
  modified: Date;
  viewCount: number;
};

const VariantStatisticSchema = new Schema({
  variantId: { type: Types.ObjectId, required: true },
  created: { type: Date, required: true},
  modified: { type: Date, required: true},
  viewCount: { type: Number, default: 0, required: true }
});

export default model<IVariantStatistic>('VariantStatistic', VariantStatisticSchema);