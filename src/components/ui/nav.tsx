import * as React from "react"
import { cn } from "@/lib/utils"
import logo from '@/assets/logo.svg'

interface NavProps extends React.HTMLAttributes<HTMLElement> {
  currentPath?: string;
}

export function Nav({ className, currentPath = '#design', ...props }: NavProps) {
  const navItems = [
    { href: '#design', label: '设计规范' },
    { href: '#components', label: 'UI组件' }
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[9999] flex h-14 items-center border-b border-neutral-6 bg-background px-3 lg:px-4 shadow-md",
        className
      )}
      {...props}
    >
      <div className="flex items-center">
        <div className="flex items-center pr-4 border-r border-neutral-6">
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <h1 className="text-lg font-semibold ml-2">开心健康 设计规范组件库</h1>
        </div>
        <div className="flex items-center ml-4 space-x-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative px-3 py-2",
                (currentPath === item.href || currentPath.startsWith(item.href + '/'))
                  ? "text-primary before:absolute before:bottom-0 before:left-0 before:right-0 before:h-0.5 before:bg-primary"
                  : "text-neutral-1"
              )}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
