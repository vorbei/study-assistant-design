import * as React from "react"
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { MenuIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ChevronLeftIcon, ChevronRightIcon, UploadIcon } from 'lucide-react';
import { TimePicker } from "@/components/ui/time-picker"
import { Transfer } from "@/components/ui/transfer"
import { Tree } from "@/components/ui/tree"
import { Sidebar } from "@/components/layout/Sidebar";
import { MoreHorizontal } from 'lucide-react';

const formSchema = z.object({
  username: z.string().min(2, {
    message: "用户名必须至少2个字符。",
  }),
  email: z.string().email({
    message: "请输入有效的邮箱地址。",
  }),
});

const TableExample = () => {
  const [data] = React.useState([
    { id: 1, name: '张三', time: '2024-02-20 09:00', department: '内科', doctor: '王医生', status: '已完成', fee: '￥150' },
    { id: 2, name: '李四', time: '2024-02-21 14:30', department: '外科', doctor: '刘医生', status: '待就诊', fee: '￥200' },
    { id: 3, name: '王五', time: '2024-02-22 10:00', department: '儿科', doctor: '陈医生', status: '已取消', fee: '￥180' },
    { id: 4, name: '赵六', time: '2024-02-23 15:00', department: '骨科', doctor: '林医生', status: '待付款', fee: '￥250' },
    { id: 5, name: '孙七', time: '2024-02-24 11:30', department: '眼科', doctor: '张医生', status: '已完成', fee: '￥160' },
  ]);

  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);

  const [sortConfig, setSortConfig] = React.useState<{
    key: keyof typeof data[0];
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (key: keyof typeof data[0]) => {
    setSortConfig(current => {
      if (!current || current.key !== key) {
        return { key, direction: 'asc' };
      }
      if (current.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return null;
    });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map(row => row.id));
    }
  };

  const handleSelectRow = (id: number) => {
    setSelectedRows(current =>
      current.includes(id)
        ? current.filter(rowId => rowId !== id)
        : [...current, id]
    );
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedRows.length === data.length}
                onCheckedChange={handleSelectAll}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead
              sorted={sortConfig?.key === 'name' ? sortConfig.direction : false}
              onSort={() => handleSort('name')}
            >
              姓名
            </TableHead>
            <TableHead
              sorted={sortConfig?.key === 'time' ? sortConfig.direction : false}
              onSort={() => handleSort('time')}
            >
              就诊时间
            </TableHead>
            <TableHead
              sorted={sortConfig?.key === 'department' ? sortConfig.direction : false}
              onSort={() => handleSort('department')}
            >
              科室
            </TableHead>
            <TableHead
              sorted={sortConfig?.key === 'doctor' ? sortConfig.direction : false}
              onSort={() => handleSort('doctor')}
            >
              主治医生
            </TableHead>
            <TableHead
              sorted={sortConfig?.key === 'status' ? sortConfig.direction : false}
              onSort={() => handleSort('status')}
            >
              状态
            </TableHead>
            <TableHead
              sorted={sortConfig?.key === 'fee' ? sortConfig.direction : false}
              onSort={() => handleSort('fee')}
            >
              费用
            </TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((row) => (
            <TableRow 
              key={row.id}
              data-state={selectedRows.includes(row.id) ? 'selected' : undefined}
            >
              <TableCell>
                <div>
                  <Checkbox
                    checked={selectedRows.includes(row.id)}
                    onCheckedChange={() => handleSelectRow(row.id)}
                    aria-label={`Select ${row.name}`}
                  />
                </div>
              </TableCell>
              <TableCell>
                <div>{row.name}</div>
              </TableCell>
              <TableCell>
                <div>{row.time}</div>
              </TableCell>
              <TableCell>
                <div>{row.department}</div>
              </TableCell>
              <TableCell>
                <div>{row.doctor}</div>
              </TableCell>
              <TableCell>
                <div>{row.status}</div>
              </TableCell>
              <TableCell>
                <div>{row.fee}</div>
              </TableCell>
              <TableCell>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const components = [
  {
    id: "button",
    title: 'Button 按钮',
    href: '#components/button',
    component: () => (
      <div className="flex flex-wrap gap-4">
        <Button>开始问诊</Button>
        <Button variant="destructive">紧急呼叫</Button>
        <Button variant="outline">预约挂号</Button>
        <Button variant="secondary">查看报告</Button>
        <Button variant="ghost">历史记录</Button>
        <Button variant="link">帮助中心</Button>
        <Button disabled>暂不可用</Button>
      </div>
    ),
  },
  {
    id: "radio",
    title: 'Radio 单选框',
    href: '#components/radio',
    component: () => (
      <div className="space-y-6">
        <RadioGroup defaultValue="online">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="online" id="online" />
            <Label className="font-normal" htmlFor="online">线上问诊</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="offline" id="offline" />
            <Label className="font-normal" htmlFor="offline">门诊就医</Label>
          </div>
        </RadioGroup>
      </div>
    ),
  },
  {
    id: "checkbox",
    title: 'Checkbox 多选框',
    href: '#components/checkbox',
    component: () => (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-base">选择服务</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label className="font-normal" htmlFor="terms">我已阅读并同意《用户隐私协议》</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="subscribe" />
              <Label className="font-normal" htmlFor="subscribe">订阅健康咨询周报</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="disabled" disabled />
              <Label className="font-normal" htmlFor="disabled">暂不可用</Label>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "input",
    title: 'Input 输入框',
    href: '#components/input',
    component: () => (
      <div className="flex flex-col gap-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="font-normal" htmlFor="name">姓名</Label>
          <Input type="text" id="name" placeholder="请输入真实姓名" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="font-normal" htmlFor="idcard">身份证号</Label>
          <Input type="text" id="idcard" placeholder="请输入身份证号码" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="font-normal" htmlFor="phone">手机号</Label>
          <Input type="tel" id="phone" placeholder="请输入手机号码" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="font-normal" htmlFor="disabled">不可用</Label>
          <Input type="text" id="disabled" disabled placeholder="暂不可用" />
        </div>
      </div>
    ),
  },
  {
    id: "switch",
    title: 'Switch 开关',
    href: '#components/switch',
    component: () => (
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="text-sm text-neutral-11 mb-2">默认样式 - 用于常规的开关场景</div>
          <div className="flex items-center space-x-4">
            <Switch id="default-switch" />
            <Label htmlFor="default-switch" className="font-normal">开启通知</Label>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-neutral-11 mb-2">警示样式 - 用于需要警示用户的危险操作</div>
          <div className="flex items-center space-x-4">
            <Switch id="danger-switch" variant="destructive" />
            <Label htmlFor="danger-switch" className="text-[#CC3D55] font-normal">允许删除数据</Label>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-neutral-11 mb-2">禁用状态</div>
          <div className="flex items-center space-x-4">
            <Switch id="disabled-switch" disabled />
            <Label htmlFor="disabled-switch" className="text-neutral-6 font-normal">禁用选项</Label>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "slider",
    title: 'Slider 滑块',
    href: '#components/slider',
    component: () => {
      const [value, setValue] = React.useState(60);
      
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-8">
            <div className="flex-1">
              <Label className="font-normal mb-2">运动强度</Label>
              <Slider
                value={[value]}
                onValueChange={([newValue]) => setValue(newValue)}
                max={100}
                step={20}
                className="w-full"
                marks={[
                  { value: 0, label: '休息' },
                  { value: 20, label: '轻度' },
                  { value: 40, label: '中度' },
                  { value: 60, label: '适中' },
                  { value: 80, label: '剧烈' },
                  { value: 100, label: '极限' },
                ]}
              />
              <p className="text-sm text-neutral-3 mt-2">
                {value <= 20 && "适合恢复期和初学者"}
                {value > 20 && value <= 40 && "适合日常健身维持"}
                {value > 40 && value <= 60 && "适合增强体能"}
                {value > 60 && value <= 80 && "适合专业训练"}
                {value > 80 && "需要专业指导"}
              </p>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    id: "progress",
    title: 'Progress 进度条',
    href: '#components/progress',
    component: () => {
      const [progress, setProgress] = useState(13);

      return (
        <div className="space-y-8">
          <div className="space-y-2">
            <Label className="font-normal">问诊进度</Label>
            <Progress value={33} className="w-[60%]" />
          </div>
          <div className="space-y-2">
            <Label className="font-normal">报告生成中</Label>
            <Progress value={66} className="w-[60%]" />
          </div>
          <div className="space-y-2">
            <Label className="font-normal">处方开具完成</Label>
            <Progress value={100} className="w-[60%]" />
          </div>
        </div>
      );
    },
  },
  {
    id: "select",
    title: 'Select 选择器',
    href: '#components/select',
    component: () => (
      <div className="flex flex-col gap-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="font-normal">科室选择</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="请选择就诊科室" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="internal">内科</SelectItem>
              <SelectItem value="surgery">外科</SelectItem>
              <SelectItem value="pediatrics">儿科</SelectItem>
              <SelectItem value="gynecology">妇科</SelectItem>
              <SelectItem value="other">其他科室</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    ),
  },
  {
    id: "datepicker",
    title: 'DatePicker 日期选择器',
    href: '#components/datepicker',
    component: () => {
      const [date, setDate] = useState<Date | undefined>(new Date());
      
      return (
        <div className="flex justify-center items-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
      );
    },
  },
  {
    id: "table",
    title: 'Table 表格',
    href: '#components/table',
    component: TableExample,
  },
  {
    id: "form",
    title: 'Form 表单',
    href: '#components/form',
    component: () => {
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          email: "",
        },
      });

      function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
      }

      return (
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">用户名</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入用户名" {...field} />
                    </FormControl>
                    <FormDescription>
                      用于登录开心健康平台
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">邮箱</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入邮箱" {...field} />
                    </FormControl>
                    <FormDescription>
                      用于接收健康报告和医疗建议
                    </FormDescription>
                  </FormItem>
                )}
              />
              <Button type="submit">提交</Button>
            </form>
          </Form>
        </div>
      );
    },
  },
  {
    id: "tag",
    title: 'Tag 标签',
    href: '#components/tag',
    component: () => (
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="text-sm text-neutral-11 mb-2">默认样式</div>
          <div className="flex flex-wrap gap-2">
            <Badge color="blue">蓝色标签</Badge>
            <Badge color="red">红色标签</Badge>
            <Badge color="orange">橙色标签</Badge>
            <Badge color="green">绿色标签</Badge>
            <Badge color="teal">青色标签</Badge>
            <Badge color="ultramarine">群青标签</Badge>
            <Badge color="purple">紫色标签</Badge>
            <Badge color="gray">灰色标签</Badge>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-neutral-11 mb-2">空心样式</div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="statusEmpty" color="blue">蓝色标签</Badge>
            <Badge variant="statusEmpty" color="red">红色标签</Badge>
            <Badge variant="statusEmpty" color="orange">橙色标签</Badge>
            <Badge variant="statusEmpty" color="green">绿色标签</Badge>
            <Badge variant="statusEmpty" color="teal">青色标签</Badge>
            <Badge variant="statusEmpty" color="ultramarine">群青标签</Badge>
            <Badge variant="statusEmpty" color="purple">紫色标签</Badge>
            <Badge variant="statusEmpty" color="gray">灰色标签</Badge>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-neutral-11 mb-2">大小尺寸</div>
          <div className="flex flex-wrap gap-2 items-center">
            <Badge color="blue">默认尺寸</Badge>
            <Badge color="blue" size={true}>大号尺寸</Badge>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "pagination",
    title: 'Pagination 分页',
    href: '#components/pagination',
    component: () => (
      <div className="flex w-full justify-center">
        <nav className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 min-w-[2rem] px-3"
          >
            1
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 min-w-[2rem] px-3"
          >
            2
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 min-w-[2rem] bg-primary px-3 text-primary-foreground"
          >
            3
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 min-w-[2rem] px-3"
          >
            4
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 min-w-[2rem] px-3"
          >
            5
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </nav>
      </div>
    ),
  },
  {
    id: "upload",
    title: 'Upload 上传',
    href: '#components/upload',
    component: () => (
      <div className="flex flex-col gap-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="font-normal" htmlFor="medical-record">病历资料</Label>
          <Input id="medical-record" type="file" accept=".pdf,.jpg,.png" />
        </div>
        <div
          className="flex h-32 w-full cursor-pointer items-center justify-center rounded-lg border border-dashed border-neutral-5 bg-neutral-7 hover:bg-neutral-6"
          onClick={() => document.getElementById('dropzone-file')?.click()}
        >
          <div className="flex flex-col items-center">
            <UploadIcon className="mb-2 h-8 w-8 text-neutral-3" />
            <p className="text-sm text-neutral-2">点击或拖拽上传检查报告</p>
            <p className="text-xs text-neutral-3">支持 PDF、JPG、PNG 格式</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.png"
          />
        </div>
      </div>
    ),
  },
  {
    id: "timepicker",
    title: 'TimePicker 时间选择器',
    href: '#components/timepicker',
    component: () => {
      const [date, setDate] = useState<Date>()
      return (
        <div>
          <TimePicker date={date} setDate={setDate} />
        </div>
      )
    },
  },
  {
    id: "transfer",
    title: 'Transfer 穿梭框',
    href: '#components/transfer',
    component: () => {
      const [targetKeys, setTargetKeys] = useState<string[]>([])
      const dataSource = [
        { key: '1', title: '每日步行' },
        { key: '2', title: '游泳' },
        { key: '3', title: '瑜伽' },
        { key: '4', title: '跑步' },
        { key: '5', title: '骑行' },
        { key: '6', title: '健身房锻炼' },
        { key: '7', title: '篮球' },
        { key: '8', title: '太极' }
      ]
      return (
        <div>
          <Transfer
            dataSource={dataSource}
            targetKeys={targetKeys}
            onChange={setTargetKeys}
          />
        </div>
      )
    },
  },
  {
    id: "tree",
    title: 'Tree 树形控件',
    href: '#components/tree',
    component: () => {
      const [selectedId, setSelectedId] = useState<string>()
      const treeData = [
        {
          id: '1',
          name: 'Documents',
          isFolder: true,
          children: [
            {
              id: '2',
              name: 'Work',
              isFolder: true,
              children: [
                { id: '3', name: 'report.pdf' },
                { id: '4', name: 'meeting.doc' },
              ],
            },
            {
              id: '5',
              name: 'Personal',
              isFolder: true,
              children: [
                { id: '6', name: 'photos.jpg' },
                { id: '7', name: 'notes.txt' },
              ],
            },
          ],
        },
        {
          id: '8',
          name: 'Downloads',
          isFolder: true,
          children: [
            { id: '9', name: 'software.exe' },
            { id: '10', name: 'music.mp3' },
          ],
        },
      ]
      return (
        <div>
          <Tree
            data={treeData}
            selectedId={selectedId}
            onSelect={(node) => setSelectedId(node.id)}
          />
        </div>
      )
    },
  },
];

