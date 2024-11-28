import { useState } from "react"
import { Transfer } from "../ui/transfer"

const healthActivities = [
  { key: "1", title: "每日步行" },
  { key: "2", title: "游泳" },
  { key: "3", title: "瑜伽" },
  { key: "4", title: "跑步" },
  { key: "5", title: "骑行" },
  { key: "6", title: "健身房锻炼" },
  { key: "7", title: "篮球" },
  { key: "8", title: "太极" },
  { key: "9", title: "舞蹈" },
  { key: "10", title: "网球" },
]

export function HealthTransferExample() {
  const [targetKeys, setTargetKeys] = useState<string[]>([])

  return (
    <div className="p-4">
      <h2 className="mb-4 text-lg">选择您喜欢的运动</h2>
      <Transfer
        dataSource={healthActivities}
        targetKeys={targetKeys}
        onChange={setTargetKeys}
      />
    </div>
  )
}
