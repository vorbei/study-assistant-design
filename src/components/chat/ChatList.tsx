import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ChatItem {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  isActive?: boolean;
}

interface ChatListProps {
  items: ChatItem[];
  onItemClick: (id: string) => void;
  className?: string;
}

export const ChatList: React.FC<ChatListProps> = ({
  items,
  onItemClick,
  className
}) => {
  return (
    <div className={cn("flex flex-col w-64 border-r bg-background flex-1 overflow-y-auto", className)}>
      <div className="p-4 border-b">
        <h2 className="text-lg font-medium">考试列表</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "flex items-center gap-3 p-4 cursor-pointer hover:bg-accent transition-colors",
              item.isActive && "bg-accent"
            )}
            onClick={() => onItemClick(item.id)}
          >
            <Avatar className="w-10 h-10 bg-purple-500 flex items-center justify-center">
              <span className="text-white text-sm">模考</span>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <p className="font-medium truncate">{item.title}</p>
                <span className="text-xs text-muted-foreground flex-shrink-0">{item.timestamp}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {item.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
