import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
    email?: string;
    phone?: string;
    message?: string;
    type: 'subscription' | 'contact';
    name?: string;
}

const ContactSchema: Schema = new Schema({
    email: { type: String },
    phone: { type: String },
    message: { type: String },
    type: { type: String, enum: ['subscription', 'contact'], required: true, default: 'contact' },
    name: { type: String },
}, {
    timestamps: true,
});

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
