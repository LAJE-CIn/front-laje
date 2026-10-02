import type { ElementType, ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  size?: 'default' | 'centered' | 'full';
}

const sizeStyles: Record<'default' | 'centered' | 'full', string> = {
  // Standard content layout: max-w-7xl, centered horizontally with safe padding for mobile fixed header
  default: 'max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 md:pt-6 pb-16',
  // Centered vertical and horizontal layout for 404, WIP, and status pages
  centered: 'flex-1 flex flex-col justify-center items-center px-4 pt-24 md:pt-8 pb-16 text-center w-full',
  // Full width for landing pages and custom full-bleed sections
  full: 'w-full'
};

export default function PageContainer({
  children,
  as: Component = 'div',
  className = '',
  size = 'default'
}: PageContainerProps) {
  return (
    <Component className={`${sizeStyles[size]} ${className}`}>
      {children}
    </Component>
  );
}
