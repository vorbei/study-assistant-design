import * as React from 'react';
import { cn } from '@/lib/utils';

interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
  noSpace?: boolean;
}

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, vertical = false, noSpace = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center',
          !noSpace && 'gap-2',
          vertical && !noSpace && 'flex-col items-start gap-2',
          className
        )}
        {...props}
      />
    );
  }
);
FormItem.displayName = 'FormItem';

export { FormItem };
