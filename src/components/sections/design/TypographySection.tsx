export const TypographySection = () => (
  <div className="space-y-8">
    {/* 字体家族 */}

    <h2 className="text-2xl font-bold">Typography 字体</h2>

    <div className="space-y-4">
      <h3 className="text-lg font-semibold">字体家族</h3>
      <p className="text-base text-neutral-2">优先使用系统默认字体，确保在不同平台和设备上具有最佳显示效果。</p>
      <div className="rounded-lg bg-neutral-7 p-4">
        <code className="text-sm text-neutral-1 break-all font-mono">
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
        </code>
      </div>
    </div>

    {/* 基准字体 */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">基准字体</h3>
      <ul className="list-disc list-inside text-base text-neutral-2 space-y-2">
        <li>基础字号设定为 14px（基于电脑显示器阅读距离 50cm 和最佳阅读角度 0.3°）</li>
        <li>在高信息密度页面中，允许使用 12px 作为最小字号</li>
      </ul>
    </div>

    {/* 标题系统 */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">标题系统</h3>
      <div className="space-y-6">
        <div className="space-y-4">
          {[
            {
              level: 'H1',
              name: '页面标题',
              className: 'text-2xl font-semibold leading-[34px]',
              specs: '24px / 600 / 34px'
            },
            {
              level: 'H2',
              name: '大模块标题',
              className: 'text-lg font-semibold leading-6',
              specs: '18px / 600 / 24px'
            },
            {
              level: 'H3',
              name: '卡片标题',
              className: 'text-base font-semibold leading-[22px]',
              specs: '16px / 600 / 22px'
            },
            {
              level: 'H4',
              name: '小标题',
              className: 'text-base font-medium leading-[22px]',
              specs: '16px / 500 / 22px',
              usage: '小标题、按钮文字'
            },
            {
              level: 'H5',
              name: '小尺寸标签',
              className: 'text-xs font-medium leading-4',
              specs: '12px / 500 / 16px'
            }
          ].map((heading) => (
            <div key={heading.level} className="grid grid-cols-[100px_1fr] gap-4 items-center">
              <div className="text-sm text-neutral-3">{heading.level}</div>
              <div className="space-y-2">
                <div className={heading.className + " text-neutral-1"}>
                  {heading.name} - {heading.specs}
                </div>
                <div className="text-xs text-neutral-3">用途：{heading.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* 正文系统 */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">正文系统</h3>
      <div className="space-y-6">
        {[
          {
            name: 'Base/UI',
            desc: '单行正文',
            className: 'text-sm font-normal leading-5',
            specs: '14px / 400 / 20px',
            usage: '单行正文文字'
          },
          {
            name: 'Base/Paragraph',
            desc: '多行正文',
            className: 'text-sm font-normal leading-5',
            specs: '14px / 400 / 20px',
            usage: '有段落的正文文字'
          },
          {
            name: 'Small/UI',
            desc: '辅助文字（单行）',
            className: 'text-xs font-normal leading-4',
            specs: '12px / 400 / 16px',
            usage: '单行辅助文字'
          },
          {
            name: 'Small/Paragraph',
            desc: '辅助文字（多行）',
            className: 'text-xs font-normal leading-4',
            specs: '12px / 400 / 16px',
            usage: '有段落的辅助文字'
          }
        ].map((text) => (
          <div key={text.name} className="grid grid-cols-[160px_1fr] gap-4 items-start">
            <div className="text-sm text-neutral-3">{text.name}</div>
            <div className="space-y-2">
              <div className={text.className + " text-neutral-1"}>
                {text.desc} - {text.specs}
              </div>
              <div className="text-xs text-neutral-3">用途：{text.usage}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* 特殊规则 */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">特殊规则</h3>
      <div className="text-base text-neutral-2">
        Paragraph 相较于 UI 增加 8px 的段落间距，适用于需要分行及大段落的文本
      </div>
    </div>

    {/* 字体使用建议 */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">字体使用建议</h3>
      <div className="space-y-6">
        {[
          {
            title: "标题层级",
            items: [
              "严格遵循标题层级顺序（H1 > H2 > H3 > H4 > H5）",
              "避免跳过层级使用",
              "每个页面仅使用一个 H1 标题"
            ]
          },
          {
            title: "正文排版",
            items: [
              "单行文字使用 Base/UI 和 Small/UI",
              "多行段落使用 Base/Paragraph 和 Small/Paragraph",
              "需要强调的文字可适当提升字重或改变颜色"
            ]
          },
          {
            title: "响应式调整",
            items: [
              "在移动端可适当缩小字号，但不建议小于 12px",
              "保持行高和字号的黄金比例（1.4-1.5）"
            ]
          },
          {
            title: "无障碍设计",
            items: [
              "确保文字与背景的对比度符合 WCAG 2.0 标准",
              "避免使用过小的字号影响可读性",
              "合理使用字重来增强层级感和可读性"
            ]
          }
        ].map((section) => (
          <div key={section.title} className="space-y-2">
            <h4 className="font-medium">{section.title}</h4>
            <ul className="list-disc list-inside text-base text-neutral-2 space-y-1">
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
