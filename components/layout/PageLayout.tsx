'use client';

import { ReactNode } from 'react';
import { Nav } from './Nav';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  containerClassName?: string;
  showNav?: boolean;
}

export function PageLayout({
  children,
  title,
  subtitle,
  className,
  containerClassName,
  showNav = true,
}: PageLayoutProps) {
  return (
    <div className={cn('min-h-screen', className)}>
      {showNav && <Nav />}
      <div className={cn('container mx-auto px-4 py-12', containerClassName)}>
        {title && (
          <h1 className="text-4xl font-bold mb-4 text-primary text-center">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="text-gray-600 mb-8 text-lg text-center max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
