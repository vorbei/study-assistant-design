import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Plus, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ExamSettingsDialog } from './ExamSettingsDialog';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

interface Chat {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  isActive?: boolean;
  messages: Message[];
}

const mockChats: Chat[] = [
  {
    id: '1',
    title: '模拟考核1',
    lastMessage: '那么，作为医学生，你能简要描述一下急性心肌梗死的临床表现和诊断依据吗？',
    timestamp: '10:30',
    isActive: true,
    messages: [
      {
        id: '1',
        content: '那么，作为医学生，你能简要描述一下急性心肌梗死的临床表现和诊断依据吗？',
        isUser: false,
        timestamp: '10:30'
      },
      {
        id: '2',
        content: '心机之蛙一直摸你肚子',
        isUser: true,
        timestamp: '10:31'
      },
      {
        id: '3',
        content: '哈哈，看来你可能在调皮一下。不过，急性心肌梗死的诊断确实非常重要。如果你能回答这个问题，我会根据你的表现给你反馈。你准备好了吗？',
        isUser: false,
        timestamp: '10:32'
      },
      {
        id: '4',
        content: '临床表现,急性心肌梗死的病人有频死感,会出现大汗,持续性心绞痛全放射至左肩。',
        isUser: true,
        timestamp: '10:33'
      },
      {
        id: '5',
        content: '很好，你已经提到了急性心肌梗死（AMI）的几个经典临床表现，以下是一些补充和评价：\n\n你的回答：\n• 频死感：这是急性心肌梗死常见的症状，病人通常感到胸部压迫或沉重感，甚至有生命危险的恐慌。\n• 大汗：是由于交感神经激活引起的，通常发生在急性心肌梗死时，特别是在疼痛剧烈时。',
        isUser: false,
        timestamp: '10:34'
      }
    ]
  },
  {
    id: '2',
    title: '模拟考核2',
    lastMessage: '请描述一下支气管哮喘的临床特点。',
    timestamp: '昨天',
    messages: []
  },
  {
    id: '3',
    title: '模拟考核3',
    lastMessage: '糖尿病的诊断标准是什么？',
    timestamp: '周一',
    messages: []
  }
];

const ChatListItem: React.FC<{
  chat: Chat;
  onClick: () => void;
}> = ({ chat, onClick }) => {
  return (
    <div
      className={cn(
        "p-4 cursor-pointer hover:bg-accent/50 transition-colors",
        chat.isActive && "bg-accent"
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-1">
        <h4 className="font-medium text-sm">{chat.title}</h4>
        <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
      </div>
      <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
    </div>
  );
};

export const ExamSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(mockChats[0]);
  const [input, setInput] = useState('');
  const { toast } = useToast();

  const handleChatClick = (chat: Chat) => {
    setActiveChat(chat);
  };

  const handleResend = (content: string) => {
    toast({
      title: "重新发送消息",
      description: content,
    });
  };

  return (
    <div className="w-full h-full p-4">
      <Card className="w-full h-[800px] grid grid-cols-[320px,1fr] overflow-hidden">
        <div className="flex flex-col h-full border-r">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">考试列表</h3>
            <Button 
              onClick={() => setIsDialogOpen(true)}
              size="sm"
              className="h-8"
            >
              <Plus className="w-4 h-4 mr-1" />
              添加考核
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {mockChats.map((chat) => (
              <ChatListItem
                key={chat.id}
                chat={{
                  ...chat,
                  isActive: chat.id === activeChat.id
                }}
                onClick={() => handleChatClick(chat)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 p-4 border-b">
            <Avatar className="bg-purple-500 w-8 h-8 flex items-center justify-center">
              <span className="text-white text-sm">考核</span>
            </Avatar>
            <div>
              <h3 className="font-medium">{activeChat.title}</h3>
              <Badge variant="secondary" className="mt-1">模拟考核</Badge>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {activeChat.messages.map((message) => (
              <ChatMessage
                key={message.id}
                content={message.content}
                time={message.timestamp}
                role={message.isUser ? 'user' : 'assistant'}
                align={message.isUser ? 'right' : 'left'}
                onResend={() => handleResend(message.content)}
              />
            ))}
          </div>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="输入你的答案..."
                  className="pr-12"
                />
                <Button 
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 px-2 h-7"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <ExamSettingsDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
};
