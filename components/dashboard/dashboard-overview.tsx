'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { useState } from 'react';

const data = [
  { name: 'Mon', followers: 4000, engagement: 2400, reach: 2400 },
  { name: 'Tue', followers: 3000, engagement: 1398, reach: 2210 },
  { name: 'Wed', followers: 2000, engagement: 9800, reach: 2290 },
  { name: 'Thu', followers: 2780, engagement: 3908, reach: 2000 },
  { name: 'Fri', followers: 1890, engagement: 4800, reach: 2181 },
  { name: 'Sat', followers: 2390, engagement: 3800, reach: 2500 },
  { name: 'Sun', followers: 3490, engagement: 4300, reach: 2100 },
];

type MetricType = 'followers' | 'engagement' | 'reach';

export function DashboardOverview() {
  const [metric, setMetric] = useState<MetricType>('followers');
  const [platform, setPlatform] = useState('all');
  
  const getGradientOffset = () => {
    const dataMax = Math.max(...data.map((i) => i[metric]));
    const dataMin = Math.min(...data.map((i) => i[metric]));
    
    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }
    
    return dataMax / (dataMax - dataMin);
  };
  
  const gradientOffset = getGradientOffset();

  return (
    <Card>
      <CardHeader className="space-y-0 pb-2">
        <CardTitle className="text-xl">Performance Overview</CardTitle>
        <CardDescription>
          Track your social media performance over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4" onValueChange={(value) => setPlatform(value)}>
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">All Platforms</TabsTrigger>
              <TabsTrigger value="instagram">Instagram</TabsTrigger>
              <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
            </TabsList>
            
            <div className="flex space-x-2">
              <TabsList>
                <TabsTrigger 
                  value="followers" 
                  onClick={() => setMetric('followers')}
                  className={metric === 'followers' ? 'bg-primary text-primary-foreground' : ''}
                >
                  Followers
                </TabsTrigger>
                <TabsTrigger 
                  value="engagement" 
                  onClick={() => setMetric('engagement')}
                  className={metric === 'engagement' ? 'bg-primary text-primary-foreground' : ''}
                >
                  Engagement
                </TabsTrigger>
                <TabsTrigger 
                  value="reach" 
                  onClick={() => setMetric('reach')}
                  className={metric === 'reach' ? 'bg-primary text-primary-foreground' : ''}
                >
                  Reach
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
          
          <TabsContent value="all" className="pt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <defs>
                    <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey={metric} 
                    stroke="hsl(var(--chart-1))" 
                    fillOpacity={1} 
                    fill="url(#colorMetric)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="instagram" className="pt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey={metric} fill="hsl(var(--chart-2))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="linkedin" className="pt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey={metric} fill="hsl(var(--chart-3))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}