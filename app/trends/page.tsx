'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { TrendingUp, Instagram, Linkedin, Search, ThumbsUp, MessageSquare, Share2, Eye, Award, Clock, CloudLightning as Lightning, BookmarkPlus } from 'lucide-react';
import { motion } from 'framer-motion';

// Sample trend data
const trendData = [
  {
    id: 1,
    title: "Sustainable Business Practices",
    category: "Business",
    platform: "linkedin",
    relevance: 95,
    growth: 42,
    momentum: "rising",
    description: "Companies showcasing their sustainability initiatives and eco-friendly practices are seeing significant engagement.",
    hashtags: ["#Sustainability", "#GreenBusiness", "#ClimateAction"],
    examples: [
      {
        title: "Our Journey to Carbon Neutrality",
        engagement: 3245,
        platform: "linkedin"
      }
    ]
  },
  {
    id: 2,
    title: "Behind-the-Scenes Content",
    category: "Content",
    platform: "instagram",
    relevance: 88,
    growth: 35,
    momentum: "rising",
    description: "Authentic behind-the-scenes content showing company culture and product development is driving higher engagement.",
    hashtags: ["#BTS", "#CompanyCulture", "#MeetTheTeam"],
    examples: [
      {
        title: "A Day in the Life of Our Design Team",
        engagement: 2876,
        platform: "instagram"
      }
    ]
  },
  {
    id: 3,
    title: "Data Visualization",
    category: "Content",
    platform: "both",
    relevance: 82,
    growth: 28,
    momentum: "stable",
    description: "Creative data visualization and infographics explaining complex concepts are performing well across platforms.",
    hashtags: ["#DataViz", "#Infographic", "#DataStorytelling"],
    examples: [
      {
        title: "Global Market Trends Visualized",
        engagement: 2145,
        platform: "linkedin"
      }
    ]
  },
  {
    id: 4,
    title: "User-Generated Content",
    category: "Strategy",
    platform: "instagram",
    relevance: 90,
    growth: 38,
    momentum: "rising",
    description: "Brands featuring content created by their customers and followers are seeing higher trust and engagement metrics.",
    hashtags: ["#UGC", "#CustomerStories", "#CommunitySpotlight"],
    examples: [
      {
        title: "Customer Spotlight Series",
        engagement: 3012,
        platform: "instagram"
      }
    ]
  },
  {
    id: 5,
    title: "AI & Future of Work",
    category: "Industry",
    platform: "linkedin",
    relevance: 93,
    growth: 45,
    momentum: "rising",
    description: "Content discussing how AI is transforming industries and the future of work is driving significant engagement.",
    hashtags: ["#AIinBusiness", "#FutureOfWork", "#DigitalTransformation"],
    examples: [
      {
        title: "How We're Implementing AI to Improve Customer Experience",
        engagement: 3542,
        platform: "linkedin"
      }
    ]
  }
];

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

// Momentum badge component
const MomentumBadge = ({ momentum }: { momentum: string }) => {
  let color;
  let icon;
  
  switch (momentum) {
    case 'rising':
      color = 'bg-green-500/10 text-green-600 border-green-500/20';
      icon = <TrendingUp className="w-3 h-3 mr-1" />;
      break;
    case 'stable':
      color = 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      icon = <Lightning className="w-3 h-3 mr-1" />;
      break;
    case 'declining':
      color = 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      icon = <Clock className="w-3 h-3 mr-1" />;
      break;
    default:
      color = '';
      icon = null;
  }
  
  return (
    <Badge variant="outline" className={color}>
      {icon}
      {momentum.charAt(0).toUpperCase() + momentum.slice(1)}
    </Badge>
  );
};

