import React from 'react';
import { cn } from '@/lib/utils';

interface ChatContainerProps {
  children?: React.ReactNode;
  title?: string;
  badge?: string;
  avatar?: React.ReactNode;
  avatarClassName?: string;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  children,
  title,
  badge,
  avatar,
  avatarClassName,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-4 border-b">
        {avatar && (
          <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", avatarClassName)}>
            {avatar}
          </div>
        )}
        <div>
          <h3 className="font-medium">{title}</h3>
          {badge && <span className="text-xs text-muted-foreground">{badge}</span>}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {children}
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="输入消息..."
              className="w-full px-4 py-2 rounded-md border bg-background"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
