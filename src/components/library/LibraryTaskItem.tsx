import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

export interface Task {
  id: string;
  title: string;
  createdAt: Date;
  file: File;
}

interface LibraryTaskItemProps {
  task: Task;
  isEditing: boolean;
  editingName: string;
  onStartEdit: (task: Task) => void;
  onFinishEdit: () => void;
  onCancelEdit: () => void;
  onDelete: (taskId: string) => void;
  onEditingNameChange: (value: string) => void;
}

export const LibraryTaskItem: React.FC<LibraryTaskItemProps> = ({
  task,
  isEditing,
  editingName,
  onStartEdit,
  onFinishEdit,
  onCancelEdit,
  onDelete,
  onEditingNameChange,
}) => {
  return (
    <div 
      className="w-[240px] h-[240px] p-6 bg-gradient-to-br from-blue-200 to-blue-50/50 rounded-lg relative group hover:shadow-lg transition-all duration-300"
    >
      <div className="flex flex-col h-full">
        <div>
          {isEditing ? (
            <div className="flex gap-2">
              <Input
                type="text"
                value={editingName}
                onChange={(e) => onEditingNameChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onFinishEdit();
                  } else if (e.key === 'Escape') {
                    onCancelEdit();
                  }
                }}
                className="h-8 text-sm bg-white rounded-2"
                autoFocus
              />
            </div>
          ) : (
            <div className="text-base font-medium text-neutral-1">
              {task.title}
            </div>
          )}
          {task.file && (
            <div className="text-xs text-neutral-3 mt-1">
              {task.file.name}
            </div>
          )}
        </div>
        <div className="flex-grow" />
        <div className="flex items-center justify-between">
          <div className="text-sm text-neutral-3/75">
            {new Intl.DateTimeFormat('zh-CN', {
              month: 'short',
              day: 'numeric'
            }).format(task.createdAt)}
          </div>
          {!isEditing && (
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 hover:bg-white/50 hover:text-blue-500 p-1.5 text-neutral-3"
                onClick={() => onStartEdit(task)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                  <path d="m15 5 4 4"/>
                </svg>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 hover:bg-white/50 hover:text-red-500 p-1.5 text-neutral-3"
                onClick={() => onDelete(task.id)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
