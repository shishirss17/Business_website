'use server';

import dbConnect from '@/lib/db';
import ProductModel from '@/models/Product';
import { Product } from '@/lib/types';

export async function getProducts(): Promise<Product[]> {
    await dbConnect();
    const products = await ProductModel.find({}).lean();
    return products.map((p: any) => ({
        ...p,
        id: p.id,
        _id: p._id.toString()
    })) as Product[];
}

export async function getProductById(id: string): Promise<Product | null> {
    await dbConnect();
    const product = await ProductModel.findOne({ id }).lean();
    if (!product) return null;
    return { ...product, _id: (product as any)._id.toString() } as unknown as Product;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
    await dbConnect();
    const products = await ProductModel.find({ category }).lean();
    return products.map((p: any) => ({ ...p, _id: p._id.toString() })) as Product[];
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
    await dbConnect();
    const products = await ProductModel.find({ id: { $in: ids } }).lean();
    return products.map((p: any) => ({ ...p, _id: p._id.toString() })) as Product[];
}
