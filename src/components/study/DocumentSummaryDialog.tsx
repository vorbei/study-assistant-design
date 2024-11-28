import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DocumentSummaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  summary?: string;
  isLoading?: boolean;
}

export const DocumentSummaryDialog: React.FC<DocumentSummaryDialogProps> = ({
  open,
  onOpenChange,
  summary,
  isLoading = false,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>文档总结</DialogTitle>
          <DialogDescription>
            基于当前PDF文档内容生成的智能总结
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="text-sm leading-relaxed whitespace-pre-wrap">
              {summary || '暂无总结内容'}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
