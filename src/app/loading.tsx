import { CuddleIcon } from "@/components/icons";

export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-10rem)] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <CuddleIcon className="h-16 w-16 animate-pulse text-primary" />
        <p className="font-headline text-xl text-muted-foreground">Loading cuddles...</p>
      </div>
    </div>
  );
}
