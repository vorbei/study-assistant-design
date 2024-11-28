import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatListItemProps {
  chat: {
    id: string;
    title: string;
    lastMessage: string;
    timestamp: string;
    isActive?: boolean;
  };
  onClick: () => void;
  onDelete: () => void;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({ 
  chat, 
  onClick,
  onDelete
}) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className={cn(
        "p-4 cursor-pointer hover:bg-neutral-8 border-b relative",
        chat.isActive && "bg-neutral-8"
      )}
      onClick={onClick}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-center justify-between mb-1">
        <h4 className="font-medium text-sm">{chat.title}</h4>
        <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
      </div>
      <p className="text-sm text-muted-foreground truncate pr-8">{chat.lastMessage}</p>
      
      {showActions && (
        <div className="absolute right-3 bottom-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 hover:bg-transparent p-0"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      )}
    </div>
  );
};
