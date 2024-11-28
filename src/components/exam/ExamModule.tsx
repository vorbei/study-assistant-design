import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Plus, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ExamSettingsDialog } from '../sections/examples/ExamSettingsDialog';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { useToast } from '@/components/ui/use-toast';
import { ExamListItem } from './ExamListItem';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

export interface ExamModuleProps {
  className?: string;
  initialChats?: Chat[];
}

export const ExamModule: React.FC<ExamModuleProps> = ({ 
  className,
  initialChats = [
    {
      id: '1',
      title: '模拟考核1',
      messages: [
        {
          id: '1',
          content: '那么，作为医学生，你能简要描述一下急性心肌梗死的临床表现和诊断依据吗？',
          isUser: false,
          timestamp: '10:30'
        },
        {
          id: '2',
          content: '急性心肌梗死的主要临床表现包括：\n1. 持续性胸痛，通常超过30分钟\n2. 冷汗、恶心、呕吐等自主神经症状\n3. 呼吸困难、心悸\n\n诊断依据主要有：\n1. 典型症状\n2. 心电图改变：ST段抬高或降低\n3. 心肌标志物升高：肌钙蛋白、CK-MB等\n4. 影像学检查：冠状动脉造影等',
          isUser: true,
          timestamp: '10:31'
        },
        {
          id: '3',
          content: '回答得很好！你准确描述了急性心肌梗死的主要临床表现和关键诊断要点。让我们继续深入一下，你能说明在遇到疑似心梗患者时，医生应该采取哪些紧急措施吗？',
          isUser: false,
          timestamp: '10:32'
        }
      ],
      createdAt: new Date('2024-01-20T10:30:00')
    },
    {
      id: '2',
      title: '模拟考核2',
      messages: [],
      createdAt: new Date('2024-01-20T14:30:00')
    }
  ]
}) => {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [activeChat, setActiveChat] = useState<Chat | null>(initialChats[0]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [input, setInput] = useState('');
  const { toast } = useToast();

  const handleChatClick = (chat: Chat) => {
    setActiveChat(chat);
  };

  const handleDeleteChat = (chatId: string) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    if (activeChat?.id === chatId) {
      setActiveChat(null);
    }
    toast({
      description: "考试已删除",
    });
  };

  const handleResend = (content: string) => {
    toast({
      title: "重新发送消息",
      description: content,
    });
  };

  const handleSettings = (chatId: string) => {
    setIsDialogOpen(true);
    // 可以添加逻辑来预填充当前考试的设置
  };

  return (
    <div className={cn("w-full h-full p-4", className)}>
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
            {chats.map((chat) => (
              <ExamListItem
                key={chat.id}
                chat={chat}
                isActive={activeChat?.id === chat.id}
                onClick={() => handleChatClick(chat)}
                onDelete={() => handleDeleteChat(chat.id)}
                onSettings={() => handleSettings(chat.id)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col h-full">
          {activeChat ? (
            <>
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
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-neutral-3">
              选择或创建一个考试开始
            </div>
          )}
        </div>
      </Card>
      <ExamSettingsDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
};
