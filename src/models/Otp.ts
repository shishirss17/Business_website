import mongoose, { Schema, Document } from 'mongoose';

export interface IOtp extends Document {
    phoneNumber: string;
    code: string;
    expiresAt: Date;
}

const OtpSchema: Schema = new Schema({
    phoneNumber: { type: String, required: true },
    code: { type: String, required: true },
    expiresAt: { type: Date, required: true, index: { expires: '0s' } }, // Auto-delete on expiration
}, {
    timestamps: true,
});

export default mongoose.models.Otp || mongoose.model<IOtp>('Otp', OtpSchema);
