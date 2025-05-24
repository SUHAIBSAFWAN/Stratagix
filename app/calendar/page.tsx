'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  CalendarIcon, 
  ImageIcon, 
  VideoIcon, 
  FileTextIcon, 
  Clock, 
  Calendar, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Instagram,
  Linkedin
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { addDays, format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameMonth, isToday, isSameDay, addMonths, subMonths } from 'date-fns';

// Dummy data for scheduled content
const scheduledContent = [
  {
    id: 1,
    title: 'Product Launch Announcement',
    type: 'image',
    date: new Date(2025, 4, 10),
    platform: 'instagram',
    status: 'scheduled',
    time: '10:00 AM',
  },
  {
    id: 2,
    title: 'Industry Insights Article',
    type: 'article',
    date: new Date(2025, 4, 12),
    platform: 'linkedin',
    status: 'scheduled',
    time: '2:00 PM',
  },
  {
    id: 3,
    title: 'Team Culture Video',
    type: 'video',
    date: new Date(2025, 4, 15),
    platform: 'both',
    status: 'draft',
    time: '4:30 PM',
  },
  {
    id: 4,
    title: 'Customer Testimonial',
    type: 'image',
    date: new Date(2025, 4, 18),
    platform: 'instagram',
    status: 'scheduled',
    time: '1:15 PM',
  },
  {
    id: 5,
    title: 'Product Demo',
    type: 'video',
    date: new Date(2025, 4, 20),
    platform: 'both',
    status: 'draft',
    time: '11:00 AM',
  },
];

// Function to get content type icon
const getContentTypeIcon = (type: string) => {
  switch (type) {
    case 'image':
      return <ImageIcon className="w-4 h-4" />;
    case 'video':
      return <VideoIcon className="w-4 h-4" />;
    case 'article':
      return <FileTextIcon className="w-4 h-4" />;
    default:
      return <CalendarIcon className="w-4 h-4" />;
  }
};

// Function to get platform icon
const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case 'instagram':
      return <Instagram className="w-4 h-4 text-pink-500" />;
    case 'linkedin':
      return <Linkedin className="w-4 h-4 text-blue-600" />;
    case 'both':
      return (
        <div className="flex -space-x-1">
          <Instagram className="w-4 h-4 text-pink-500" />
          <Linkedin className="w-4 h-4 text-blue-600" />
        </div>
      );
    default:
      return null;
  }
};

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<string>('month');

  // Filter content for selected date
  const selectedDateContent = scheduledContent.filter(
    (content) => selectedDate && isSameDay(content.date, selectedDate)
  );

  // Get days for month view
  const monthDays = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  // Previous and next month handlers
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  // Get content for a specific day
  const getDayContent = (day: Date) => {
    return scheduledContent.filter((content) => isSameDay(content.date, day));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Content Calendar</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Create Content
          </Button>
        </div>
      </div>

      <Tabs defaultValue="month" onValueChange={setView} className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-semibold">
              {format(currentMonth, 'MMMM yyyy')}
            </h2>
            <Button variant="outline" size="sm" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="month" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="grid grid-cols-7 bg-muted">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-px bg-muted">
                {/* Fill in leading empty cells */}
                {Array.from({ length: getDay(startOfMonth(currentMonth)) }).map((_, i) => (
                  <div key={`empty-start-${i}`} className="bg-background min-h-[100px]" />
                ))}

                {/* Calendar days */}
                {monthDays.map((day) => {
                  const dayContent = getDayContent(day);
                  
                  return (
                    <motion.div
                      key={day.toString()}
                      whileHover={{ scale: 0.98 }}
                      className={`bg-background min-h-[100px] p-1 cursor-pointer ${
                        selectedDate && isSameDay(day, selectedDate)
                          ? 'ring-2 ring-primary'
                          : ''
                      } ${isToday(day) ? 'bg-accent/20' : ''}`}
                      onClick={() => setSelectedDate(day)}
                    >
                      <div className="flex justify-between p-1">
                        <span
                          className={`text-sm font-medium ${
                            !isSameMonth(day, currentMonth)
                              ? 'text-muted-foreground'
                              : ''
                          } ${isToday(day) ? 'bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center' : ''}`}
                        >
                          {format(day, 'd')}
                        </span>
                        {dayContent.length > 0 && (
                          <Badge variant="outline" className="text-xs">
                            {dayContent.length}
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-1 mt-1">
                        {dayContent.slice(0, 2).map((content) => (
                          <div
                            key={content.id}
                            className={`text-xs p-1 rounded truncate ${
                              content.status === 'draft'
                                ? 'bg-muted'
                                : content.platform === 'instagram'
                                ? 'bg-pink-500/10 text-pink-700 dark:text-pink-300'
                                : 'bg-blue-500/10 text-blue-700 dark:text-blue-300'
                            }`}
                          >
                            <div className="flex items-center space-x-1">
                              {getContentTypeIcon(content.type)}
                              <span className="truncate">{content.title}</span>
                            </div>
                          </div>
                        ))}
                        {dayContent.length > 2 && (
                          <div className="text-xs text-muted-foreground text-center">
                            +{dayContent.length - 2} more
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="day" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : 'Select a date'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </div>
                <div className="md:col-span-2">
                  {selectedDateContent.length > 0 ? (
                    <div className="space-y-4">
                      {selectedDateContent.map((content) => (
                        <motion.div
                          key={content.id}
                          whileHover={{ y: -2 }}
                          className="p-4 border rounded-lg"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center space-x-2">
                                {getContentTypeIcon(content.type)}
                                <h3 className="font-medium">{content.title}</h3>
                              </div>
                              <div className="flex items-center mt-2 text-sm text-muted-foreground space-x-2">
                                <div className="flex items-center">
                                  <Clock className="mr-1 h-3 w-3" />
                                  {content.time}
                                </div>
                                <div className="flex items-center">
                                  {getPlatformIcon(content.platform)}
                                </div>
                              </div>
                            </div>
                            <Badge
                              variant={content.status === 'scheduled' ? 'default' : 'outline'}
                              className={content.status === 'draft' ? 'bg-muted text-muted-foreground' : ''}
                            >
                              {content.status}
                            </Badge>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full py-8">
                      <Calendar className="h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">No content scheduled</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {selectedDate
                          ? `No content is scheduled for ${format(selectedDate, 'MMMM d, yyyy')}`
                          : 'Select a date to view scheduled content'}
                      </p>
                      <Button className="mt-4">
                        <Plus className="mr-2 h-4 w-4" />
                        Schedule Content
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>All Scheduled Content</CardTitle>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {scheduledContent.map((content) => (
                  <motion.div
                    key={content.id}
                    whileHover={{ x: 5 }}
                    className="p-3 border rounded-lg flex justify-between items-center"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-md ${
                        content.type === 'image' 
                          ? 'bg-pink-500/10' 
                          : content.type === 'video'
                          ? 'bg-red-500/10'
                          : 'bg-blue-500/10'
                      }`}>
                        {getContentTypeIcon(content.type)}
                      </div>
                      <div>
                        <h3 className="font-medium">{content.title}</h3>
                        <div className="flex items-center mt-1 text-sm text-muted-foreground space-x-2">
                          <span>{format(content.date, 'MMM d, yyyy')}</span>
                          <span>•</span>
                          <span>{content.time}</span>
                          <span>•</span>
                          <span className="flex items-center">
                            {getPlatformIcon(content.platform)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={content.status === 'scheduled' ? 'default' : 'outline'}
                      className={content.status === 'draft' ? 'bg-muted text-muted-foreground' : ''}
                    >
                      {content.status}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}