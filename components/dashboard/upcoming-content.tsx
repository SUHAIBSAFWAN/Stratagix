'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Clock, Image, FileText, Video, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContentItemProps {
  title: string;
  date: string;
  time: string;
  type: 'image' | 'video' | 'article';
  platform: 'instagram' | 'linkedin' | 'both';
  status: 'draft' | 'scheduled' | 'ready';
}

const ContentItem = ({ title, date, time, type, platform, status }: ContentItemProps) => {
  const getIcon = () => {
    switch (type) {
      case 'image': return <Image className="h-4 w-4 text-blue-500" />;
      case 'video': return <Video className="h-4 w-4 text-red-500" />;
      case 'article': return <FileText className="h-4 w-4 text-green-500" />;
    }
  };

  const getPlatformIcon = () => {
    switch (platform) {
      case 'instagram': return <Instagram className="h-4 w-4 text-pink-500" />;
      case 'linkedin': return <Linkedin className="h-4 w-4 text-blue-600" />;
      case 'both': return (
        <div className="flex -space-x-1">
          <Instagram className="h-4 w-4 text-pink-500" />
          <Linkedin className="h-4 w-4 text-blue-600" />
        </div>
      );
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'draft': 
        return <Badge variant="outline" className="bg-muted text-muted-foreground">Draft</Badge>;
      case 'scheduled': 
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20">Scheduled</Badge>;
      case 'ready': 
        return <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">Ready</Badge>;
    }
  };

  return (
    <motion.div
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="cursor-pointer"
    >
      <div className="flex items-center justify-between py-3 border-b last:border-0">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-muted rounded-md">
            {getIcon()}
          </div>
          <div>
            <div className="font-medium text-sm">{title}</div>
            <div className="flex items-center text-xs text-muted-foreground space-x-2 mt-1">
              <div className="flex items-center">
                <CalendarIcon className="mr-1 h-3 w-3" />
                {date}
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                {time}
              </div>
              <div className="flex items-center">
                {getPlatformIcon()}
              </div>
            </div>
          </div>
        </div>
        {getStatusBadge()}
      </div>
    </motion.div>
  );
};

export function UpcomingContent() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5" />
              Upcoming Content
            </CardTitle>
            <CardDescription>
              Your upcoming scheduled content
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm">
            View calendar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ContentItem 
          title="Q2 Industry Report"
          date="Tomorrow"
          time="10:00 AM"
          type="article"
          platform="linkedin"
          status="scheduled"
        />
        <ContentItem 
          title="Product Launch Teaser"
          date="May 15"
          time="3:30 PM"
          type="video"
          platform="both"
          status="ready"
        />
        <ContentItem 
          title="Team Culture Photoshoot"
          date="May 18"
          time="12:00 PM"
          type="image"
          platform="instagram"
          status="draft"
        />
        <ContentItem 
          title="Customer Success Story"
          date="May 20"
          time="9:15 AM"
          type="article"
          platform="linkedin"
          status="scheduled"
        />
      </CardContent>
    </Card>
  );
}