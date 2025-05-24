'use client';

import { Bell, Search, UserCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { motion } from 'framer-motion';

export function Header() {
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <header className="bg-background border-b px-4 flex h-16 items-center justify-between">
      <div className="flex items-center flex-1">
        {isSearchActive ? (
          <motion.div 
            initial={{ width: 0, opacity: 0 }} 
            animate={{ width: 'auto', opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="flex-1 max-w-md"
          >
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search..." 
                className="pl-8 w-full"
                onBlur={() => setIsSearchActive(false)}
                autoFocus
              />
            </div>
          </motion.div>
        ) : (
          <Button variant="ghost" size="icon" onClick={() => setIsSearchActive(true)}>
            <Search className="h-5 w-5" />
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-destructive rounded-full"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-96 overflow-y-auto">
              {[1, 2, 3].map((i) => (
                <DropdownMenuItem key={i} className="cursor-pointer flex items-start py-2">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Engagement spike on LinkedIn</span>
                    <span className="text-xs text-muted-foreground">Your latest post is performing 25% better than average</span>
                    <span className="text-xs text-muted-foreground mt-1">2 hours ago</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer justify-center text-sm text-primary">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar>
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}