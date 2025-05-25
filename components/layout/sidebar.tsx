'use client';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { 
  BarChart3Icon, 
  CalendarIcon, 
  Settings, 
  LineChart, 
  TrendingUp, 
  Users, 
  Building, 
  LayoutDashboard, 
  MenuIcon, 
  X,
  CalendarCheck // Added for Planner icon
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/components/layout/theme-toggle';

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  isOpen: boolean;
  target?: string; // Added for new tab functionality
}

const SidebarItem = ({ href, icon, title, isOpen, target }: SidebarItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      target={target} // Added to support opening in new tab
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'justify-start h-10',
        isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground',
        isOpen ? 'w-full px-3' : 'w-full px-3 justify-center'
      )}
    >
      {icon}
      {isOpen && <span className="ml-2">{title}</span>}
    </Link>
  );
};

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.aside
            key="sidebar-expanded"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 240, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="hidden md:flex md:flex-col border-r bg-background h-screen"
          >
            <div className="flex items-center justify-between h-16 px-4 border-b">
              <span className="text-xl font-bold">
                STRATEGI<span className="text-blue-500 text-3xl">X</span>
              </span>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-md hover:bg-accent"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto py-4 px-3 space-y-2">
              <SidebarItem 
                href="/" 
                icon={<LayoutDashboard size={20} />} 
                title="Dashboard" 
                isOpen={isOpen} 
              />
              <SidebarItem 
                href="/analytics" 
                icon={<BarChart3Icon size={20} />} 
                title="Analytics" 
                isOpen={isOpen} 
              />
              <SidebarItem 
                href="/trends" 
                icon={<TrendingUp size={20} />} 
                title="Trends" 
                isOpen={isOpen} 
              />
              <SidebarItem 
                href="/profiles" 
                icon={<Building size={20} />} 
                title="Profiles" 
                isOpen={isOpen} 
              />
              <SidebarItem 
                href="/calendar" 
                icon={<CalendarIcon size={20} />} 
                title="Calendar" 
                isOpen={isOpen} 
              />
              <SidebarItem 
                href="/performance" 
                icon={<LineChart size={20} />} 
                title="Performance" 
                isOpen={isOpen} 
              />
              <SidebarItem 
                href="/audience" 
                icon={<Users size={20} />} 
                title="Audience" 
                isOpen={isOpen} 
              />
              {/* Added Planner item */}
              <SidebarItem 
                href="https://stratagixx.vercel.app/" // Replace with actual project URL
                icon={<CalendarCheck size={20} />} 
                title="Planner" 
                isOpen={isOpen}
                target="_blank" 
              />
              <SidebarItem 
                href="/settings" 
                icon={<Settings size={20} />} 
                title="Settings" 
                isOpen={isOpen} 
              />
            </div>
            <div className="p-4 border-t">
              <ThemeToggle />
            </div>
          </motion.aside>
        ) : (
          <motion.aside
            key="sidebar-collapsed"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 80, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="hidden md:flex md:flex-col border-r bg-background h-screen"
          >
            <div className="flex items-center justify-center h-16 px-4 border-b">
              <button 
                onClick={() => setIsOpen(true)}
                className="p-2 rounded-md hover:bg-accent"
              >
                <MenuIcon size={20} />
              </button>
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto py-4 px-3 space-y-2">
              <SidebarItem 
                href="/" 
                icon={<LayoutDashboard size={20} />} 
                title="Dashboard" 
                isOpen={isOpen} 
              />
              <SidebarItem 
                href="/analytics" 
                icon={<BarChart3Icon size={20} />} 
                title="Analytics" 
                isOpen={isOpen} 
              />
              <SidebarItem 
                href="/trends" 
                icon={<TrendingUp size={20} />} 
                title="Trends" 
                isOpen={isOpen} 
              />
              <SidebarItem 
                href="/profiles" 
                icon={<Building size={20} />} 
                title="Profiles" 
                isOpen={isOpen} 
              />
              <SidebarItem 
                href="/calendar" 
                icon={<CalendarIcon size={20} />} 
                title="Calendar" 
                isOpen={isOpen} 
              />
              <SidebarItem 
                href="/performance" 
                icon={<LineChart size={20} />} 
                title="Performance" 
                isOpen={isOpen} 
              />
              <SidebarItem 
                href="/audience" 
                icon={<Users size={20} />} 
                title="Audience" 
                isOpen={isOpen} 
              />
              {/* Added Planner item */}
              <SidebarItem 
                href="https://github.com/Parth-Asawa/strategix.git" // Replace with actual project URL
                icon={<CalendarCheck size={20} />} 
                title="Planner" 
                isOpen={isOpen}
                target="_blank" 
              />
              <SidebarItem 
                href="/settings" 
                icon={<Settings size={20} />} 
                title="Settings" 
                isOpen={isOpen} 
              />
            </div>
            <div className="flex justify-center p-4 border-t">
              <ThemeToggle />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      
      {/* Mobile Sidebar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background z-50">
        <div className="flex justify-around p-2">
          <Link href="/" className="p-2">
            <LayoutDashboard size={24} />
          </Link>
          <Link href="/analytics" className="p-2">
            <BarChart3Icon size={24} />
          </Link>
          <Link href="/calendar" className="p-2">
            <CalendarIcon size={24} />
          </Link>
          <Link href="/performance" className="p-2">
            <LineChart size={24} />
          </Link>
          <Link href="/settings" className="p-2">
            <Settings size={24} />
          </Link>
        </div>
      </div>
    </>
  );
}