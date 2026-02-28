import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import type { IProduct } from '@/models/Product';

export async function getAllProducts(): Promise<IProduct[]> {
    await dbConnect();
    const products = await Product.find({}).lean();
    return products.map(p => ({
        ...p,
        _id: p._id.toString(),
    })) as IProduct[];
}

export async function getProductById(id: string): Promise<IProduct | null> {
    await dbConnect();
    const product = await Product.findOne({ id }).lean();
    if (!product) return null;
    return {
        ...product,
        _id: product._id.toString(),
    } as IProduct;
}

export async function updateProduct(id: string, data: Partial<IProduct>): Promise<IProduct | null> {
    await dbConnect();
    const product = await Product.findOneAndUpdate(
        { id },
        { $set: data },
        { new: true, runValidators: true }
    ).lean();

    if (!product) return null;
    return {
        ...product,
        _id: product._id.toString(),
    } as IProduct;
}

export async function createProduct(data: IProduct): Promise<IProduct> {
    await dbConnect();
    const product = await Product.create(data);
    return {
        ...product.toObject(),
        _id: product._id.toString(),
    } as IProduct;
}

export async function deleteProduct(id: string): Promise<boolean> {
    await dbConnect();
    const result = await Product.deleteOne({ id });
    return result.deletedCount > 0;
}
