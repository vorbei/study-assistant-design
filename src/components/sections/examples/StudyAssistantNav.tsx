import React from 'react';
import { cn } from "@/lib/utils";
import { FileText, GraduationCap, ChevronLeft } from "lucide-react";

interface StudyAssistantNavProps {
  className?: string;
  projectName: string;
  fileName: string;
  mode: 'study' | 'exam';
  onModeChange: (mode: 'study' | 'exam') => void;
  onBackToAllTasks?: () => void;
}

export const StudyAssistantNav: React.FC<StudyAssistantNavProps> = ({
  className,
  projectName,
  fileName,
  mode,
  onModeChange,
  onBackToAllTasks,
}) => {
  return (
    <div className={cn(
      "flex items-center h-14 px-6 border-b bg-white",
      className
    )}>
      <div className="flex items-center gap-6">
        <button
          onClick={onBackToAllTasks}
          className="flex items-center gap-1.5 text-sm text-neutral-3 hover:text-neutral-1"
        >
          <ChevronLeft className="h-4 w-4" />
          全部任务
        </button>
        <div className="w-px h-4 bg-neutral-5" />
        <h2 className="text-lg font-medium">{projectName}</h2>
        <div className="text-sm text-neutral-3 flex items-center gap-2">
          <FileText className="h-4 w-4" />
          {fileName}
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center gap-8">
        <button
          onClick={() => onModeChange('study')}
          className={cn(
            "relative px-4 py-2 text-sm transition-colors",
            mode === 'study' ? "text-blue-600" : "text-neutral-3 hover:text-neutral-1"
          )}
        >
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            自学助手
          </div>
          {mode === 'study' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
          )}
        </button>
        <button
          onClick={() => onModeChange('exam')}
          className={cn(
            "relative px-4 py-2 text-sm transition-colors",
            mode === 'exam' ? "text-blue-600" : "text-neutral-3 hover:text-neutral-1"
          )}
        >
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            模拟考试
          </div>
          {mode === 'exam' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
          )}
        </button>
      </div>
      <div className="w-[200px]" />
    </div>
  );
};
