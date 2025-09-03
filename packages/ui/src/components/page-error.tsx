'use client';

import { Button } from './button';

type NotPermissionProps = {
  redirectUrl?: string;
};

export const NotPermission = ({ redirectUrl }: NotPermissionProps) => {
  return (
    <div className="flex min-h-screen items-center px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            403
          </h1>
          <p className="text-gray-500">
            Bạn không có quyền truy cập vào trang này!
          </p>
        </div>
        <a href={redirectUrl}>
          <Button variant="outline" className="cursor-pointer">
            Đăng nhập bằng tài khoản khác
          </Button>
        </a>
      </div>
    </div>
  );
};
