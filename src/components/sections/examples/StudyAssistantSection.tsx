import React, { useState } from 'react';
import { StudyAssistantNav } from './StudyAssistantNav';
import { StudyAssistantModule } from '@/components/study/StudyAssistantModule';
import { ExamModule } from '@/components/exam/ExamModule';

export const StudyAssistantSection = () => {
  const [mode, setMode] = useState<'study' | 'exam'>('study');

  const handleBackToAllTasks = () => {
    // TODO: 实现返回全部任务逻辑
    console.log('返回全部任务');
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-7">
      <StudyAssistantNav
        projectName="智能学习助手"
        fileName="自然语言处理.pdf"
        mode={mode}
        onModeChange={setMode}
        onBackToAllTasks={handleBackToAllTasks}
      />
      <div className="flex-1">
        {mode === 'study' ? (
          <StudyAssistantModule />
        ) : (
          <ExamModule />
        )}
      </div>
    </div>
  );
};
