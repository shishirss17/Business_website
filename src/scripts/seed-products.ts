import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { products } from '@/lib/products';

async function seedProducts() {
    try {
        await dbConnect();
        console.log('Connected to database');

        // Check if products already exist
        const existingCount = await Product.countDocuments();

        if (existingCount > 0) {
            console.log(`Database already has ${existingCount} products.`);
            console.log('Skipping seed to avoid duplicates.');
            console.log('To re-seed, delete existing products first.');
            process.exit(0);
        }

        // Insert all products
        const insertedProducts = await Product.insertMany(products);

        console.log(`✓ Successfully seeded ${insertedProducts.length} products!`);

        // Display seeded products
        insertedProducts.forEach((product) => {
            console.log(`  - ${product.name} (${product.id})`);
        });

        console.log('\n✓ Product seed completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
}

seedProducts();
