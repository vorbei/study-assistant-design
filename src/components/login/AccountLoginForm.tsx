import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const accountLoginSchema = z.object({
  account: z.string().min(2, "账号至少2个字符"),
  password: z.string().min(6, "密码至少6个字符"),
});

type AccountLoginValues = z.infer<typeof accountLoginSchema>;

interface AccountLoginFormProps {
  onSubmit: (data: AccountLoginValues) => void;
}

export const AccountLoginForm = ({ onSubmit }: AccountLoginFormProps) => {
  const form = useForm<AccountLoginValues>({
    resolver: zodResolver(accountLoginSchema),
    defaultValues: {
      account: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="account"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                  {...field}
                  placeholder="请输入账号" 
                  className="h-9 bg-white/60 border-blue-100 focus:border-blue-400 focus:ring-blue-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                  {...field}
                  type="password"
                  placeholder="请输入密码" 
                  className="h-9 bg-white/60 border-blue-100 focus:border-blue-400 focus:ring-blue-400"
                />
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
