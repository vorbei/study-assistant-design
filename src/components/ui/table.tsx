import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChevronsUpDown, ChevronUp, ChevronDown } from 'lucide-react';

interface SortableTableHeaderProps extends React.HTMLAttributes<HTMLTableCellElement> {
  sorted?: 'asc' | 'desc' | false;
  onSort?: () => void;
}

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn('w-full caption-bottom text-sm', className)}
      {...props}
    />
  </div>
));
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead 
    ref={ref} 
    className={cn(
      'bg-white border-t border-b-2 border-neutral-6',
      '[&_tr]:border-none',
      className
    )} 
    {...props} 
  />
));
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'border-t bg-muted/50 font-medium [&>tr]:last:border-b-0',
      className
    )}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'h-10 border-b transition-colors hover:bg-neutral-8 data-[state=selected]:bg-blue-1200',
      className
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  SortableTableHeaderProps
>(({ className, children, sorted, onSort, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-10 px-4 text-left font-medium text-neutral-11',
      '[&:has([role=checkbox])]:pr-0',
      className
    )}
    {...props}
  >
    {onSort ? (
      <div className="flex items-center">
        <button
          type="button"
          className="inline-flex items-center gap-1 hover:text-neutral-12"
          onClick={onSort}
        >
          {children}
          {sorted === false && <ChevronsUpDown className="h-4 w-4" />}
          {sorted === 'asc' && <ChevronUp className="h-4 w-4" />}
          {sorted === 'desc' && <ChevronDown className="h-4 w-4" />}
        </button>
      </div>
    ) : (
      <div className="flex items-center h-10">
        {children}
      </div>
    )}
  </th>
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'h-10 px-4',
      '[&:has([role=checkbox])]:pr-0',
      '[&>*]:flex [&>*]:items-center [&>*]:h-10',
      className
    )}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-neutral-11', className)}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
