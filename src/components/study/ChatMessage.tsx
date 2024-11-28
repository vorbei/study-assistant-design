import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { RotateCw } from 'lucide-react';

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    isUser: boolean;
    timestamp: string;
  };
  onResend?: (content: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message,
  onResend 
}) => {
  return (
    <div className={cn(
      "flex gap-3 p-4",
      message.isUser ? "bg-neutral-8" : "bg-background"
    )}>
      <Avatar className="h-8 w-8">
        <div className={cn(
          "h-full w-full rounded-full flex items-center justify-center text-xs font-medium",
          message.isUser ? "bg-primary" : "bg-neutral-6"
        )}>
          {message.isUser ? "我" : "AI"}
        </div>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium">
            {message.isUser ? "学习" : "学习助手"}
          </span>
          <span className="text-xs text-muted-foreground">
            {message.timestamp}
          </span>
          {!message.isUser && onResend && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onResend(message.content)}
              className="h-6 w-6 p-0 ml-auto"
            >
              <RotateCw className="h-3 w-3" />
            </Button>
          )}
        </div>
        <p className="text-sm whitespace-pre-wrap break-words">
          {message.content}
        </p>
      </div>
    </div>
  );
};
