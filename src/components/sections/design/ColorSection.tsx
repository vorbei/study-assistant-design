import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// 定义基础色系
const baseColors = [
  {
    name: '蓝色系 Blue',
    prefix: 'B',
    colors: ['#2E4CB3', '#2E57E6', '#466BEB', '#6080F0', '#879FF5', '#AFC0FA', '#D6DFFF', '#F2F5FF'],
    description: '主色调，用于主要按钮、链接和重要信息的强调'
  },
  {
    name: '红色系 Red',
    prefix: 'R',
    colors: ['#CC3D55', '#E6455F', '#EB5E75', '#F0788B', '#F593A2', '#FAB9C3', '#FFD6DD', '#FFF2F4'],
    description: '用于错误状态、警告和需要注意的信息'
  },
  {
    name: '橙色系 Orange',
    prefix: 'O',
    colors: ['#E57709', '#F58718', '#F5983B', '#F7AD63', '#F7BC81', '#FAD2AA', '#FCE8D4', '#FFF2E5'],
    description: '用于警告状态和次要强调'
  },
  {
    name: '绿色系 Green',
    prefix: 'G',
    colors: ['#31A37D', '#12B881', '#3DCC9D', '#60DBB3', '#8AE6C7', '#A8F0D8', '#C8FAE9', '#E6FFF7'],
    description: '用于成功状态和积极反馈'
  },
  {
    name: '青色系 Teal',
    prefix: 'T',
    colors: ['#1298B3', '#00ABCD', '#42C2DB', '#65D0E6', '#8EE4F5', '#ADF2FF', '#CCF6FF', '#E6FBFF'],
    description: '用于信息展示和辅助说明'
  },
  {
    name: '群青色系 Ultra',
    prefix: 'U',
    colors: ['#6060DB', '#7070FF', '#8585FF', '#9999FF', '#B3B3FF', '#CCCCFF', '#E6E6FF', '#F2F2FF'],
    description: '用于特殊状态和装饰元素'
  },
  {
    name: '紫色系 Purple',
    prefix: 'P',
    colors: ['#884EC2', '#9C53E6', '#B075EB', '#C090F0', '#D0ABF5', '#E1C8FA', '#F2E6FF', '#F9F2FF'],
    description: '用于高级功能和特殊状态'
  }
];

// 定义中性色板
const neutralColors = [
  { color: '#000000', desc: '纯黑', usage: '用于特殊场景的纯黑文字' },
  { color: '#1F264D', desc: '主要文字', usage: '用于标题、正文等主要文字' },
  { color: '#596080', desc: '次要文字', usage: '用于次要信息、说明文字' },
  { color: '#898CA3', desc: '辅助文字', usage: '用于辅助说明、占位符' },
  { color: '#B8BCCC', desc: '禁用状态', usage: '用于禁用状态的文字和控件' },
  { color: '#D8D9E6', desc: '边框线条', usage: '用于边框、分割线' },
  { color: '#E6E9F2', desc: '分割线', usage: '用于内容分区、分隔线' },
  { color: '#F3F5FA', desc: '背景色', usage: '用于页面背景、卡片背景' },
  { color: '#F7F9FC', desc: '浅背景', usage: '用于次要区域背景' },
  { color: '#FFFFFF', desc: '纯白', usage: '用于纯白背景、文字反白' }
];

// 定义语义色彩
const semanticColors = {
  status: [
    { color: '#12B881', name: 'Success', desc: '成功', usage: '表示操作成功、完成状态' },
    { color: '#F58718', name: 'Warning', desc: '警告', usage: '表示警告、需要注意' },
    { color: '#E6455F', name: 'Error', desc: '失败', usage: '表示错误、失败状态' },
    { color: '#2E57E6', name: 'Waiting', desc: '等待', usage: '表示加载、等待状态' }
  ],
  action: [
    { color: '#12B881', name: 'Success', desc: '成功', usage: '用于成功类操作按钮' },
    { color: '#F58718', name: 'Warning', desc: '警告', usage: '用于警告类操作按钮' },
    { color: '#E6455F', name: 'Danger', desc: '危险', usage: '用于危险类操作按钮' },
    { color: '#2E57E6', name: 'Info', desc: '帮助', usage: '用于信息类操作按钮' }
  ],
  message: [
    { color: '#596080', name: 'Default', desc: '信息', usage: '用于普通信息提示' },
    { color: '#12B881', name: 'Success', desc: '成功', usage: '用于成功信息提示' },
    { color: '#F58718', name: 'Warning', desc: '警告', usage: '用于警告信息提示' },
    { color: '#E6455F', name: 'Error', desc: '错误', usage: '用于错误信息提示' }
  ]
};

