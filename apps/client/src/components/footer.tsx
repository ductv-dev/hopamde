'use client';

export const Footer = () => {
  return (
    <footer className="max-w-screen bg-gray-500">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between px-5 py-4 text-sm text-gray-50 md:flex-row">
        <p>© {new Date().getFullYear()} All rights reserved.</p>

        <p>
          Được tạo bởi <span className="font-semibold">ductv.dev</span>
        </p>
      </div>
    </footer>
  );
};
