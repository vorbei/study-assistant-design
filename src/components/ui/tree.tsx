import * as React from "react"
import { FolderIcon, FileIcon } from "lucide-react"
import { CaretDownIcon, CaretRightIcon } from "./icons"
import { cn } from "@/lib/utils"

export interface TreeNode {
  id: string
  name: string
  children?: TreeNode[]
  isFolder?: boolean
}

interface TreeNodeProps {
  node: TreeNode
  level: number
  onSelect?: (node: TreeNode) => void
  selectedId?: string
}

function TreeNodeComponent({
  node,
  level,
  onSelect,
  selectedId,
}: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (node.children) {
      setIsExpanded(!isExpanded)
    }
    onSelect?.(node)
  }

  return (
    <div>
      <div
        className={cn(
          "flex cursor-pointer items-center gap-0.5 rounded-md px-2.5 py-1 hover:bg-neutral-7",
          selectedId === node.id && "bg-neutral-7",
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleClick}
      >
        {node.children ? (
          <div className="flex h-4 w-4 shrink-0 items-center justify-center text-neutral-3">
            {isExpanded ? (
              <CaretDownIcon className="h-4 w-4" />
            ) : (
              <CaretRightIcon className="h-4 w-4" />
            )}
          </div>
        ) : (
          <div className="w-4" />
        )}
        {node.isFolder ? (
          <FolderIcon className="h-4 w-4 shrink-0 text-neutral-3" />
        ) : (
          <FileIcon className="h-4 w-4 shrink-0 text-neutral-3" />
        )}
        <span className="truncate text-sm">{node.name}</span>
      </div>
      {isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <TreeNodeComponent
              key={child.id}
              node={child}
              level={level + 1}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface TreeProps {
  data: TreeNode[]
  onSelect?: (node: TreeNode) => void
  selectedId?: string
  className?: string
}

export function Tree({ data, onSelect, selectedId, className }: TreeProps) {
  return (
    <div className={cn("rounded-lg border border-neutral-6 p-2", className)}>
      {data.map((node) => (
        <TreeNodeComponent
          key={node.id}
          node={node}
          level={0}
          onSelect={onSelect}
          selectedId={selectedId}
        />
      ))}
    </div>
  )
}
