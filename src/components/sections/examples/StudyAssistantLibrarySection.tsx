import React from 'react';
import { Card } from "@/components/ui/card";
import libImage from '@/assets/lib-image.svg';
import { LibraryModule } from '@/components/library/LibraryModule';
import { StudyAssistantNav } from './StudyAssistantNav';

export const StudyAssistantLibrarySection = () => {
  return (
    <Card className="p-16 min-h-[600px]">
      <div className="flex flex-col max-w-[1600px] mx-auto w-full">
      <StudyAssistantNav />
      <h1 className="text-4xl font-bold mb-16 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">欢迎来到智能学习助手</h1>
        <div className="flex gap-16">
          <div className="w-[800px]">
            <LibraryModule />
          </div>
          <div className="flex-1 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-xl overflow-hidden">
              <img
                src={libImage}
                alt="Study Illustration"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
