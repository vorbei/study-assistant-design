import React, { useState, useEffect } from 'react';
import { Sidebar } from "@/components/layout/Sidebar";
import { LoginSection } from "@/components/sections/examples/LoginSection";
import { ChatSection } from "@/components/sections/examples/ChatSection";
import { LearningAssistantSection } from "@/components/sections/examples/LearningAssistantSection";
import { ExamSection } from "@/components/sections/examples/ExamSection";

const sections = [
  {
    id: "login",
    name: "登录界面",
    href: "#examples/login",
    description: "展示各种登录、注册、找回密码等用户认证界面"
  },
  {
    id: "chat",
    name: "对话界面",
    href: "#examples/chat",
    description: "展示聊天、对话、消息等交互界面"
  },
  {
    id: "learningAssistant",
    name: "LearningAssistant界面",
    href: "#examples/learningAssistant",
    description: "展示学习助手等界面"
  },
  {
    id: "exam",
    name: "模拟考试",
    href: "#examples/exam",
    description: "展示模拟考试界面"
  }
];

export const ExamplesPage = () => {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (!hash.startsWith('examples/')) return;
      
      const sectionId = hash.replace('examples/', '');
      const section = sections.find(s => s.id === sectionId);
      if (section) {
        setActiveSection(section.id);
      } else {
        setActiveSection(sections[0].id);
        window.location.hash = `examples/${sections[0].id}`;
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSectionChange = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (section) {
      setActiveSection(section.id);
      window.location.hash = `examples/${section.id}`;
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F5FA]">
      <div className="flex">
        <Sidebar
          sections={sections}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />

        {/* Main Content */}
        <main className="pl-64 w-full">
          <div className="mx-auto p-6 mt-16">
            {activeSection === 'login' && (
              <div className="rounded-lg p-6">
                <h2 className="text-lg font-medium mb-2">登录界面</h2>
                <p className="text-sm text-neutral-11 mb-6">{sections[0].description}</p>
                <LoginSection />
              </div>
            )}
            {activeSection === 'chat' && (
              <div className="rounded-lg p-6">
                <h2 className="text-lg font-medium mb-2">对话界面</h2>
                <p className="text-sm text-neutral-11 mb-6">{sections[1].description}</p>
                <ChatSection />
              </div>
            )}
            {activeSection === 'learningAssistant' && (
              <div className="rounded-lg p-6">
                <h2 className="text-lg font-medium mb-2">LearningAssistant界面</h2>
                <p className="text-sm text-neutral-11 mb-6">{sections[2].description}</p>
                <LearningAssistantSection />
              </div>
            )}
            {activeSection === 'exam' && (
              <div className="rounded-lg p-6">
                <h2 className="text-lg font-medium mb-2">模拟考试</h2>
                <p className="text-sm text-neutral-11 mb-6">{sections[3].description}</p>
                <ExamSection />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
