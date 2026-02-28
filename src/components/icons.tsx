import type { SVGProps } from "react";

export const CuddleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6z" />
    <path d="M12 14c-3.3 0-6 2.7-6 6v2h12v-2c0-3.3-2.7-6-6-6z" />
    <path d="M8.5 7.5a.5.5 0 01-1 0 .5.5 0 011 0z" />
    <path d="M16.5 7.5a.5.5 0 01-1 0 .5.5 0 011 0z" />
    <path d="M12 10s2 1 4 0" />
  </svg>
);

export const BearIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15.39 18.23c-1.33 1.3-3.21 2.01-5.39 1.77-2.18-.24-4-1.63-5-3.64C4.12 14.18 5.62 12 7.82 12h.02c2.67 0 4.97 1.57 6.16 3.82.9-1.22 2.4-2.14 4.14-2.14 2.65 0 4.86 2.21 4.86 5.12 0 3.03-2.65 5.25-5.61 5.25-1.99 0-3.79-1.1-4.6-2.82z" />
    <path d="M10 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
  </svg>
);

export const DinosaurIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M8 17.6c.2.6.4 1.2.7 1.7.3.5.7 1 1.1 1.4.5.4.9.8 1.5 1 .6.2 1.3.3 2 .3s1.4-.1 2-.3c.6-.2 1.1-.6 1.5-1 .4-.4.8-.9 1.1-1.4.3-.5.5-1.1.7-1.7" />
    <path d="M15.3 11.3c.3-.2.5-.5.7-.8.2-.3.3-.7.4-1.1.1-.3.1-.7.1-1.1 0-.4-.1-.8-.1-1.2-.1-.4-.2-.8-.4-1.1-.2-.3-.4-.6-.7-.8-.3-.2-.6-.4-1-.5-.4-.1-.8-.2-1.3-.2s-.9.1-1.3.2c-.4.1-.8.3-1.1.5-.3.2-.6.4-.8.7-.2.3-.4.6-.6.9-.1.3-.2.7-.2 1.1s.1.8.2 1.2c.1.4.2.7.4.9.2.2.5.4.8.6.3.2.6.3 1 .4s.8.1 1.2.1.8-.1 1.2-.2" />
    <path d="M19 13c-2.8 1-5.8 1.8-9 2-3.2.2-6.4-.4-9-1.5" />
    <path d="m5 12 1-2c.3-.4.8-.6 1.3-.5s.9.5 1 1l1 2" />
    <path d="m17 12 1-2c.3-.4.8-.6 1.3-.5s.9.5 1 1l1 2" />
  </svg>
);


export const Logo = (props: SVGProps<SVGSVGElement>) => (
  <div className="flex items-center justify-center gap-2">
    <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-primary/10 shadow-sm flex-shrink-0">
      <img src="/logo.png" alt="CuddleCart Logo" className="h-full w-full object-cover" />
    </div>
    <span className="font-headline text-3xl font-bold">CuddleCart</span>
  </div>
);
