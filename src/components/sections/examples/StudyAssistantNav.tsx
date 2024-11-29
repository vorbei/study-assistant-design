import React from 'react';
import { cn } from "@/lib/utils";
import { FileText, GraduationCap, ChevronLeft, User, LogOut, Settings, Star, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StudyAssistantNavProps {
  className?: string;
  projectName?: string;
  fileName?: string;
  mode?: 'study' | 'exam';
  onModeChange?: (mode: 'study' | 'exam') => void;
  onBackToAllTasks?: () => void;
  userAvatar?: string;
  userName?: string;
  onLogout?: () => void;
  onSettings?: () => void;
  createdAt?: Date;
  fileSize?: number;
}

export const StudyAssistantNav: React.FC<StudyAssistantNavProps> = ({
  className,
  projectName,
  fileName,
  mode,
  onModeChange,
  onBackToAllTasks,
  userAvatar,
  userName = "用户",
  onLogout,
  onSettings,
  createdAt,
  fileSize,
}) => {
  const hasProject = Boolean(projectName && fileName);

  return (
    <nav className={cn("h-14 px-6 border-b bg-white", className)}>
      <div className="h-full flex items-center justify-between">
        {/* 左侧区域 */}
        <div className="flex items-center gap-4">
          {/* Logo和系统名称 */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-blue-600 text-white">
              <Star className="w-5 h-5" />
            </div>
            <span className="text-lg font-medium">智能学习助手</span>
          </div>

          {hasProject && (
            <>
              {/* 返回按钮 */}
              <button
                onClick={onBackToAllTasks}
                className="flex items-center gap-1.5 text-sm text-neutral-3 hover:text-neutral-1"
              >
                <ChevronLeft className="h-4 w-4" />
                返回
              </button>

              {/* 分隔线 */}
              <div className="w-px h-8 bg-neutral-5" />

              {/* 项目信息 */}
              <div className="flex flex-col">
                <h2 className="text-base font-medium leading-tight">{projectName}</h2>
                <div className="flex items-center gap-1 mt-0.5 text-xs text-neutral-3">
                  <FileText className="h-3 w-3" />
                  <span>{fileName}</span>
                  {createdAt && (
                    <>
                      <span>•</span>
                      <span>{new Intl.DateTimeFormat('zh-CN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }).format(createdAt)}</span>
                    </>
                  )}
                  {fileSize && (
                    <>
                      <span>•</span>
                      <span>{(fileSize / 1024).toFixed(1)} KB</span>
                    </>
                  )}
                </div>
              </div>

              {/* 功能切换 */}
              <div className="flex items-center gap-8 ml-16">
                <button
                  onClick={() => onModeChange?.('study')}
                  className={cn(
                    "relative px-4 py-2 text-sm transition-colors",
                    mode === 'study' ? "text-blue-600" : "text-neutral-3 hover:text-neutral-1"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    学习模式
                  </div>
                  {mode === 'study' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
                <button
                  onClick={() => onModeChange?.('exam')}
                  className={cn(
                    "relative px-4 py-2 text-sm transition-colors",
                    mode === 'exam' ? "text-blue-600" : "text-neutral-3 hover:text-neutral-1"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    考试模式
                  </div>
                  {mode === 'exam' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        {/* 右侧用户信息 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 hover:bg-neutral-7/50 p-1.5 rounded-lg transition-colors">
              <Avatar className="h-7 w-7">
                <AvatarImage src={userAvatar} />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <span className="text-sm">{userName}</span>
              <ChevronDown className="h-4 w-4 text-neutral-3" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>我的账户</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onSettings}>
              <Settings className="mr-2 h-4 w-4" />
              <span>设置</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>退出登录</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};
