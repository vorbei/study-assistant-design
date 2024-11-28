import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const phoneLoginSchema = z.object({
  phone: z.string().min(11, "请输入正确的手机号"),
  code: z.string().min(4, "请输入正确的验证码"),
});

type PhoneLoginValues = z.infer<typeof phoneLoginSchema>;

interface PhoneLoginFormProps {
  onSubmit: (data: PhoneLoginValues) => void;
  countdown: number;
  onSendCode: () => void;
}

export const PhoneLoginForm = ({ onSubmit, countdown, onSendCode }: PhoneLoginFormProps) => {
  const form = useForm<PhoneLoginValues>({
    resolver: zodResolver(phoneLoginSchema),
    defaultValues: {
      phone: "",
      code: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                  {...field}
                  type="tel" 
                  placeholder="请输入手机号" 
                  className="h-9 bg-white/60 border-blue-100 focus:border-blue-400 focus:ring-blue-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex space-x-4">
                  <Input 
                    {...field}
                    placeholder="请输入验证码" 
                    className="h-9 bg-white/60 border-blue-100 focus:border-blue-400 focus:ring-blue-400"
                  />
                  <Button 
                    type="button"
                    variant="ghost" 
                    className="w-28 h-9 flex-shrink-0 text-blue-500 hover:bg-blue-50"
                    onClick={onSendCode}
                    disabled={countdown > 0}
                  >
                    {countdown > 0 ? `${countdown}s` : '获取验证码'}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full h-9 bg-blue-600 hover:bg-blue-700">
          登录
        </Button>
      </form>
    </Form>
  );
};
