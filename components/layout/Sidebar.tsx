'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Rocket, Settings, Box } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Projects', href: '/', icon: LayoutDashboard },
  { name: 'Deployments', href: '/deployments', icon: Rocket },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r border-zinc-800 bg-black h-screen flex flex-col hidden md:flex">
      <div className="h-16 flex items-center px-6 border-b border-zinc-800">
        <Link href="/" className="flex items-center gap-2 text-white font-semibold">
          <Box className="w-6 h-6" />
          <span>RackEye</span>
        </Link>
      </div>
      <div className="flex-1 py-6 px-3 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-zinc-800/50 text-white" 
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/30"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
