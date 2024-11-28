import React, { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/layout/Sidebar";
import { toast } from "@/components/ui/use-toast";
import { Masonry } from "@/components/ui/masonry";
import {
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Check,
  X,
  AlertCircle,
  Info,
  Plus,
  Minus,
  Edit,
  Trash,
  Search,
  Settings,
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  Home,
  Menu,
  Share,
  Download,
  Upload,
  RefreshCw,
  ExternalLink,
  Copy,
  Save,
  Filter,
  ArrowUpDown,
  // 医学相关图标
  Heart,
  Stethoscope,
  Pill,
  Thermometer,
  Activity,
  Brain,
  Syringe,
  Cross,
  // 数据库相关图标
  Database,
  Server,
  HardDrive,
  FolderTree,
  Table,
  BarChart,
  LineChart,
  PieChart,
  // AI相关图标
  Cpu,
  CircuitBoard,
  Bot,
  Network,
  Lightbulb,
  Sparkles,
  Workflow,
  Binary,
} from 'lucide-react';

// 示例图标分类
const iconSections = [
  {
    id: "direction",
    title: 'Direction - 方向指示',
    href: '#icons/direction',
    icons: [
      { icon: ArrowRight, name: "arrow-right" },
      { icon: ArrowLeft, name: "arrow-left" },
      { icon: ArrowUp, name: "arrow-up" },
      { icon: ArrowDown, name: "arrow-down" },
      { icon: ChevronRight, name: "chevron-right" },
      { icon: ChevronLeft, name: "chevron-left" },
      { icon: ChevronUp, name: "chevron-up" },
      { icon: ChevronDown, name: "chevron-down" },
    ],
  },
  {
    id: "status",
    title: 'Status - 状态指示',
    href: '#icons/status',
    icons: [
      { icon: Check, name: "check" },
      { icon: X, name: "x" },
      { icon: AlertCircle, name: "alert-circle" },
      { icon: Info, name: "info" },
      { icon: RefreshCw, name: "loading" },
    ],
  },
  {
    id: "action",
    title: 'Action - 操作图标',
    href: '#icons/action',
    icons: [
      { icon: Plus, name: "add" },
      { icon: Minus, name: "minus" },
      { icon: Edit, name: "edit" },
      { icon: Trash, name: "delete" },
      { icon: Search, name: "search" },
      { icon: Settings, name: "settings" },
      { icon: Share, name: "share" },
      { icon: Download, name: "download" },
      { icon: Upload, name: "upload" },
      { icon: ExternalLink, name: "external-link" },
      { icon: Copy, name: "copy" },
      { icon: Save, name: "save" },
      { icon: Filter, name: "filter" },
      { icon: ArrowUpDown, name: "sort" },
    ],
  },
  {
    id: "common",
    title: 'Common - 通用图标',
    href: '#icons/common',
    icons: [
      { icon: User, name: "user" },
      { icon: Mail, name: "mail" },
      { icon: Phone, name: "phone" },
      { icon: Calendar, name: "calendar" },
      { icon: Clock, name: "clock" },
      { icon: Home, name: "home" },
      { icon: Menu, name: "menu" },
    ],
  },
  {
    id: "medical",
    title: 'Medical - 医疗图标',
    href: '#icons/medical',
    icons: [
      { icon: Heart, name: "heart" },
      { icon: Stethoscope, name: "stethoscope" },
      { icon: Pill, name: "pill" },
      { icon: Thermometer, name: "thermometer" },
      { icon: Activity, name: "activity" },
      { icon: Brain, name: "brain" },
      { icon: Syringe, name: "syringe" },
      { icon: Cross, name: "medical-cross" },
    ],
  },
  {
    id: "database",
    title: 'Database - 数据库',
    href: '#icons/database',
    icons: [
      { icon: Database, name: "database" },
      { icon: Server, name: "server" },
      { icon: HardDrive, name: "hard-drive" },
      { icon: FolderTree, name: "folder-tree" },
      { icon: Table, name: "table" },
      { icon: BarChart, name: "bar-chart" },
      { icon: LineChart, name: "line-chart" },
      { icon: PieChart, name: "pie-chart" },
    ],
  },
  {
    id: "ai",
    title: 'AI - 人工智能',
    href: '#icons/ai',
    icons: [
      { icon: Cpu, name: "cpu" },
      { icon: CircuitBoard, name: "circuit-board" },
      { icon: Bot, name: "bot" },
      { icon: Network, name: "network" },
      { icon: Lightbulb, name: "lightbulb" },
      { icon: Sparkles, name: "sparkles" },
      { icon: Workflow, name: "workflow" },
      { icon: Binary, name: "binary" },
    ],
  },
];

interface IconCardProps {
  icon: React.ComponentType<any>;
  name: string;
}

const IconCard = ({ icon: Icon, name }: IconCardProps) => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleCopy = async () => {
    try {
      const svg = document.querySelector(`[data-icon="${name}"] svg`)?.outerHTML;
      if (!svg) throw new Error("No SVG found");

      await navigator.clipboard.writeText(svg);
      setCopied(true);
      toast({
        title: "复制成功",
        description: "SVG 代码已复制到剪贴板",
        duration: 2000,
      });

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      toast({
        title: "复制失败",
        description: "请重试",
        duration: 2000,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <button
      data-icon={name}
      onClick={handleCopy}
      className={cn(
        "relative flex flex-col items-center justify-center p-2 rounded-lg w-16 h-16",
        "hover:bg-neutral-7 active:bg-neutral-8 transition-all duration-g1",
        "group cursor-pointer"
      )}
    >
      <Icon className={cn(
        "w-5 h-5 transition-colors duration-300 relative z-10",
        copied ? "text-green-600" : "text-neutral-3 group-hover:text-neutral-11"
      )} />
      <div
        className={cn(
          "absolute inset-0 bg-green-1100 rounded-lg transition-all duration-300",
          copied ? "opacity-100" : "opacity-0"
        )}
      />
      <span className={cn(
        "text-xs text-neutral-11 transition-all duration-g1 truncate max-w-full absolute bottom-1 z-10",
        "opacity-0 group-hover:opacity-100"
      )}>
        {name}
      </span>
    </button>
  );
};

export const IconsPage = () => {
  const [activeSection, setActiveSection] = useState(iconSections[0].id);
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth - 256; // 减去侧边栏宽度
      setColumns(width < 1024 ? 2 : 3);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (!hash.startsWith('icons/')) return;
      
      const sectionId = hash.replace('icons/', '');
      const section = iconSections.find(s => s.id === sectionId);
      if (section) {
        setActiveSection(section.id);
        const element = document.querySelector(`#${section.id}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        setActiveSection(iconSections[0].id);
        window.location.hash = `icons/${iconSections[0].id}`;
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSectionChange = (sectionId: string) => {
    const section = iconSections.find(s => s.id === sectionId);
    if (section) {
      setActiveSection(section.id);
      window.location.hash = `icons/${section.id}`;
      const element = document.querySelector(`#${sectionId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const sections = iconSections.map(section => ({
    id: section.id,
    name: section.title,
    href: section.href
  }));

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
            <Masonry columns={columns} gap={32}>
              {iconSections.map((section) => (
                <div 
                  key={section.id} 
                  id={section.id} 
                  className="bg-white rounded-lg shadow-3 px-4 py-5 w-full mb-6 hover:shadow-4 transition-shadow"
                >
                  <div className="mb-4">
                    <h2 className="text-lg font-medium mb-2">{section.title}</h2>
                    <p className="text-sm text-neutral-11">
                      {section.id === "direction" && "用于指示方向、展开/收起等操作的图标"}
                      {section.id === "status" && "用于表示不同状态的图标"}
                      {section.id === "action" && "用于表示可交互操作的图标"}
                      {section.id === "common" && "常用的通用功能图标"}
                      {section.id === "medical" && "医疗和健康相关的图标"}
                      {section.id === "database" && "数据库和数据分析相关的图标"}
                      {section.id === "ai" && "人工智能和机器学习相关的图标"}
                    </p>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 -ml-2 pr-2">
                    {section.icons.map(({ icon, name }) => (
                      <IconCard key={name} icon={icon} name={name} />
                    ))}
                  </div>
                </div>
              ))}
            </Masonry>
          </div>
        </main>
      </div>
    </div>
  );
};
