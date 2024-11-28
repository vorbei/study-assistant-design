import React, { useState, useCallback } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, X, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDropzone } from 'react-dropzone';
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  createdAt: Date;
  file?: File;
}

export const StudyAssistantLibrarySection = () => {
  const [taskName, setTaskName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      if (!taskName) {
        setTaskName(file.name.replace(/\.[^/.]+$/, ""));
      }
      toast.success(`已选择文件: ${file.name}`);
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

  const handleCreateTask = () => {
    if (!taskName.trim()) {
      toast.error('请输入任务名称');
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: taskName,
      createdAt: new Date(),
      file: selectedFile || undefined
    };

    setTasks(prev => [newTask, ...prev]);
    setTaskName('');
    setSelectedFile(null);
    toast.success('任务创建成功');
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    toast.success('任务已删除');
  };

  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'txt':
        return '📃';
      default:
        return '📄';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  return (
    <div className="min-h-screen bg-neutral-50/50 p-8">
      {/* Header */}
      <div className="max-w-[1200px] mx-auto flex items-center mb-8">
        <div className="flex items-center gap-2">
          <div className="text-blue-600 text-2xl">✦</div>
          <span className="font-medium">智能学习助手</span>
        </div>
      </div>

      {/* Main Content */}
      <Card className="max-w-[1200px] mx-auto p-16 min-h-[800px]">
        <div className="grid grid-cols-[1fr,1fr] gap-16">
          {/* Left Content */}
          <div className="flex flex-col justify-start">
            <h1 className="text-4xl font-medium text-blue-600 mb-12">
              欢迎来到智能学习助手！
            </h1>
            <div 
              {...getRootProps()}
              className="relative mb-8"
            >
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
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = '.pdf,.doc,.docx,.txt';
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) {
                          setSelectedFile(file);
                          if (!taskName) {
                            setTaskName(file.name.replace(/\.[^/.]+$/, ""));
                          }
                          toast.success(`已选择文件: ${file.name}`);
                        }
                      };
                      input.click();
                    }}
                  >
                    <Upload className="h-4 w-4 text-neutral-3" />
                  </Button>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCreateTask();
                    }}
                  >
                    创建
                  </Button>
                </div>
              </div>

              {/* Selected File Display */}
              {selectedFile && (
                <div className="mt-2 p-3 bg-neutral-7/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-xl">
                        {getFileIcon(selectedFile.name)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-neutral-1">
                          {selectedFile.name}
                        </div>
                        <div className="text-xs text-neutral-3">
                          {formatFileSize(selectedFile.size)}
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

            {/* Task List */}
            {tasks.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {tasks.map(task => (
                  <div 
                    key={task.id} 
                    className="aspect-square p-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl relative group"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-3 right-3 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/50 hover:text-red-500"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                    <div className="flex flex-col h-full">
                      <div className="text-xl mb-2">
                        {task.file ? getFileIcon(task.file.name) : '📝'}
                      </div>
                      <div className="flex-grow">
                        <div className="text-sm font-medium text-neutral-1 mb-1 line-clamp-2">
                          {task.title}
                        </div>
                      </div>
                      <div className="text-xs text-neutral-3">
                        {new Intl.DateTimeFormat('zh-CN', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit'
                        }).format(task.createdAt)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-neutral-3 py-8">
                还没有任务，创建一个新任务开始学习吧！
              </div>
            )}
          </div>

          {/* Right Illustration */}
          <div className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">🤖</span>
              </div>
              <div className="absolute top-1/4 right-0 max-w-[200px] p-4 bg-blue-600 text-white rounded-lg">
                你好！我是你的学习助手
              </div>
              <div className="absolute bottom-1/4 left-0 max-w-[200px] p-4 bg-pink-500 text-white rounded-lg">
                让我们开始学习吧！
              </div>
              <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">👩‍🎓</span>
              </div>
              <div className="absolute inset-0 border-2 border-dashed border-neutral-200 rounded-full animate-spin-slow" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
