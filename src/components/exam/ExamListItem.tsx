import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Trash2, Settings, Pin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface Chat {
  id: string;
  title: string;
  createdAt: Date;
  isPinned?: boolean;
}

interface ExamListItemProps {
  chat: Chat;
  isActive: boolean;
  onClick: () => void;
  onDelete: () => void;
  onSettings?: () => void;
  onTogglePin?: () => void;
}

export const ExamListItem: React.FC<ExamListItemProps> = ({
  chat,
  isActive,
  onClick,
  onDelete,
  onSettings,
  onTogglePin,
}) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className={cn(
        "p-4 cursor-pointer hover:bg-neutral-8 border-b relative",
        isActive && "bg-neutral-8"
      )}
      onClick={onClick}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-sm">{chat.title}</h4>
          {chat.isPinned && (
            <span className="text-xs text-neutral-3">置顶</span>
          )}
        </div>
        <span className="text-xs text-muted-foreground">
          {format(chat.createdAt, 'HH:mm', { locale: zhCN })}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">
        {format(chat.createdAt, 'MM月dd日', { locale: zhCN })}
      </p>
      
      {showActions && (
        <div className="absolute right-3 bottom-3 flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-neutral-3 hover:text-blue-3 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin?.();
            }}
          >
            <Pin className={cn("h-4 w-4", chat.isPinned && "fill-current")} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-neutral-3 hover:text-blue-3 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onSettings?.();
            }}
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-neutral-3 hover:text-blue-3 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
