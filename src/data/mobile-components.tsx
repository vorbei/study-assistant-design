import * as React from "react"
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from "@/lib/utils"
import { Home, MessageSquare, Activity, Crown, User } from 'lucide-react';

// Mobile specific component styles
const mobileStyles = {
  button: "h-9 text-sm rounded-lg",
  input: "h-9 text-sm rounded-lg",
  select: "h-9 text-sm rounded-lg",
  badge: "rounded-lg",
  card: "rounded-lg",
  radio: "h-5 w-5 rounded-[12px]",
  checkbox: "h-5 w-5 rounded-[12px]",
  switch: "",
}

interface NavItem {
  icon: React.ReactNode
  label: string
  active?: boolean
}

const NavItem = ({ icon, label, active }: NavItem) => (
  <div className={cn(
    "relative h-[56px] flex-1",
    "flex justify-center items-center"
  )}>
    <div className="absolute w-7 h-7 left-[14px] top-2">
      {active ? (
        <div className="relative w-full h-full">
          <svg width="28" height="28" className="absolute">
            <defs>
              <linearGradient id="stroke-gradient" x1="6.24%" y1="6.24%" x2="96.66%" y2="96.66%">
                <stop offset="0%" stopColor="#62E8A2" />
                <stop offset="100%" stopColor="#13CECE" />
              </linearGradient>
            </defs>
          </svg>
          {React.cloneElement(icon as React.ReactElement, {
            className: "text-[transparent] stroke-[url(#stroke-gradient)]",
            strokeWidth: 1.5
          })}
        </div>
      ) : (
        React.cloneElement(icon as React.ReactElement, {
          className: "text-neutral-3",
          strokeWidth: 1.5
        })
      )}
    </div>
    <span className={cn(
      "absolute w-14 h-[14px] left-0 top-[38px]",
      "text-[11px] leading-[15px] font-medium text-center",
      "flex items-center justify-center",
      active ? "text-neutral-1" : "text-neutral-3"
    )}>
      {label}
    </span>
  </div>
)

