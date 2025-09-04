'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Menu, Search, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Button } from '@workspace/ui/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@workspace/ui/components/form';
import { Input } from '@workspace/ui/components/input';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@workspace/ui/components/navigation-menu';

const FormSchema = z.object({
  key: z.string().trim(),
});

export const TheHeader = () => {
  const route = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { key: '' },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const q = data.key?.trim();
    if (!q) return;
    setOpen(false);
    route.push(`/search/${encodeURIComponent(q)}?page=1`);
  }

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/95 py-1 text-white shadow-md backdrop-blur supports-[backdrop-filter]:bg-black/70">
      <div className="mx-auto max-w-6xl px-3 md:px-4">
        <div className="flex items-center gap-3 py-2.5 md:gap-4">
          <Link href="/" className="shrink-0">
            <p className="px-2 text-lg font-bold md:px-4 md:text-xl">Hopamde</p>
          </Link>

          <nav className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-4 text-[0.9rem]">
                <NavigationMenuItem>
                  <Link
                    href="/genres"
                    className="rounded-md px-2 py-1.5 outline-none hover:bg-white/10 focus:bg-white/10"
                  >
                    Thể loại
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/authors"
                    className="rounded-md px-2 py-1.5 outline-none hover:bg-white/10 focus:bg-white/10"
                  >
                    Tác giả
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className="flex-1" />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="hidden w-full max-w-xs sm:block md:max-w-md"
            >
              <FormField
                control={form.control}
                name="key"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          inputMode="search"
                          aria-label="Tìm kiếm"
                          placeholder="Nhập từ khóa tìm kiếm"
                          className="w-full rounded-full border-white/20 bg-white/10 pr-12 text-white placeholder:text-white/60 focus-visible:ring-white/40"
                        />
                      </FormControl>
                      <Button
                        type="submit"
                        size="icon"
                        variant="ghost"
                        aria-label="Tìm kiếm"
                        className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full hover:bg-white/10"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <Button
            variant="ghost"
            size="icon"
            aria-label={open ? 'Đóng menu' : 'Mở menu'}
            className="md:hidden"
            onClick={() => setOpen((s) => !s)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        <div
          className={
            open
              ? 'animate-in fade-in-0 slide-in-from-top-2 duration-200 md:hidden'
              : 'hidden md:hidden'
          }
        >
          <div className="border-t border-white/10 pb-3 pt-1">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <FormField
                  control={form.control}
                  name="key"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <FormControl>
                          <Input
                            {...field}
                            inputMode="search"
                            aria-label="Tìm kiếm"
                            placeholder="Tìm bài hát, tác giả, hợp âm..."
                            className="w-full rounded-full border-white/20 bg-white/10 pr-12 text-white placeholder:text-white/60 focus-visible:ring-white/40"
                          />
                        </FormControl>
                        <Button
                          type="submit"
                          size="icon"
                          variant="ghost"
                          aria-label="Tìm kiếm"
                          className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full hover:bg-white/10"
                        >
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>

            {/* Links */}
            <div className="mt-3 flex flex-col gap-1">
              <Link
                href="/genres"
                className="rounded-md px-3 py-2 hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                Thể loại
              </Link>
              <Link
                href="/authors"
                className="rounded-md px-3 py-2 hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                Tác giả
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
