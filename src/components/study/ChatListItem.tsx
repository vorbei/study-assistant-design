import React from 'react';
import { cn } from '@/lib/utils';

interface ChatListItemProps {
  chat: {
    id: string;
    title: string;
    lastMessage: string;
    timestamp: string;
    isActive?: boolean;
  };
  onClick: () => void;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({ chat, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "p-4 cursor-pointer hover:bg-neutral-8 border-b",
        chat.isActive && "bg-neutral-8"
      )}
    >
      <div className="flex items-center justify-between mb-1">
        <h4 className="font-medium text-sm">{chat.title}</h4>
        <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
      </div>
      <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
    </div>
  );
};
