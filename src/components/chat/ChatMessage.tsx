import React from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Copy, Check, RotateCw } from 'lucide-react';
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  avatar?: string;
  content: string;
  time: string;
  role: 'user' | 'assistant' | 'system';
  align?: 'left' | 'right';
  onCopy?: () => void;
  onResend?: () => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  avatar,
  content,
  time,
  role,
  align = 'left',
  onCopy,
  onResend,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onCopy?.();
  };

  return (
    <div
      className={cn(
        "flex items-start gap-2 max-w-[80%] group",
        align === 'right' ? 'flex-row-reverse ml-auto' : 'flex-row'
      )}
    >
      <Avatar className={cn(
        "w-8 h-8 flex items-center justify-center",
        role === 'assistant' && "bg-gradient-to-br from-purple-500 to-pink-500",
        role === 'user' && "bg-blue-100"
      )}>
        {avatar ? (
          <img src={avatar} alt={role} className="w-full h-full object-cover" />
        ) : role === 'assistant' ? (
          <span className="text-xs font-bold text-white">AI</span>
        ) : (
          <User className="w-4 h-4 text-neutral-3" />
        )}
      </Avatar>

      <div className="flex flex-col gap-1">
        <div className={cn(
          "rounded-lg p-3",
          role === 'user' ? 'bg-blue-100 text-neutral-900' : 'bg-neutral-6 text-neutral-900'
        )}>
          <p className="text-sm whitespace-pre-wrap">{content}</p>
        </div>
        
        <div className={cn(
          "flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity",
          align === 'right' ? 'flex-row-reverse' : 'flex-row'
        )}>
          <span className="text-xs text-neutral-11">{time}</span>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 hover:bg-neutral-7"
              onClick={handleCopy}
            >
              {copied ? <Check className="w-3 h-3 text-neutral-3" /> : <Copy className="w-3 h-3 text-neutral-3" />}
            </Button>
            {role === 'user' && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 hover:bg-neutral-7"
                onClick={onResend}
              >
                <RotateCw className="w-3 h-3 text-neutral-3" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
