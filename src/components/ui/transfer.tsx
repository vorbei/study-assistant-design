import * as React from "react"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export interface TransferItem {
  key: string
  title: string
  disabled?: boolean
}

export interface TransferProps {
  dataSource: TransferItem[]
  targetKeys: string[]
  onChange: (targetKeys: string[]) => void
  className?: string
}

export function Transfer({
  dataSource,
  targetKeys,
  onChange,
  className,
}: TransferProps) {
  const [sourceSelectedKeys, setSourceSelectedKeys] = React.useState<string[]>([])
  const [targetSelectedKeys, setTargetSelectedKeys] = React.useState<string[]>([])
  const [sourceSearchValue, setSourceSearchValue] = React.useState("")
  const [targetSearchValue, setTargetSearchValue] = React.useState("")

  const sourceData = dataSource.filter((item) => !targetKeys.includes(item.key))
  const targetData = dataSource.filter((item) => targetKeys.includes(item.key))

  const filteredSourceData = sourceData.filter((item) =>
    item.title.toLowerCase().includes(sourceSearchValue.toLowerCase())
  )
  const filteredTargetData = targetData.filter((item) =>
    item.title.toLowerCase().includes(targetSearchValue.toLowerCase())
  )

  const moveToTarget = () => {
    const newTargetKeys = [...targetKeys, ...sourceSelectedKeys]
    onChange(newTargetKeys)
    setSourceSelectedKeys([])
  }

  const moveToSource = () => {
    const newTargetKeys = targetKeys.filter(
      (key) => !targetSelectedKeys.includes(key)
    )
    onChange(newTargetKeys)
    setTargetSelectedKeys([])
  }

  const renderList = (
    items: TransferItem[],
    selectedKeys: string[],
    setSelectedKeys: (keys: string[]) => void,
    searchValue: string,
    setSearchValue: (value: string) => void,
    title: string
  ) => (
    <div className="flex h-[400px] w-[300px] flex-col rounded-lg border border-neutral-6">
      <div className="border-b border-neutral-6 bg-[#F3F5FA] p-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm">{title === "Source" ? "可选运动" : "已选运动"}</h3>
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="搜索"
            className="h-7 w-32"
          />
        </div>
      </div>
      <div className="flex-1 overflow-auto p-2">
        {items.map((item) => (
          <div
            key={item.key}
            className={cn(
              "flex items-start gap-2 rounded-md p-2 hover:bg-neutral-7",
              item.disabled && "opacity-50"
            )}
          >
            <Checkbox
              checked={selectedKeys.includes(item.key)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedKeys([...selectedKeys, item.key])
                } else {
                  setSelectedKeys(selectedKeys.filter((key) => key !== item.key))
                }
              }}
              disabled={item.disabled}
            />
            <div className="flex-1">
              <div className="text-sm">{item.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className={cn("flex items-center gap-4", className)}>
      {renderList(
        filteredSourceData,
        sourceSelectedKeys,
        setSourceSelectedKeys,
        sourceSearchValue,
        setSourceSearchValue,
        "Source"
      )}
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={moveToTarget}
          disabled={sourceSelectedKeys.length === 0}
        >
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={moveToSource}
          disabled={targetSelectedKeys.length === 0}
        >
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
      </div>
      {renderList(
        filteredTargetData,
        targetSelectedKeys,
        setTargetSelectedKeys,
        targetSearchValue,
        setTargetSearchValue,
        "Target"
      )}
    </div>
  )
}
