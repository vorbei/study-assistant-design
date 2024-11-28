import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { PanelLeftClose, PanelLeft, Plus, Send, ChevronsRight, ArrowRight, FileText } from 'lucide-react';
import { PDFViewer } from './PDFViewer';
import { ChatListItem } from './ChatListItem';
import { ChatMessage } from '@/components/chat/ChatMessage';
import testPdf from '@/assets/test.pdf';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

interface StudyChat {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  isActive?: boolean;
  messages: Message[];
}

interface ChatListItemProps {
  chat: StudyChat;
  onClick: () => void;
}

interface StudyAssistantModuleProps {
  className?: string;
  initialChats?: StudyChat[];
}

export const StudyAssistantModule: React.FC<StudyAssistantModuleProps> = ({ 
  className,
  initialChats = [
    {
      id: '1',
      title: '学习计划制定',
      lastMessage: '让我们一起制定一个适合你的学习计划吧！',
      timestamp: '10:30',
      isActive: true,
      messages: [
        {
          id: '1',
          content: '你好！我是你的学习助手。让我们一起制定一个适合你的学习计划吧！你最近在学习什么？',
          isUser: false,
          timestamp: '10:30'
        }
      ]
    }
  ]
}) => {
  const [activeChat, setActiveChat] = useState(initialChats[0]);
  const [input, setInput] = useState('');
  const [currentPdfUrl] = useState(testPdf);
  const [isListCollapsed, setIsListCollapsed] = useState(true);
  const { toast } = useToast();

  const handleChatClick = (chat: StudyChat) => {
    setActiveChat(chat);
  };

  const handleResend = (content: string) => {
    toast({
      title: "重新发送消息",
      description: content,
    });
  };

  const handleGenerateSummary = async () => {
    toast({
      title: "正在生成文档总结",
      description: "请稍候...",
    });
    
    try {
      // TODO: 调用文档总结API
      await new Promise(resolve => setTimeout(resolve, 2000)); // 模拟API调用
      const summaryContent = `📑 文档总结

1. 文档主要内容
   - 核心概念和定义
   - 重要论点和观点
   - 关键数据和证据

2. 知识要点
   - 要点1的详细说明
   - 要点2的详细说明
   - 要点3的详细说明

3. 学习建议
   - 重点关注areas
   - 建议深入学习的方向
   - 实践应用的建议`;

      setActiveChat(prev => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            id: Date.now().toString(),
            content: summaryContent,
            isUser: false,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]
      }));

      toast({
        title: "文档总结已生成",
        description: "已将总结添加到对话中",
      });
    } catch (error) {
      toast({
        title: "生成总结失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={cn("w-full h-full p-4", className)}>
      <div className="w-full h-[800px] grid grid-cols-[1fr,24px,600px] gap-0">
        {/* PDF 预览区域 */}
        <Card className="w-full h-full overflow-hidden">
          <div className="flex flex-col h-full">
            <PDFViewer pdfUrl={currentPdfUrl} />
          </div>
        </Card>

        {/* 间隔 */}
        <div className="w-full h-full"></div>

        {/* 右侧对话区域 */}
        <Card className="w-full h-full overflow-hidden">
          <div className="grid h-full grid-cols-[auto,1fr] max-h-[800px]">
            {/* 学习记录列表 */}
            <div
              onClick={() => isListCollapsed && setIsListCollapsed(false)}
              className={cn(
                "flex flex-col h-full transition-all duration-300 cursor-pointer relative",
                isListCollapsed ? "w-8" : "w-[280px]"
              )}
            >
              {/* 折叠状态的内容 */}
              <div 
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                  isListCollapsed ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
              >
                <ChevronsRight className="h-4 w-4 text-muted-foreground" />
              </div>

              {/* 展开状态的内容 */}
              <div
                className={cn(
                  "absolute inset-0 flex flex-col transition-all duration-300",
                  isListCollapsed 
                    ? "opacity-0 pointer-events-none translate-x-2" 
                    : "opacity-100 translate-x-0"
                )}
              >
                <div className="p-4 flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsListCollapsed(!isListCollapsed);
                    }}
                    className="h-8 w-8 p-0"
                  >
                    <PanelLeftClose className="h-4 w-4" />
                  </Button>
                  <h3 className="text-sm font-medium text-muted-foreground">学习记录</h3>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {initialChats.map((chat) => (
                    <ChatListItem
                      key={chat.id}
                      chat={{
                        ...chat,
                        isActive: chat.id === activeChat.id
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChatClick(chat);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* 当前对话区域 */}
            <div className="flex flex-col h-full border-l overflow-hidden">
              {/* 头部信息 */}
              <div className={cn(
                "flex items-center gap-3 p-4 border-b shrink-0 transition-opacity duration-300",
                !isListCollapsed ? "opacity-0 pointer-events-none h-0 p-0 border-none" : "opacity-100"
              )}>
                <Avatar className="bg-blue-500 w-8 h-8 flex items-center justify-center">
                  <span className="text-white text-sm">学习</span>
                </Avatar>
                <div>
                  <h3 className="font-medium">{activeChat.title}</h3>
                  <Badge variant="secondary" className="mt-1">自学助手</Badge>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGenerateSummary();
                    }}
                    size="sm"
                    variant="outline"
                    className="h-8"
                  >
                    <FileText className="w-4 h-4 mr-1" />
                    文档总结
                  </Button>
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toast({
                        title: "新建对话",
                        description: "即将开启新的学习之旅",
                      });
                    }}
                    size="sm"
                    className="h-8"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    新建对话
                  </Button>
                </div>
              </div>
              {/* 消息列表 */}
              <div className="flex-1 overflow-y-auto min-h-0">
                <div className="p-4 space-y-4">
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
              </div>
              {/* 输入框区域 */}
              <div className="p-4 border-t shrink-0">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="输入你的问题..."
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
          </div>
        </Card>
      </div>
    </div>
  );
};
