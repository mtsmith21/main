import type { SVGProps } from "react";

export function AppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20.3 21.2L8.8 12.3l4.8-1.4 3.9 6.9 2.8-2.3-6.2-11.4-4.8 1.4L2.7 18.8l2.3 2.8 11.4-6.2 1.4 4.8-2.5 2.8z" />
      <path d="M11.6 8.4l-2-2.1" />
      <path d="m14 6-3.1 3.1" />
      <path d="m16.5 3.5-3.1 3.1" />
      <path d="m19 1-3.1 3.1" />
    </svg>
  );
}
