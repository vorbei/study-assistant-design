import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export const BorderSection = () => (
  <div className="space-y-8">
    {/* 线条样式 */}
    <div className="space-y-4">
      <h3 className="text-lg font-medium">线条样式</h3>
      <div className="grid grid-cols-3 gap-4">
        {[
          { name: '实线 - 1px', css: 'border: 1px solid #E5E6EB', className: 'border border-solid' },
          { name: '实线 - 2px', css: 'border: 2px solid #E5E6EB', className: 'border-2 border-solid' },
          { name: '虚线 - 1px', css: 'border: 1px dashed #E5E6EB', className: 'border border-dashed' }
        ].map((style) => (
          <div key={style.name} className="space-y-2">
            <div className={`h-16 rounded ${style.className} border-neutral-5`} />
            <div className="space-y-1">
              <div className="text-sm font-medium">{style.name}</div>
              <code className="text-xs text-neutral-3 font-mono">{style.css}</code>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* 圆角规范 */}
    <div className="space-y-4">
      <h3 className="text-lg font-medium">圆角规范</h3>
      <div className="grid grid-cols-4 gap-4">
        {[
          { name: '无圆角', value: '0px', className: 'rounded-none', desc: '需要棱角分明的界面元素' },
          { name: '小圆角', value: '2px', className: 'rounded-sm', desc: '按钮、输入框等小尺寸元素' },
          { name: '大圆角', value: '4px', className: 'rounded', desc: '弹窗、卡片等大尺寸元素' },
          { name: '圆形', value: '50%', className: 'rounded-full', desc: '头像、图标等需要圆形的元素' }
        ].map((radius) => (
          <div key={radius.name} className="space-y-2">
            <div className={`${radius.name === '圆形' ? 'w-16 h-16' : 'h-16'} bg-neutral-7 border border-neutral-5 ${radius.className}`} />
            <div className="space-y-1">
              <div className="text-sm font-medium">{radius.name}</div>
              <div className="text-xs text-neutral-3">{radius.value}</div>
              <div className="text-xs text-neutral-3">{radius.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* 阴影系统 */}
    <div className="space-y-4">
      <h3 className="text-lg font-medium">阴影系统</h3>
      <div className="grid grid-cols-3 gap-6 bg-[#F3F5FA] p-8 rounded-lg">
        {[
          {
            name: '一级阴影',
            className: 'shadow-sm',
            css: 'box-shadow: 0px 0px 1px rgba(31, 38, 76, 0.16), 0px 2px 5px rgba(31, 38, 76, 0.03), 0px 3px 8px rgba(31, 38, 76, 0.04)',
            desc: '物体与底面重叠，适用于卡片hover效果'
          },
          {
            name: '二级阴影',
            className: 'shadow-md',
            css: 'box-shadow: 0px 0px 1px rgba(31, 38, 76, 0.16), 0px 4px 12px rgba(31, 38, 76, 0.06), 0px 8px 20px -8px rgba(31, 38, 76, 0.06)',
            desc: '物体位于中层级，适用于下拉面板菜单'
          },
          {
            name: '三级阴影',
            className: 'shadow-lg',
            css: 'box-shadow: 0px 0px 1px rgba(31, 38, 76, 0.16), 0px 8px 24px rgba(31, 38, 76, 0.04), 0px 12px 32px -12px rgba(31, 38, 76, 0.04)',
            desc: '物体位于高层级，适用于对话框等全局性浮层'
          }
        ].map((shadow) => (
          <div key={shadow.name} className="space-y-2">
            <div className={`h-24 bg-white rounded-lg ${shadow.className}`} />
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">{shadow.name}</div>
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 px-2">
                      <span className="text-xs text-neutral-3">查看代码</span>
                      <ChevronDownIcon className="h-3 w-3 text-neutral-3" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <code className="mt-1 block text-xs text-neutral-3 font-mono bg-neutral-9 p-2 rounded">{shadow.css}</code>
                  </CollapsibleContent>
                </Collapsible>
              </div>
              <div className="text-xs text-neutral-3">{shadow.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* 使用规范 */}
    <div className="space-y-4">
      <h3 className="text-lg font-medium">使用规范</h3>
      <div className="space-y-6">
        {[
          {
            title: "阴影层级递进",
            items: [
              "阴影从一级到三级逐步加深",
              "同一页面内避免过多不同层级的阴影",
              "保持阴影层级的逻辑合理性"
            ]
          },
          {
            title: "交互状态",
            items: [
              "卡片在 Hover 状态下，阴影可从一级平滑过渡至二级",
              "避免过度使用阴影效果",
              "确保阴影与其他视觉元素协调"
            ]
          },
          {
            title: "响应式考虑",
            items: [
              "在移动端可适当降低阴影层级",
              "考虑设备性能，优化阴影渲染",
              "保持视觉效果的一致性"
            ]
          },
          {
            title: "无障碍设计",
            items: [
              "确保阴影不影响内容的可读性",
              "保持足够的对比度",
              "考虑低视力用户的使用体验"
            ]
          }
        ].map((section) => (
          <div key={section.title} className="space-y-2">
            <h4 className="text-sm font-medium">{section.title}</h4>
            <ul className="list-disc list-inside text-sm text-neutral-2 space-y-1">
              {section.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
);
