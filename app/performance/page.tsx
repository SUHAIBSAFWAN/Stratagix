'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Target, Users, Share2 } from 'lucide-react';

const performanceData = [
  { date: '2025-01', instagram: 4500, linkedin: 3200, engagement: 2800 },
  { date: '2025-02', instagram: 5200, linkedin: 3800, engagement: 3100 },
  { date: '2025-03', instagram: 4800, linkedin: 4200, engagement: 3400 },
  { date: '2025-04', instagram: 6100, linkedin: 4600, engagement: 3900 },
  { date: '2025-05', instagram: 7200, linkedin: 5100, engagement: 4500 }
];

const contentPerformance = [
  { type: 'Images', instagram: 65, linkedin: 45 },
  { type: 'Videos', instagram: 85, linkedin: 60 },
  { type: 'Articles', instagram: 40, linkedin: 75 },
  { type: 'Stories', instagram: 70, linkedin: 30 },
  { type: 'Carousels', instagram: 75, linkedin: 50 }
];

const engagementDistribution = [
  { name: 'Likes', value: 45 },
  { name: 'Comments', value: 25 },
  { name: 'Shares', value: 15 },
  { name: 'Saves', value: 15 }
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

export default function PerformancePage() {
  const [timeRange, setTimeRange] = useState('30');
  const [platform, setPlatform] = useState('all');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Performance Metrics</h1>
        <div className="flex space-x-2">
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Engagement
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5K</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span className="flex items-center text-green-600">
                <ArrowUpRight className="h-4 w-4" />
                12%
              </span>
              <span>vs last period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Reach
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48.2K</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span className="flex items-center text-green-600">
                <ArrowUpRight className="h-4 w-4" />
                8%
              </span>
              <span>vs last period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span className="flex items-center text-red-600">
                <ArrowDownRight className="h-4 w-4" />
                2%
              </span>
              <span>vs last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content Performance</TabsTrigger>
          <TabsTrigger value="engagement">Engagement Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>
                Track your social media performance metrics over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="instagram" 
                    stroke="hsl(var(--chart-1))" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="linkedin" 
                    stroke="hsl(var(--chart-2))" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="engagement" 
                    stroke="hsl(var(--chart-3))" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Type Performance</CardTitle>
              <CardDescription>
                Compare performance across different content types
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={contentPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="instagram" fill="hsl(var(--chart-1))" />
                  <Bar dataKey="linkedin" fill="hsl(var(--chart-2))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Distribution</CardTitle>
                <CardDescription>
                  Breakdown of engagement types across platforms
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={engagementDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {engagementDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Content</CardTitle>
                <CardDescription>
                  Your best performing posts across platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Product Launch Video</div>
                        <div className="text-sm text-muted-foreground">Posted 3 days ago</div>
                      </div>
                      <Badge variant="secondary">
                        4.2K Engagements
                      </Badge>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    View All Content
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}