import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { PlaceHolderImages } from '@/lib/placeholder-images'

export default function NotFound() {
  const image404 = PlaceHolderImages.find(p => p.id === '404-image')

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-20rem)] text-center px-4">
      {image404 && (
        <Image
          src={image404.imageUrl}
          alt={image404.description}
          width={400}
          height={267}
          className="rounded-lg shadow-lg mb-8"
          data-ai-hint={image404.imageHint}
        />
      )}
      <h1 className="text-5xl font-headline font-bold mb-4">Oh no! Lost your cuddle buddy?</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-md">The page you're looking for seems to have wandered off. Let's get you back to the cuddle zone.</p>
      <Button asChild size="lg">
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  )
}