export function ComponentsPage() {
  const [activeSection, setActiveSection] = useState(components[0].id);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the # symbol
      if (!hash.startsWith('components/')) return;
      
      const sectionId = hash.replace('components/', '');
      const section = components.find(c => c.id === sectionId);
      if (section) {
        setActiveSection(section.id);
        const element = document.querySelector(`#${section.id}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Default to first section if no valid hash
        setActiveSection(components[0].id);
        window.location.hash = `components/${components[0].id}`;
      }
    };

    // 初始加载时处理
    handleHashChange();

    // 监听 hash 变化
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSectionChange = (sectionId: string) => {
    const section = components.find(c => c.id === sectionId);
    if (section) {
      setActiveSection(section.id);
      window.location.hash = `components/${section.id}`;
      const element = document.querySelector(`#${sectionId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const sections = components.map(comp => ({
    id: comp.id,
    name: comp.title,
    href: comp.href
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
          <div className="mx-auto max-w-[1200px] p-8 mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
              {components.map((component) => {
                // Define which components should span multiple columns
                const isWide = [
                  'table',
                  'transfer',
                  'calendar',
                  'form',
                  'tabs',
                  'dialog'
                ].includes(component.id);

                const isExtraWide = ['table'].includes(component.id);

                return (
                  <div 
                    key={component.id} 
                    id={component.id} 
                    className={cn(
                      "bg-white rounded-lg shadow-3 transition-shadow duration-200 scroll-mt-24",
                      isExtraWide ? "md:col-span-2 lg:col-span-3" : isWide ? "md:col-span-2 lg:col-span-2" : ""
                    )}
                  >
                    <div className="p-6">
                      <h2 className="text-[20px] font-medium mb-6">{component.title}</h2>
                      {component.component()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
