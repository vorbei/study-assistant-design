import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from 'lucide-react';
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { useToast } from "@/components/ui/use-toast";

export const ChatSection = () => {
  const { toast } = useToast();
  const messages = [
    { id: 1, role: 'assistant' as const, content: '你好！有什么我可以帮你的吗？', time: '09:00' },
    { id: 2, role: 'user' as const, content: '我想了解一下你们的产品。', time: '09:01' },
    { id: 3, role: 'assistant' as const, content: '好的，我们的产品主要有以下几个特点...', time: '09:02' },
    { id: 4, role: 'user' as const, content: '听起来不错，具体的价格是多少？', time: '09:03' },
    { id: 5, role: 'assistant' as const, content: '我们有不同的套餐可供选择，基础版每月99元，专业版每月199元，企业版可以联系我们的销售团队定制方案。', time: '09:04' },
  ];

  const handleSettings = () => {
    toast({
      title: "设置",
      description: "打开参数设置面板",
    });
  };

  const handlePdfUpload = (file: File) => {
    toast({
      title: "上传PDF",
      description: `文件名: ${file.name}`,
    });
  };

  const handleResend = (content: string) => {
    toast({
      title: "重新发送消息",
      description: content,
    });
  };

  return (
    <div className="space-y-8">
      {/* 基础对话界面 */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">基础对话界面</CardTitle>
        </CardHeader>
        <CardContent>
          <ChatContainer
            avatar={<User className="w-5 h-5 text-blue-500" />}
            title="客服小助手"
            badge="在线"
            inputPlaceholder="输入消息..."
            avatarClassName="bg-blue-100"
            onSettingsClick={handleSettings}
            onPdfUpload={handlePdfUpload}
          >
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                content={message.content}
                time={message.time}
                role={message.role}
                align={message.role === 'user' ? 'right' : 'left'}
                onResend={() => handleResend(message.content)}
              />
            ))}
          </ChatContainer>
        </CardContent>
      </Card>

      {/* AI对话界面 */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">AI对话界面</CardTitle>
        </CardHeader>
        <CardContent>
          <ChatContainer
            avatar={<span className="font-bold text-white">AI</span>}
            title="AI助手"
            badge="由先进的大语言模型驱动"
            inputPlaceholder="输入你的问题..."
            avatarClassName="bg-gradient-to-br from-purple-500 to-pink-500"
            onSettingsClick={handleSettings}
            onPdfUpload={handlePdfUpload}
          >
            <ChatMessage
              role="assistant"
              content="你好！我是AI助手，可以帮你解答问题、写代码、做数学题，甚至创作诗歌。有什么我可以帮你的吗？"
              time="09:00"
              onResend={() => handleResend("你好！我是AI助手，可以帮你解答问题、写代码、做数学题，甚至创作诗歌。有什么我可以帮你的吗？")}
            />
          </ChatContainer>
        </CardContent>
      </Card>
    </div>
  );
};
