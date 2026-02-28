
const mongoose = require('mongoose');
const { products } = require('../lib/products');

// Simplified Product Schema for seeding script as TS compilation might be tricky in pure node script
const ProductSchema = new mongoose.Schema({
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

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cuddlecart';

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products');

        // Insert new products
        await Product.insertMany(products);
        console.log(`Seeded ${products.length} products`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seed();
