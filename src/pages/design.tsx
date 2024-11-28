import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ColorSection } from "@/components/sections/design/ColorSection";
import { TypographySection } from "@/components/sections/design/TypographySection";
import { BorderSection } from "@/components/sections/design/BorderSection";
import { Sidebar } from "@/components/layout/Sidebar";

const sections = [
  { id: "color", name: "Colors 颜色", href: "#design/color" },
  { id: "typography", name: "Typography 字体", href: "#design/typography" },
  { id: "border", name: "Border 边框", href: "#design/border" }
] as const;

type SectionType = typeof sections[number]["id"];

export function DesignPage() {
  const [activeSection, setActiveSection] = useState<SectionType>("color");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the # symbol
      if (!hash.startsWith('design/')) return;
      
      const sectionId = hash.replace('design/', '');
      const section = sections.find(s => s.id === sectionId);
      if (section) {
        setActiveSection(section.id as SectionType);
      } else {
        // Default to first section if no valid hash
        setActiveSection("color");
        window.location.hash = "design/color";
      }
    };

    // 初始加载时处理
    handleHashChange();

    // 监听 hash 变化
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSectionChange = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (section) {
      setActiveSection(section.id as SectionType);
      window.location.hash = `design/${section.id}`;
    }
  };

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
            <Card className="p-6">
              {activeSection === "color" && <ColorSection />}
              {activeSection === "typography" && <TypographySection />}
              {activeSection === "border" && <BorderSection />}
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
