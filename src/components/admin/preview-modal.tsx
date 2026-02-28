"use client";

import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { getPlaceholderImage } from "@/lib/placeholder-images";
import type { IProduct } from "@/models/Product";
import { Badge } from "@/components/ui/badge";

interface PreviewModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    product: IProduct | null;
    originalProduct: IProduct | null;
}

export function PreviewModal({
    open,
    onOpenChange,
    product,
    originalProduct,
}: PreviewModalProps) {
    if (!product) return null;

    const hasChanges = originalProduct && JSON.stringify(product) !== JSON.stringify(originalProduct);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Preview Changes</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {hasChanges && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                            <p className="text-sm text-blue-800 dark:text-blue-200">
                                This is how the product will appear after saving. Changes are highlighted below.
                            </p>
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Product Card Preview */}
                        <div className="border rounded-lg p-6 space-y-4">
                            <h3 className="font-semibold text-lg">Product Card View</h3>
                            <div className="bg-card border rounded-lg overflow-hidden">
                                <div className="relative aspect-square bg-muted">
                                    <Image
                                        src={getPlaceholderImage(product.images[0])}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-4 space-y-2">
                                    <h4 className="font-semibold">{product.name}</h4>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {product.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold">Rs {product.price.toFixed(2)}</span>
                                        <Badge variant="secondary">{product.category}</Badge>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Details Preview */}
                        <div className="border rounded-lg p-6 space-y-4">
                            <h3 className="font-semibold text-lg">Product Details View</h3>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <span className="font-medium">Name:</span>
                                    <p className={hasChanges && product.name !== originalProduct?.name ? "text-blue-600 dark:text-blue-400 font-medium" : ""}>
                                        {product.name}
                                    </p>
                                </div>
                                <div>
                                    <span className="font-medium">Price:</span>
                                    <p className={hasChanges && product.price !== originalProduct?.price ? "text-blue-600 dark:text-blue-400 font-medium" : ""}>
                                        Rs {product.price.toFixed(2)}
                                    </p>
                                </div>
                                <div>
                                    <span className="font-medium">Description:</span>
                                    <p className={hasChanges && product.longDescription !== originalProduct?.longDescription ? "text-blue-600 dark:text-blue-400 font-medium" : ""}>
                                        {product.longDescription}
                                    </p>
                                </div>
                                <div>
                                    <span className="font-medium">Category:</span>
                                    <p className={hasChanges && product.category !== originalProduct?.category ? "text-blue-600 dark:text-blue-400 font-medium" : ""}>
                                        {product.category}
                                    </p>
                                </div>
                                <div>
                                    <span className="font-medium">Brand:</span>
                                    <p className={hasChanges && product.brand !== originalProduct?.brand ? "text-blue-600 dark:text-blue-400 font-medium" : ""}>
                                        {product.brand}
                                    </p>
                                </div>
                                <div>
                                    <span className="font-medium">Materials:</span>
                                    <p className={hasChanges && product.materials !== originalProduct?.materials ? "text-blue-600 dark:text-blue-400 font-medium" : ""}>
                                        {product.materials}
                                    </p>
                                </div>
                                <div>
                                    <span className="font-medium">Care:</span>
                                    <p className={hasChanges && product.care !== originalProduct?.care ? "text-blue-600 dark:text-blue-400 font-medium" : ""}>
                                        {product.care}
                                    </p>
                                </div>
                                <div>
                                    <span className="font-medium">Age Range:</span>
                                    <p className={hasChanges && product.ageRange !== originalProduct?.ageRange ? "text-blue-600 dark:text-blue-400 font-medium" : ""}>
                                        {product.ageRange}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
