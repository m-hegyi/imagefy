import mongoose, { Schema, Document, Types } from "mongoose";

import VaraintStatistic, { IVariantStatistic } from "./variant-statistic.model";

export interface IStatistic extends Document {
  imageId: string;
  created: Date;
  modified: Date;
  viewCount: number;
  variants: [IVariantStatistic]
}

const StatisticSchema = new Schema({
  imageId: { type: Types.ObjectId, required: true},
  created: { type: Date, required: true, default: Date.now() },
  modified: { type: Date, required: true},
  viewCount: { type: Number, default: 0, required: true },
  variants: [VaraintStatistic]
});

export default mongoose.model<IStatistic>('Statistic', StatisticSchema);