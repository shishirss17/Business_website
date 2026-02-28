import mongoose, { Schema, Document } from 'mongoose';

// Plain product data interface (for use in React state, API responses, etc.)
export interface IProductData {
    id: string;
    name: string;
    description: string;
    longDescription: string;
    price: number;
    images: string[];
    category: 'Bear' | 'Bunny' | 'Magical' | 'Dinosaur' | 'Animal';
    brand: string;
    materials: string;
    care: string;
    ageRange: string;
}

// Mongoose Document interface (for database operations)
export interface IProduct extends Document, IProductData { }

const ProductSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    materials: { type: String, required: true },
    care: { type: String, required: true },
    ageRange: { type: String, required: true },
}, {
    timestamps: true,
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