// Component to render trends based on category
const TrendList = ({ trends }: { trends: typeof trendData }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {trends.map((trend) => (
        <motion.div
          key={trend.id}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="cursor-pointer"
        >
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <Badge variant="outline" className="mb-2">
                    {trend.category}
                  </Badge>
                  <CardTitle>{trend.title}</CardTitle>
                </div>
                <div className="flex items-center space-x-1">
                  {getPlatformIcon(trend.platform)}
                </div>
              </div>
              <CardDescription className="line-clamp-2 mt-1">
                {trend.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Relevance</span>
                    <span className="text-sm font-medium">{trend.relevance}%</span>
                  </div>
                  <Progress value={trend.relevance} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Growth</span>
                    <span className="text-sm font-medium">+{trend.growth}%</span>
                  </div>
                  <Progress value={trend.growth} className="h-2" />
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {trend.hashtags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <MomentumBadge momentum={trend.momentum} />
              <Button variant="ghost" size="sm">
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default function TrendsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrend, setSelectedTrend] = useState<typeof trendData[0] | null>(null);
  
  // Filter trends based on category and search query
  const filteredTrends = trendData.filter(trend => {
    const matchesCategory = selectedCategory === 'all' || trend.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      trend.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trend.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trend.hashtags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Filter trends for each category
  const businessTrends = trendData.filter(trend => trend.category.toLowerCase() === 'business');
  const contentTrends = trendData.filter(trend => trend.category.toLowerCase() === 'content');
  const strategyTrends = trendData.filter(trend => trend.category.toLowerCase() === 'strategy');
  const industryTrends = trendData.filter(trend => trend.category.toLowerCase() === 'industry');
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0">
        <h1 className="text-3xl font-bold tracking-tight">Trend Analysis</h1>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search trends..." 
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="all" onValueChange={setSelectedCategory} className="space-y-4">
        <TabsList className="w-full justify-start overflow-auto">
          <TabsTrigger value="all">All Trends</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="strategy">Strategy</TabsTrigger>
          <TabsTrigger value="industry">Industry</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTrends.map((trend) => (
              <motion.div
                key={trend.id}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onClick={() => setSelectedTrend(trend)}
                className="cursor-pointer"
              >
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge variant="outline" className="mb-2">
                          {trend.category}
                        </Badge>
                        <CardTitle>{trend.title}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getPlatformIcon(trend.platform)}
                      </div>
                    </div>
                    <CardDescription className="line-clamp-2 mt-1">
                      {trend.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Relevance</span>
                          <span className="text-sm font-medium">{trend.relevance}%</span>
                        </div>
                        <Progress value={trend.relevance} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Growth</span>
                          <span className="text-sm font-medium">+{trend.growth}%</span>
                        </div>
                        <Progress value={trend.growth} className="h-2" />
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {trend.hashtags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <MomentumBadge momentum={trend.momentum} />
                    <Button variant="ghost" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* Empty state */}
          {filteredTrends.length === 0 && (
            <div className="flex flex-col items-center justify-center p-8">
              <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-1">No trends found</h2>
              <p className="text-muted-foreground text-center">
                Try adjusting your search or filters to find relevant trends.
              </p>
            </div>
          )}
        </TabsContent>
        
        {/* Populated TabsContent for each category */}
        <TabsContent value="business" className="space-y-4">
          <TrendList trends={businessTrends} />
          {businessTrends.length === 0 && (
            <div className="flex flex-col items-center justify-center p-8">
              <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-1">No trends found</h2>
              <p className="text-muted-foreground text-center">
                No trends available in this category.
              </p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="content" className="space-y-4">
          <TrendList trends={contentTrends} />
          {contentTrends.length === 0 && (
            <div className="flex flex-col items-center justify-center p-8">
              <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-1">No trends found</h2>
              <p className="text-muted-foreground text-center">
                No trends available in this category.
              </p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="strategy" className="space-y-4">
          <TrendList trends={strategyTrends} />
          {strategyTrends.length === 0 && (
            <div className="flex flex-col items-center justify-center p-8">
              <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-1">No trends found</h2>
              <p className="text-muted-foreground text-center">
                No trends available in this category.
              </p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="industry" className="space-y-4">
          <TrendList trends={industryTrends} />
          {industryTrends.length === 0 && (
            <div className="flex flex-col items-center justify-center p-8">
              <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-1">No trends found</h2>
              <p className="text-muted-foreground text-center">
                No trends available in this category.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Trend Detail Modal */}
      {selectedTrend && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl bg-background rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="outline">
                      {selectedTrend.category}
                    </Badge>
                    <MomentumBadge momentum={selectedTrend.momentum} />
                    <div className="flex items-center">
                      {getPlatformIcon(selectedTrend.platform)}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold">{selectedTrend.title}</h2>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setSelectedTrend(null)}
                  className="text-muted-foreground"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </Button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Overview</h3>
                  <p className="text-muted-foreground">{selectedTrend.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Relevance to Your Brand</h4>
                    <div className="flex items-center">
                      <Progress value={selectedTrend.relevance} className="h-2 flex-1 mr-2" />
                      <span className="text-sm font-semibold">{selectedTrend.relevance}%</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Growth Rate</h4>
                    <div className="flex items-center">
                      <Progress value={selectedTrend.growth} className="h-2 flex-1 mr-2" />
                      <span className="text-sm font-semibold">+{selectedTrend.growth}%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Popular Hashtags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTrend.hashtags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Successful Examples</h3>
                  {selectedTrend.examples.map((example, index) => (
                    <Card key={index} className="mb-4">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{example.title}</h4>
                            <div className="flex items-center mt-2 space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <ThumbsUp className="mr-1 h-4 w-4" />
                                <span>{Math.floor(example.engagement * 0.6)}</span>
                              </div>
                              <div className="flex items-center">
                                <MessageSquare className="mr-1 h-4 w-4" />
                                <span>{Math.floor(example.engagement * 0.2)}</span>
                              </div>
                              <div className="flex items-center">
                                <Share2 className="mr-1 h-4 w-4" />
                                <span>{Math.floor(example.engagement * 0.2)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {getPlatformIcon(example.platform)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">How to Apply This Trend</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Highlight Your Expertise</h4>
                        <p className="text-sm text-muted-foreground">Share your unique perspective on this trend to position your brand as an authority.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Lightning className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Create Timely Content</h4>
                        <p className="text-sm text-muted-foreground">Develop content that leverages this trend while it's still growing in relevance.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Engage with Your Audience</h4>
                        <p className="text-sm text-muted-foreground">Use these trending topics to spark meaningful conversations with your followers.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-8">
                <Button variant="outline">
                  <BookmarkPlus className="mr-2 h-4 w-4" />
                  Save Trend
                </Button>
                <Button>
                  Use This Trend
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}