import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PhoneLoginForm } from "@/components/login/PhoneLoginForm";
import { AccountLoginForm } from "@/components/login/AccountLoginForm";

export const LoginSection = () => {
  const [countdown, setCountdown] = useState(0);
  const [activeTab, setActiveTab] = useState<"phone" | "account">("phone");

  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const onPhoneSubmit = (data: any) => {
    console.log("Phone login data:", data);
  };

  const onAccountSubmit = (data: any) => {
    console.log("Account login data:", data);
  };

  return (
    <div className="space-y-8">
      <Card className="p-0 h-[600px] max-w-[1200px] mx-auto overflow-hidden border-[1px] border-white bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="flex h-full relative">
          {/* 背景装饰 */}
          <div className="absolute top-[-30%] left-[-20%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-200/30 to-blue-300/30 blur-3xl" />
          <div className="absolute bottom-[-30%] right-[-20%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-200/30 to-blue-300/30 blur-3xl" />
          
          {/* 左侧介绍 */}
          <div className="flex-1 p-12 flex flex-col justify-center relative">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-neutral-0 mb-4">欢迎使用智能学习助手</h1>
              <h2 className="text-3xl font-bold text-blue-7 mb-4">为您提供智能化的学习解决方案</h2>
            </div>
            <div className="relative h-[300px]">
            </div>
          </div>

          {/* 右侧登录 */}
          <div className="max-w-md mx-auto w-[350px] p-12 bg-white/70 backdrop-blur-xl flex flex-col justify-center">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "phone" | "account")} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 p-1 bg-blue-50">
                <TabsTrigger 
                  value="phone" 
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
                >
                  手机号登录
                </TabsTrigger>
                <TabsTrigger 
                  value="account"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
                >
                  账号密码登录
                </TabsTrigger>
              </TabsList>

              <TabsContent value="phone" className="space-y-4 mt-8">
                <PhoneLoginForm
                  onSubmit={onPhoneSubmit}
                  countdown={countdown}
                  onSendCode={startCountdown}
                />
              </TabsContent>

              <TabsContent value="account" className="space-y-4 mt-8">
                <AccountLoginForm onSubmit={onAccountSubmit} />
              </TabsContent>

              <div className="flex justify-end mt-4">
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                  忘记密码？
                </a>
              </div>
            </Tabs>
          </div>
        </div>
      </Card>
    </div>
  );
};
