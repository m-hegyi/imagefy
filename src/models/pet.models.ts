import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user.models";

export interface IPet extends Document {
  name: string;
  owner: IUser['_id'];
};

const PetSchema = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
});

export default mongoose.model<IPet>('Pet', PetSchema);