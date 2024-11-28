import * as React from "react"

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      {...props}
    >
      <path
        d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2z"
        fill="#4B5563"
      />
      <path
        d="M23.5 12.5c0 4.142-3.358 7.5-7.5 7.5s-7.5-3.358-7.5-7.5S11.858 5 16 5s7.5 3.358 7.5 7.5z"
        fill="#10B981"
      />
      <path
        d="M20 19.5c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4z"
        fill="#34D399"
      />
    </svg>
  )
}