export const mobileComponents = [
  {
    id: "bottom-nav",
    title: 'BottomNav 底部导航',
    href: '#mobile-components/bottom-nav',
    component: () => (
      <div className="relative w-full">
        <div className="flex justify-between items-center h-14 bg-white w-full rounded-md">
          <NavItem icon={<Home size={25} />} label="首页" active />
          <NavItem icon={<MessageSquare size={25} />} label="问答资询" />
          <NavItem icon={<Activity size={25} />} label="健康评估" />
          <NavItem icon={<Crown size={25} />} label="尊享服务" />
          <NavItem icon={<User size={25} />} label="我的" />
        </div>
      </div>
    ),
  },
  {
    id: "button",
    title: 'Button 按钮',
    href: '#mobile-components/button',
    component: () => (
      <div className="flex flex-col gap-2 w-full max-w-md">
        <Button variant="default" className={mobileStyles.button}>
          Default Button
        </Button>
        <Button variant="secondary" className={mobileStyles.button}>
          Secondary Button
        </Button>
        <Button 
          className={cn(mobileStyles.button, "bg-green-1 hover:bg-green-1/90 text-white")}
        >
          Green Button
        </Button>
        <Button variant="outline" className={mobileStyles.button}>
          Outline Button
        </Button>
        <Button variant="ghost" className={mobileStyles.button}>
          Ghost Button
        </Button>
      </div>
    ),
  },
  {
    id: "radio",
    title: 'Radio 单选框',
    href: '#mobile-components/radio',
    component: () => (
      <RadioGroup defaultValue="option-one">
        <div className="flex flex-col gap-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" className={mobileStyles.radio} />
            <Label htmlFor="option-one">选项一</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" className={mobileStyles.radio} />
            <Label htmlFor="option-two">选项二</Label>
          </div>
        </div>
      </RadioGroup>
    ),
  },
  {
    id: "checkbox",
    title: 'Checkbox 多选框',
    href: '#mobile-components/checkbox',
    component: () => (
      <div className="flex flex-col gap-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" className={mobileStyles.checkbox} />
          <Label htmlFor="terms">接受服务条款</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="newsletter" className={mobileStyles.checkbox} />
          <Label htmlFor="newsletter">订阅新闻</Label>
        </div>
      </div>
    ),
  },
  {
    id: "input",
    title: 'Input 输入框',
    href: '#mobile-components/input',
    component: () => (
      <div className="space-y-4 w-full max-w-md">
        <Input type="email" placeholder="Email" className={mobileStyles.input} />
        <Input type="password" placeholder="Password" className={mobileStyles.input} />
      </div>
    ),
  },
  {
    id: "switch",
    title: 'Switch 开关',
    href: '#mobile-components/switch',
    component: () => (
      <div className="space-y-4 w-full max-w-md">
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" className={mobileStyles.switch} />
          <Label htmlFor="airplane-mode" className="text-sm">Airplane Mode</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="wifi" defaultChecked className={mobileStyles.switch} />
          <Label htmlFor="wifi" className="text-sm">Wi-Fi</Label>
        </div>
      </div>
    ),
  },
  {
    id: "slider",
    title: 'Slider 滑块',
    href: '#mobile-components/slider',
    component: () => (
      <div className="space-y-4">
        <Slider
          defaultValue={[50]}
          max={100}
          step={1}
          className="w-full max-w-md rounded-lg"
        />
      </div>
    ),
  },
  {
    id: "progress",
    title: 'Progress 进度条',
    href: '#mobile-components/progress',
    component: () => (
      <div className="space-y-4 w-full max-w-md">
        <Progress className="rounded-lg" value={33} />
        <Progress className="rounded-lg" value={66} />
        <Progress className="rounded-lg" value={100} />
      </div>
    ),
  },
  {
    id: "select",
    title: 'Select 选择器',
    href: '#mobile-components/select',
    component: () => (
      <div className="space-y-4 w-full max-w-md">
        <Select>
          <SelectTrigger className={mobileStyles.select}>
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="text-sm">Fruits</SelectLabel>
              <SelectItem value="apple" className="text-sm">Apple</SelectItem>
              <SelectItem value="banana" className="text-sm">Banana</SelectItem>
              <SelectItem value="orange" className="text-sm">Orange</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    ),
  },
  {
    id: "tag",
    title: 'Tag 标签',
    href: '#mobile-components/tag',
    component: () => (
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="text-sm text-neutral-11 mb-2">默认样式</div>
          <div className="flex flex-wrap gap-2">
            <Badge className={mobileStyles.badge} color="blue">蓝色标签</Badge>
            <Badge className={mobileStyles.badge} color="red">红色标签</Badge>
            <Badge className={mobileStyles.badge} color="orange">橙色标签</Badge>
            <Badge className={mobileStyles.badge} color="green">绿色标签</Badge>
            <Badge className={mobileStyles.badge} color="teal">青色标签</Badge>
            <Badge className={mobileStyles.badge} color="ultramarine">群青标签</Badge>
            <Badge className={mobileStyles.badge} color="purple">紫色标签</Badge>
            <Badge className={mobileStyles.badge} color="gray">灰色标签</Badge>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-neutral-11 mb-2">空心样式</div>
          <div className="flex flex-wrap gap-2">
            <Badge className={mobileStyles.badge} variant="statusEmpty" color="blue">蓝色标签</Badge>
            <Badge className={mobileStyles.badge} variant="statusEmpty" color="red">红色标签</Badge>
            <Badge className={mobileStyles.badge} variant="statusEmpty" color="orange">橙色标签</Badge>
            <Badge className={mobileStyles.badge} variant="statusEmpty" color="green">绿色标签</Badge>
            <Badge className={mobileStyles.badge} variant="statusEmpty" color="teal">青色标签</Badge>
            <Badge className={mobileStyles.badge} variant="statusEmpty" color="ultramarine">群青标签</Badge>
            <Badge className={mobileStyles.badge} variant="statusEmpty" color="purple">紫色标签</Badge>
            <Badge className={mobileStyles.badge} variant="statusEmpty" color="gray">灰色标签</Badge>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-neutral-11 mb-2">大小尺寸</div>
          <div className="flex flex-wrap gap-2 items-center">
            <Badge className={mobileStyles.badge} color="blue">默认尺寸</Badge>
            <Badge className={mobileStyles.badge} color="blue" size={true}>大号尺寸</Badge>
          </div>
        </div>
      </div>
    ),
  },
];
