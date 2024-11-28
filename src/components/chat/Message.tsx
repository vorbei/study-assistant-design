import React from 'react';
import cn from 'classnames';

interface MessageProps {
  content: React.ReactNode;
  isUser?: boolean;
  avatar?: React.ReactNode;
  className?: string;
}

export const Message: React.FC<MessageProps> = ({
  content,
  isUser = false,
  avatar,
  className
}) => {
  return (
    <div className={cn(
      "flex items-start gap-3 px-4 py-2",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      {avatar && (
        <div className="flex-shrink-0 mt-1">
          {avatar}
        </div>
      )}
      <div className={cn(
        "px-4 py-2 rounded-lg max-w-[80%]",
        isUser ? "bg-primary text-primary-foreground" : "bg-muted",
        className
      )}>
        {typeof content === 'string' ? (
          <p className="text-sm whitespace-pre-wrap">{content}</p>
        ) : (
          content
        )}
      </div>
    </div>
  );
};
