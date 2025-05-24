'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

interface ConnectedAccountProps {
  type: 'instagram' | 'linkedin';
  isConnected: boolean;
}

const ConnectedAccount = ({ type, isConnected }: ConnectedAccountProps) => {
  const handleConnect = () => {
    // This would trigger OAuth flow in a real application
    console.log(`Connect to ${type}`);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Card className={isConnected ? 'border-primary/50' : ''}>
        <CardHeader className="space-y-0 pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center">
              {type === 'instagram' ? (
                <>
                  <Instagram className="mr-2 h-5 w-5 text-pink-500" />
                  Instagram
                </>
              ) : (
                <>
                  <Linkedin className="mr-2 h-5 w-5 text-blue-600" />
                  LinkedIn
                </>
              )}
            </CardTitle>
            {isConnected && (
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Connected
              </Badge>
            )}
          </div>
          <CardDescription>
            {isConnected 
              ? `Your ${type === 'instagram' ? 'Instagram' : 'LinkedIn'} account is connected`
              : `Connect your ${type === 'instagram' ? 'Instagram' : 'LinkedIn'} account to get started`
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isConnected ? (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Account</span>
                <span className="font-medium">
                  {type === 'instagram' ? '@companyname' : 'Company, Inc.'}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Followers</span>
                <span className="font-medium">{type === 'instagram' ? '12.5K' : '8.2K'}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Last synced</span>
                <span className="font-medium">2 hours ago</span>
              </div>
            </div>
          ) : (
            <div className="py-6 flex justify-center">
              <Button onClick={handleConnect} className="w-full">
                Connect {type === 'instagram' ? 'Instagram' : 'LinkedIn'}
              </Button>
            </div>
          )}
        </CardContent>
        {isConnected && (
          <CardFooter className="pt-0">
            <Button variant="ghost" size="sm" className="w-full">
              Manage connection
            </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};

export function AccountConnectCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <ConnectedAccount type="instagram" isConnected={true} />
      <ConnectedAccount type="linkedin" isConnected={true} />
      {/* You can add more platforms here */}
    </div>
  );
}