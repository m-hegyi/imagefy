import mongoose, { Schema, Document, Mongoose } from "mongoose";

export interface IStatistic extends Document {
}

const StatisticSchema = new Schema({
});

export default mongoose.model<IStatistic>('Statistic', StatisticSchema);