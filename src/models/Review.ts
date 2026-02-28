import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
    name: string;
    review: string;
    rating: number;
    createdAt: Date;
}

const ReviewSchema: Schema = new Schema({
    name: { type: String, required: true },
    review: { type: String, required: true },
    rating: { type: Number, default: 5 },
}, {
    timestamps: true,
});

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
