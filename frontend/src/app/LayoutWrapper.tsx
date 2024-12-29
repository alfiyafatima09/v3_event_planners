"use client";

import React from 'react';
import ProtectedRoute from '@/app/auth/ProtectedRoute';
import { usePathname } from 'next/navigation';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/auth');

  return (
    <div className="min-h-screen flex flex-col">
      {isAuthPage ? children : <ProtectedRoute>{children}</ProtectedRoute>}
    </div>
  );
}
