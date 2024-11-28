import React, { useState, useEffect } from 'react';
import { Sidebar } from "@/components/layout/Sidebar";
import { LoginSection } from "@/components/sections/examples/LoginSection";
import { ExamSection } from "@/components/sections/examples/ExamSection";
import { StudyAssistantSection } from "@/components/sections/examples/StudyAssistantSection";

const sections = [
  {
    id: "login",
    name: "登录界面",
    href: "#examples/login",
    description: "展示各种登录、注册、找回密码等用户认证界面"
  },
  {
    id: "exam",
    name: "模拟考试",
    href: "#examples/exam",
    description: "展示模拟考试界面"
  },
  {
    id: "study",
    name: "自学助手",
    href: "#examples/study",
    description: "展示自学助手界面，帮助你更好地学习和记录学习过程"
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
            {activeSection === 'exam' && (
              <div className="rounded-lg p-6">
                <h2 className="text-lg font-medium mb-2">模拟考试</h2>
                <p className="text-sm text-neutral-11 mb-6">{sections[1].description}</p>
                <ExamSection />
              </div>
            )}
            {activeSection === 'study' && (
              <div className="rounded-lg p-6">
                <h2 className="text-lg font-medium mb-2">自学助手</h2>
                <p className="text-sm text-neutral-11 mb-6">{sections[2].description}</p>
                <StudyAssistantSection />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
