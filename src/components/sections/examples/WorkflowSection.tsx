import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, AlertCircle, X } from 'lucide-react';

export const WorkflowSection = () => {
  return (
    <div className="space-y-8">
      {/* 步骤流程 */}
      <Card className="p-6">
        <h3 className="text-base font-medium mb-4">步骤流程</h3>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start gap-4">
            {/* 完成的步骤 */}
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 h-1 bg-green-600 ml-2"></div>
              </div>
              <div className="pl-2">
                <div className="font-medium">信息填写</div>
                <p className="text-sm text-neutral-11">基本信息已完成填写</p>
              </div>
            </div>

            {/* 当前步骤 */}
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full border-2 border-primary bg-white flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">2</span>
                </div>
                <div className="flex-1 h-1 bg-neutral-6 ml-2"></div>
              </div>
              <div className="pl-2">
                <div className="font-medium">资料上传</div>
                <p className="text-sm text-neutral-11">请上传相关证明材料</p>
              </div>
            </div>

            {/* 未开始的步骤 */}
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full border-2 border-neutral-6 flex items-center justify-center">
                  <span className="text-sm font-medium text-neutral-11">3</span>
                </div>
              </div>
              <div className="pl-2">
                <div className="font-medium text-neutral-11">审核确认</div>
                <p className="text-sm text-neutral-11">等待审核结果</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 审批流程 */}
      <Card className="p-6">
        <h3 className="text-base font-medium mb-4">审批流程</h3>
        <div className="max-w-3xl mx-auto space-y-4">
          {/* 已通过 */}
          <div className="flex items-center p-4 border rounded-lg">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">部门主管审批</div>
                  <p className="text-sm text-neutral-11">张三</p>
                </div>
                <div className="text-green-600">已通过</div>
              </div>
              <div className="text-sm text-neutral-11 mt-1">2024-01-20 10:30</div>
            </div>
          </div>

          {/* 当前审批 */}
          <div className="flex items-center p-4 border rounded-lg border-primary bg-primary/5">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-primary" />
            </div>
            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">财务审批</div>
                  <p className="text-sm text-neutral-11">李四</p>
                </div>
                <div className="text-primary">审批中</div>
              </div>
              <div className="text-sm text-neutral-11 mt-1">等待审批</div>
            </div>
          </div>

          {/* 已拒绝 */}
          <div className="flex items-center p-4 border rounded-lg">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <X className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">人事审批</div>
                  <p className="text-sm text-neutral-11">王五</p>
                </div>
                <div className="text-red-600">已拒绝</div>
              </div>
              <div className="text-sm text-neutral-11 mt-1">预算超出限额</div>
            </div>
          </div>

          {/* 待处理 */}
          <div className="flex items-center p-4 border rounded-lg">
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-neutral-600" />
            </div>
            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">总经理审批</div>
                  <p className="text-sm text-neutral-11">赵六</p>
                </div>
                <div className="text-neutral-11">待处理</div>
              </div>
              <div className="text-sm text-neutral-11 mt-1">等待上一步完成</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
