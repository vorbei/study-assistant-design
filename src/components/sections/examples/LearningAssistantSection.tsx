import React, { useState, useCallback } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Upload, Trash2, X, FileText, BookOpen, PenTool } from "lucide-react";
import { useDropzone } from 'react-dropzone';
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ExamSection } from './ExamSection';

interface Task {
  id: string;
  title: string;
  createdAt: Date;
  file?: File;
}

export const LearningAssistantSection = () => {
  const [taskName, setTaskName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      if (!taskName) {
        setTaskName(file.name.replace(/\.[^/.]+$/, "")); // 移除文件扩展名
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
    <Tabs defaultValue="exam" className="space-y-4">
      {/* Navigation Bar */}
      <Card className="p-4 max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-blue-600 text-2xl">✦</div>
            <span className="font-medium text-xl">医学基础知识</span>
          </div>
          
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="learning" className="gap-2">
              <BookOpen className="w-4 h-4" />
              自学助手
            </TabsTrigger>
            <TabsTrigger value="exam" className="gap-2">
              <PenTool className="w-4 h-4" />
              模拟考核
            </TabsTrigger>
          </TabsList>

          <div className="w-[120px]">
            {/* Placeholder for balance */}
          </div>
        </div>
      </Card>

      {/* Main Content */}
      <Card className="p-8 max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="text-blue-600 text-2xl">✦</div>
            <span className="text-blue-600 font-medium">智能学习助手</span>
          </div>
          
          {/* Search Input with File Drop */}
          <div className="max-w-xl">
            <div 
              {...getRootProps()}
              className="relative"
            >
              <input {...getInputProps()} />
              <div className={cn(
                "absolute inset-0 rounded-lg border-2 border-dashed pointer-events-none transition-colors",
                isDragActive ? "border-blue-600 bg-blue-50/50" : "border-transparent"
              )} />
              <div className="relative flex items-center">
                <Input
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder="输入学习任务名称，或拖入文件以创建任务"
                  className={cn(
                    "pr-24 h-12",
                    isDragActive ? "bg-blue-50/50" : "bg-neutral-7/50"
                  )}
                />
                <div className="absolute right-1 flex gap-2">
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
                            setTaskName(file.name.replace(/\.[^/.]+$/, "")); // 移除文件扩展名
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
                    className="bg-blue-600 hover:bg-blue-700 text-white"
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
          </div>
        </div>

        {/* Task List and Content */}
        {tasks.length > 0 ? (
          <>
            <TabsContent value="learning">
              <div className="text-center text-neutral-3 py-8">
                自学助手功能开发中...
              </div>
            </TabsContent>
            <TabsContent value="exam">
              <ExamSection />
            </TabsContent>
          </>
        ) : (
          <>
            <TabsContent value="learning">
              <div className="text-center text-neutral-3 py-8">
                还没有任务，创建一个新任务开始学习吧！
              </div>
            </TabsContent>
            <TabsContent value="exam">
              <div className="text-center text-neutral-3 py-8">
                还没有任务，创建一个新任务开始学习吧！
              </div>
            </TabsContent>
          </>
        )}
      </Card>
    </Tabs>
  );
};
