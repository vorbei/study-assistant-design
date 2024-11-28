import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        status: 'border-transparent',
        statusEmpty: '',
        light: 'border-transparent',
        dark: 'border-transparent text-white',
        statusText: 'bg-transparent p-0',
      },
      color: {
        // 使用设计系统中定义的颜色
        blue: [
          'bg-[#F2F5FF] text-[#2E4CB3] hover:bg-[#D6DFFF]',
          'data-[variant=statusEmpty]:bg-[#2E4CB3] data-[variant=statusEmpty]:text-white'
        ].join(' '),
        red: [
          'bg-[#FFF2F4] text-[#CC3D55] hover:bg-[#FFD6DD]',
          'data-[variant=statusEmpty]:bg-[#CC3D55] data-[variant=statusEmpty]:text-white'
        ].join(' '),
        orange: [
          'bg-[#FFF2E5] text-[#E57709] hover:bg-[#FCE8D4]',
          'data-[variant=statusEmpty]:bg-[#E57709] data-[variant=statusEmpty]:text-white'
        ].join(' '),
        green: [
          'bg-[#E6FFF7] text-[#31A37D] hover:bg-[#C8FAE9]',
          'data-[variant=statusEmpty]:bg-[#31A37D] data-[variant=statusEmpty]:text-white'
        ].join(' '),
        teal: [
          'bg-[#E6FBFF] text-[#1298B3] hover:bg-[#CCF6FF]',
          'data-[variant=statusEmpty]:bg-[#1298B3] data-[variant=statusEmpty]:text-white'
        ].join(' '),
        ultramarine: [
          'bg-[#F2F2FF] text-[#6060DB] hover:bg-[#E6E6FF]',
          'data-[variant=statusEmpty]:bg-[#6060DB] data-[variant=statusEmpty]:text-white'
        ].join(' '),
        purple: [
          'bg-[#F9F2FF] text-[#884EC2] hover:bg-[#F2E6FF]',
          'data-[variant=statusEmpty]:bg-[#884EC2] data-[variant=statusEmpty]:text-white'
        ].join(' '),
        gray: [
          'bg-[#F3F5FA] text-[#1F264D] hover:bg-[#E6E9F2]',
          'data-[variant=statusEmpty]:bg-[#1F264D] data-[variant=statusEmpty]:text-white'
        ].join(' '),
      },
      size: {
        default: 'text-xs',
        lg: 'text-sm px-3 py-1',
      }
    },
    defaultVariants: {
      variant: 'status',
      color: 'gray',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  color?: 'blue' | 'red' | 'orange' | 'green' | 'teal' | 'ultramarine' | 'purple' | 'gray';
  size?: boolean;
}

function Badge({ className, variant, color, size, ...props }: BadgeProps) {
  const sizeValue = size ? 'lg' : 'default';
  return (
    <div 
      data-variant={variant}
      className={cn(badgeVariants({ variant, color, size: sizeValue }), className)} 
      {...props} 
    />
  );
}

export { Badge, badgeVariants };
