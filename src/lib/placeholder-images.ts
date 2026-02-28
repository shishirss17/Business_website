import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;

export function getPlaceholderImage(id: string): string {
  const placeholder = PlaceHolderImages.find(p => p.id === id);
  return placeholder?.imageUrl || '/placeholder.png';
}
