'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownRight, Instagram, Linkedin, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

interface InsightCardProps {
  title: string;
  description: string;
  change: number;
  platform: 'instagram' | 'linkedin';
  type: 'engagement' | 'followers' | 'reach';
}

const InsightCard = ({ title, description, change, platform, type }: InsightCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="cursor-pointer"
    >
      <Card className="border-l-4" style={{ 
        borderLeftColor: platform === 'instagram' ? 'hsl(var(--chart-1))' : 'hsl(var(--chart-2))'
      }}>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                {platform === 'instagram' ? (
                  <Instagram className="h-4 w-4 text-pink-500" />
                ) : (
                  <Linkedin className="h-4 w-4 text-blue-600" />
                )}
                <h4 className="font-medium text-sm">{title}</h4>
              </div>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <Badge 
              variant={change > 0 ? 'outline' : 'destructive'} 
              className={`${change > 0 ? 'bg-green-500/10 text-green-600 border-green-500/20' : ''}`}
            >
              {change > 0 ? (
                <ArrowUpRight className="mr-1 h-3 w-3" />
              ) : (
                <ArrowDownRight className="mr-1 h-3 w-3" />
              )}
              {Math.abs(change)}%
            </Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export function RecentInsights() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl flex items-center">
              <Lightbulb className="mr-2 h-5 w-5" />
              Recent Insights
            </CardTitle>
            <CardDescription>
              Performance changes in the last 7 days
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm">
            View all
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <InsightCard 
          title="Instagram Engagement"
          description="Your video posts are generating 28% more comments"
          change={28}
          platform="instagram"
          type="engagement"
        />
        <InsightCard 
          title="LinkedIn Reach"
          description="Your industry posts reached 42% more professionals"
          change={42}
          platform="linkedin"
          type="reach"
        />
        <InsightCard 
          title="Instagram Followers"
          description="Your follower growth rate declined this week"
          change={-5}
          platform="instagram"
          type="followers"
        />
        <InsightCard 
          title="LinkedIn Engagement"
          description="Your thought leadership posts performed well"
          change={13}
          platform="linkedin"
          type="engagement"
        />
      </CardContent>
    </Card>
  );
}