const ColorCard = ({ color, children, showBorder = false }) => (
  <div className="h-10 rounded-md relative group" style={{ 
    backgroundColor: color,
    border: showBorder ? '1px solid #D8D9E6' : 'none'
  }}>
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/50 rounded-md flex items-center justify-center text-white text-xs transition-opacity">
      {color}
    </div>
    {children}
  </div>
);

export const ColorSection = () => (
  <div className="space-y-12">
    {/* 基础色板 */}

    <h2 className="text-2xl font-bold">Colors 色彩</h2>

    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">基础色板</h3>
        <p className="text-sm text-neutral-2 mt-1">基础色板由8个基准色系组成，每个色系包含8个渐变色阶（0-7）。这些色值可以用于构建一致的视觉体验。</p>
      </div>
      
      <div className="space-y-6">
        {baseColors.map((colorSystem, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-baseline justify-between">
              <Label className="text-sm font-medium">{colorSystem.name}</Label>
              <span className="text-xs text-neutral-3">{colorSystem.description}</span>
            </div>
            <div className="grid grid-cols-8 gap-2">
              {colorSystem.colors.map((color, i) => (
                <div key={i} className="space-y-1.5">
                  <ColorCard color={color} />
                  <div className="text-xs text-neutral-3">{colorSystem.prefix}{i}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* 中性色板 */}
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">中性色板 Neutral</h3>
        <p className="text-sm text-neutral-2 mt-1">中性色用于文字、线条、背景等基础界面元素，是构建界面的基础。</p>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {neutralColors.map((item, index) => (
          <div key={index} className="space-y-2">
            <ColorCard color={item.color} showBorder={true} />
            <div className="space-y-1">
              <div className="text-xs font-medium">N{index} - {item.desc}</div>
              <div className="text-xs text-neutral-3">{item.usage}</div>
              <div className="text-xs text-neutral-3">{item.color}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* 使用规范 */}
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium">使用规范</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-md font-semibold">主色</h4>
            <p className="text-sm text-neutral-2 mt-1">主色蓝色用于品牌展示，用于页面中需要重点突出的元素，也用于表示主要操作。可作为按钮底色，但优先使用浅色。作为背景或大面积使用时，应考虑 B2、B3 等亮度适中的色阶。</p>
            <div className="flex space-x-2 mt-2">
              <div className="w-8 h-8 bg-blue-700"></div>
              <div className="w-8 h-8 bg-blue-900"></div>
              <div className="w-8 h-8 bg-blue-1100"></div>
            </div>
          </div>
          <div>
            <h4 className="text-md font-semibold">辅助色</h4>
            <p className="text-sm text-neutral-2 mt-1">辅助色包含各种基准色及其色阶，用于表示不同状态、分类等。注意控制辅助色的使用数量及面积，保证主色在单一页面中占据最高比重，否则视觉容易显得凌乱、区分不出主次关系。</p>
            <div className="flex space-x-2 mt-2">
              <div className="w-8 h-8 bg-red-700"></div>
              <div className="w-8 h-8 bg-green-700"></div>
              <div className="w-8 h-8 bg-orange-700"></div>
            </div>
          </div>
          <div>
            <h4 className="text-md font-semibold">中性色</h4>
            <p className="text-sm text-neutral-2 mt-1">中性色用于文字、线条、背景等，帮助界面建立清晰的视觉层次结构。</p>
            <div className="flex space-x-2 mt-2">
              <div className="w-8 h-8 bg-neutral-3"></div>
              <div className="w-8 h-8 bg-neutral-5"></div>
              <div className="w-8 h-8 bg-neutral-7"></div>
            </div>
          </div>
          <div>
            <h4 className="text-md font-semibold">交互状态</h4>
            <p className="text-sm text-neutral-2 mt-1">中性色用于文字、线条、背景等，帮助界面建立清晰的视觉层次结构。</p>
            <div className="flex space-x-2 mt-2">
              <div className="w-8 h-8 bg-neutral-3"></div>
              <div className="w-8 h-8 bg-neutral-5"></div>
              <div className="w-8 h-8 bg-neutral-7"></div>
            </div>
            <p className="text-sm text-neutral-2 mt-1">色彩在不同交互状态下的变化规则：</p>
            <ul className="list-disc pl-5">
              <li className="text-sm text-neutral-2">Hover: 1-3阶颜色+1阶位，4-9阶颜色-1阶位，0不会用于交互元素上，不需要考虑</li>
              <li className="text-sm text-neutral-2">Active: 原色-1阶位</li>
              <li className="text-sm text-neutral-2">选中: 文字、图标为B1，背景为B7</li>
              <li className="text-sm text-neutral-2">禁用: 文字、图标为N4，背景为B7</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </div>
);
