import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password?: string;
    name?: string;
    phoneNumber?: string;
    addresses?: Array<{
        id: string;
        type: string;
        address: string;
        isDefault: boolean;
    }>;
    role: 'user' | 'admin';
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false }, // Optional for OAuth users in future
    name: { type: String },
    phoneNumber: { type: String },
    addresses: [{
        id: { type: String },
        type: { type: String },
        address: { type: String },
        isDefault: { type: Boolean, default: false }
    }],
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, {
    timestamps: true,
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
