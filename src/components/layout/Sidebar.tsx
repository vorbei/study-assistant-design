import { cn } from "@/lib/utils";

interface SidebarProps {
  sections: {
    id: string;
    name: string;
    href: string;
  }[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export function Sidebar({ sections, activeSection, onSectionChange }: SidebarProps) {
  return (
    <aside className="fixed top-14 left-0 w-64 h-[calc(100vh-3.5rem)] bg-neutral-9 border-r border-neutral-6 z-10">
      <nav className="h-full py-2">
        <ul className="space-y-0.5 px-2">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={section.href}
                onClick={(e) => {
                  e.preventDefault();
                  onSectionChange(section.id);
                }}
                className={cn(
                  "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                  "text-neutral-11 hover:bg-neutral-8 hover:text-neutral-12",
                  activeSection === section.id && "bg-neutral-7 text-neutral-12"
                )}
              >
                {section.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
