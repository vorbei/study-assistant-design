import React, { useState, useCallback } from 'react';
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { useDropzone } from 'react-dropzone';
import { toast } from "sonner";
import { LibraryTaskItem, Task } from './LibraryTaskItem';

interface Task {
  id: string;
  title: string;
  createdAt: Date;
  file: File;
}

export interface LibraryModuleProps {
  className?: string;
  initialTasks?: Task[];
}

export const LibraryModule: React.FC<LibraryModuleProps> = ({
  className,
  initialTasks = []
}) => {
  const [taskName, setTaskName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTaskName, setEditingTaskName] = useState('');

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    if (!taskName) {
      setTaskName(file.name.replace(/\.[^/.]+$/, ""));
    }
    createTask(file);
    toast.success(`已选择文件: ${file.name}`);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      handleFileSelect(acceptedFiles[0]);
    }
  }, [taskName]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxFiles: 1,
    noClick: true,
  });

  const triggerFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.txt';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        handleFileSelect(file);
      }
    };
    input.click();
  };

  const createTask = (file: File) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskName || file.name.replace(/\.[^/.]+$/, ""),
      createdAt: new Date(),
      file: file
    };

    setTasks(prev => [newTask, ...prev]);
    setTaskName('');
    setSelectedFile(null);
    toast.success('任务创建成功');
  };

  const handleCreateTask = () => {
    if (!selectedFile) {
      toast.error('请先上传文件');
      triggerFileUpload();
      return;
    }

    if (!taskName.trim()) {
      toast.error('请输入任务名称');
      return;
    }

    createTask(selectedFile);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    toast.success('任务已删除');
  };

  const handleStartEdit = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingTaskName(task.title);
  };

  const handleFinishEdit = () => {
    if (!editingTaskId || !editingTaskName.trim()) return;
    
    setTasks(prev => prev.map(task => 
      task.id === editingTaskId 
        ? { ...task, title: editingTaskName.trim() }
        : task
    ));
    setEditingTaskId(null);
    setEditingTaskName('');
    toast.success('任务名称已更新');
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingTaskName('');
  };

  return (
    <div className={cn("flex flex-col w-full", className)}>
      <div className="w-full">
        <h2 className="text-xl font-medium mb-4">开始创建你的学习任务</h2>
        <div {...getRootProps()} className="relative mb-8">
          <input {...getInputProps()} />
          <div className={cn(
            "absolute inset-0 rounded-lg border-2 border-dashed pointer-events-none transition-colors",
            isDragActive ? "border-blue-600 bg-blue-50/50" : "border-transparent"
          )} />
          <div className="relative">
            <Input
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="输入学习任务名称，或拖入文件以创建任务"
              className={cn(
                "h-12 pr-24",
                isDragActive ? "bg-blue-50/50" : "bg-neutral-7/50"
              )}
            />
            <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10"
                onClick={(e) => {
                  e.stopPropagation();
                  triggerFileUpload();
                }}
              >
                <Upload className="h-4 w-4 text-neutral-3" />
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 h-10 flex items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCreateTask();
                }}
              >
                创建
              </Button>
            </div>
          </div>

          {selectedFile && (
            <div className="mt-2 p-3 bg-neutral-7/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-xs text-neutral-3">
                    {selectedFile.name.split('.').pop()?.toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-neutral-1">
                      {selectedFile.name}
                    </div>
                    <div className="text-xs text-neutral-3">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-neutral-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {tasks.length > 0 ? (
          <div className="flex flex-wrap gap-6">
            {tasks.map(task => (
              <LibraryTaskItem
                key={task.id}
                task={task}
                isEditing={editingTaskId === task.id}
                editingName={editingTaskName}
                onStartEdit={handleStartEdit}
                onFinishEdit={handleFinishEdit}
                onCancelEdit={handleCancelEdit}
                onDelete={handleDeleteTask}
                onEditingNameChange={setEditingTaskName}
              />
            ))}
          </div>
        ) : (
          <div className="text-left text-neutral-3 py-8">
            快来创建你的第一个学习任务，开启智能学习之旅吧！
          </div>
        )}
      </div>
    </div>
  );
};
