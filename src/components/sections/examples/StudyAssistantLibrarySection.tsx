import React, { useState, useCallback } from 'react';
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, X, Trash2 } from "lucide-react";
import { useDropzone } from 'react-dropzone';
import { toast } from "sonner";
import libImage from '@/assets/lib-image.svg';

interface Task {
  id: string;
  title: string;
  createdAt: Date;
  file: File;
}

export const StudyAssistantLibrarySection = () => {
  const [taskName, setTaskName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTaskName, setEditingTaskName] = useState('');

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    if (!taskName) {
      setTaskName(file.name.replace(/\.[^/.]+$/, ""));
    }
    // 文件上传后直接创建任务
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
    <Card className="p-16 min-h-[600px]">
      <div className="flex flex-col max-w-[1600px] mx-auto w-full">
        <h1 className="text-4xl font-bold mb-16 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">欢迎来到智能学习助手</h1>
        <div className="flex gap-16">
          <div className="w-[800px]">
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
                  <div 
                    key={task.id} 
                    className="w-[240px] h-[240px] p-6 bg-gradient-to-br from-blue-200 to-blue-50/50 rounded-lg relative group hover:shadow-lg transition-all duration-300"
                  >
                    {editingTaskId !== task.id && (
                      <div className="absolute top-0 right-0 p-3 flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 hover:bg-white/50 hover:text-blue-500 p-1.5 text-neutral-3"
                          onClick={() => handleStartEdit(task)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 hover:bg-white/50 hover:text-red-500 p-1.5 text-neutral-3"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    <div className="flex flex-col h-full">
                      <div>
                        {editingTaskId === task.id ? (
                          <div className="flex gap-2">
                            <Input
                              type="text"
                              value={editingTaskName}
                              onChange={(e) => setEditingTaskName(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleFinishEdit();
                                } else if (e.key === 'Escape') {
                                  handleCancelEdit();
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
                      <div className="text-sm text-neutral-3/75">
                        {new Intl.DateTimeFormat('zh-CN', {
                          month: 'short',
                          day: 'numeric'
                        }).format(task.createdAt)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-left text-neutral-3 py-8">
                快来创建你的第一个学习任务，开启智能学习之旅吧！
              </div>
            )}
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
