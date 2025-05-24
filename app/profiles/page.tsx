'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Building, 
  Edit, 
  Save, 
  Trash2, 
  Plus, 
  Users, 
  Target, 
  MessageSquare, 
  BarChart, 
  Eye,
  Palette,
  Settings
} from 'lucide-react';
import { motion } from 'framer-motion';

// Company profile data
const companyProfiles = [
  {
    id: 1,
    name: "Acme Corporation",
    description: "Leading provider of innovative solutions for businesses of all sizes.",
    mission: "To empower businesses with cutting-edge technology that drives growth and efficiency.",
    audience: {
      demographics: "25-45, professionals, decision-makers",
      interests: "Technology, Innovation, Business Growth",
      painPoints: "Efficiency, Cost Reduction, Scaling Operations"
    },
    brandVoice: {
      tone: "Professional, Confident, Helpful",
      personality: "Innovative, Reliable, Forward-thinking",
      values: "Quality, Integrity, Customer Success"
    },
    competitors: ["TechCorp", "InnoSystems", "NextGen Solutions"],
    visualElements: {
      primaryColor: "#1E40AF",
      secondaryColor: "#60A5FA",
      typography: "Modern, Clean, Sans-serif",
      imageStyle: "Professional, High-quality, Solution-focused"
    }
  },
  {
    id: 2,
    name: "EcoLife Products",
    description: "Sustainable lifestyle products for environmentally conscious consumers.",
    mission: "To create beautiful, functional products that help people reduce their environmental impact.",
    audience: {
      demographics: "22-40, eco-conscious consumers, urban dwellers",
      interests: "Sustainability, Minimalism, Ethical Consumption",
      painPoints: "Environmental Impact, Product Longevity, Greenwashing"
    },
    brandVoice: {
      tone: "Friendly, Authentic, Educational",
      personality: "Passionate, Transparent, Optimistic",
      values: "Sustainability, Quality, Community"
    },
    competitors: ["GreenLiving", "EarthWare", "Sustainable Home"],
    visualElements: {
      primaryColor: "#059669",
      secondaryColor: "#34D399",
      typography: "Organic, Natural, Accessible",
      imageStyle: "Bright, Natural, Lifestyle-focused"
    }
  }
];

export default function ProfilesPage() {
  const [activeTab, setActiveTab] = useState('view');
  const [selectedProfile, setSelectedProfile] = useState(companyProfiles[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(companyProfiles[0]);
  
  // Handle edit button click
  const handleEdit = () => {
    setEditedProfile(selectedProfile);
    setIsEditing(true);
    setActiveTab('edit');
  };
  
  // Handle save button click
  const handleSave = () => {
    setSelectedProfile(editedProfile);
    setIsEditing(false);
    setActiveTab('view');
  };
  
  // Handle cancel button click
  const handleCancel = () => {
    setEditedProfile(selectedProfile);
    setIsEditing(false);
    setActiveTab('view');
  };
  
  // Handle input change
  const handleInputChange = (field: string, value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Handle nested input change
  const handleNestedInputChange = (parent: string, field: string, value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev],
        [field]: value
      }
    }));
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0">
        <h1 className="text-3xl font-bold tracking-tight">Company Profiles</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Profile
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-8">
        {/* Sidebar with profiles list */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Building className="mr-2 h-5 w-5" />
              Company Profiles
            </CardTitle>
            <CardDescription>
              Select a profile to view or edit
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[50vh]">
              {companyProfiles.map((profile) => (
                <motion.div
                  key={profile.id}
                  whileHover={{ backgroundColor: 'hsl(var(--accent))' }}
                  className={`p-3 cursor-pointer ${selectedProfile.id === profile.id ? 'bg-accent' : ''}`}
                  onClick={() => {
                    setSelectedProfile(profile);
                    setEditedProfile(profile);
                    setIsEditing(false);
                    setActiveTab('view');
                  }}
                >
                  <div className="font-medium">{profile.name}</div>
                  <div className="text-sm text-muted-foreground truncate">
                    {profile.description.length > 60 
                      ? `${profile.description.substring(0, 60)}...` 
                      : profile.description}
                  </div>
                </motion.div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
        
        {/* Main content area */}
        <div className="md:col-span-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="view" disabled={isEditing}>View</TabsTrigger>
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="analytics" disabled={isEditing}>Analytics</TabsTrigger>
              </TabsList>
              
              {!isEditing && activeTab === 'view' ? (
                <Button onClick={handleEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              ) : isEditing ? (
                <div className="space-x-2">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              ) : null}
            </div>
            
            <TabsContent value="view" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">{selectedProfile.name}</CardTitle>
                      <CardDescription className="mt-2">
                        {selectedProfile.description}
                      </CardDescription>
                    </div>
                    <div 
                      className="w-16 h-16 rounded-md flex items-center justify-center text-white text-2xl font-bold"
                      style={{ backgroundColor: selectedProfile.visualElements.primaryColor }}
                    >
                      {selectedProfile.name.charAt(0)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium flex items-center mb-2">
                      <MessageSquare className="mr-2 h-5 w-5 text-muted-foreground" />
                      Mission Statement
                    </h3>
                    <p className="text-muted-foreground">{selectedProfile.mission}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium flex items-center mb-3">
                      <Target className="mr-2 h-5 w-5 text-muted-foreground" />
                      Target Audience
                    </h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <h4 className="font-medium">Demographics</h4>
                        <p className="text-sm text-muted-foreground">{selectedProfile.audience.demographics}</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Interests</h4>
                        <p className="text-sm text-muted-foreground">{selectedProfile.audience.interests}</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Pain Points</h4>
                        <p className="text-sm text-muted-foreground">{selectedProfile.audience.painPoints}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium flex items-center mb-3">
                      <MessageSquare className="mr-2 h-5 w-5 text-muted-foreground" />
                      Brand Voice
                    </h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <h4 className="font-medium">Tone</h4>
                        <p className="text-sm text-muted-foreground">{selectedProfile.brandVoice.tone}</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Personality</h4>
                        <p className="text-sm text-muted-foreground">{selectedProfile.brandVoice.personality}</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Values</h4>
                        <p className="text-sm text-muted-foreground">{selectedProfile.brandVoice.values}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium flex items-center mb-3">
                      <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                      Competitors
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProfile.competitors.map((competitor, index) => (
                        <Badge key={index} variant="secondary">
                          {competitor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium flex items-center mb-3">
                      <Palette className="mr-2 h-5 w-5 text-muted-foreground" />
                      Visual Brand Elements
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium">Colors</h4>
                          <div className="flex items-center space-x-2 mt-2">
                            <div 
                              className="w-8 h-8 rounded"
                              style={{ backgroundColor: selectedProfile.visualElements.primaryColor }}
                            ></div>
                            <div className="text-sm">{selectedProfile.visualElements.primaryColor}</div>
                            <div 
                              className="w-8 h-8 rounded ml-4"
                              style={{ backgroundColor: selectedProfile.visualElements.secondaryColor }}
                            ></div>
                            <div className="text-sm">{selectedProfile.visualElements.secondaryColor}</div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium">Typography</h4>
                          <p className="text-sm text-muted-foreground mt-1">{selectedProfile.visualElements.typography}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Image Style</h4>
                        <p className="text-sm text-muted-foreground">{selectedProfile.visualElements.imageStyle}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview Content
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="edit" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Edit Company Profile</CardTitle>
                  <CardDescription>
                    Update the information for {isEditing ? editedProfile.name : selectedProfile.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">Basic Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Company Name</label>
                        <Input 
                          value={editedProfile.name} 
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Company Description</label>
                        <Textarea 
                          value={editedProfile.description} 
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Mission Statement</label>
                        <Textarea 
                          value={editedProfile.mission} 
                          onChange={(e) => handleInputChange('mission', e.target.value)}
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">Target Audience</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Demographics</label>
                        <Input 
                          value={editedProfile.audience.demographics} 
                          onChange={(e) => handleNestedInputChange('audience', 'demographics', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Interests</label>
                        <Input 
                          value={editedProfile.audience.interests} 
                          onChange={(e) => handleNestedInputChange('audience', 'interests', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Pain Points</label>
                        <Input 
                          value={editedProfile.audience.painPoints} 
                          onChange={(e) => handleNestedInputChange('audience', 'painPoints', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">Brand Voice</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Tone</label>
                        <Input 
                          value={editedProfile.brandVoice.tone} 
                          onChange={(e) => handleNestedInputChange('brandVoice', 'tone', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Personality</label>
                        <Input 
                          value={editedProfile.brandVoice.personality} 
                          onChange={(e) => handleNestedInputChange('brandVoice', 'personality', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Values</label>
                        <Input 
                          value={editedProfile.brandVoice.values} 
                          onChange={(e) => handleNestedInputChange('brandVoice', 'values', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">Visual Brand Elements</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium">Primary Color</label>
                        <div className="flex items-center mt-1">
                          <Input 
                            type="color"
                            value={editedProfile.visualElements.primaryColor} 
                            onChange={(e) => handleNestedInputChange('visualElements', 'primaryColor', e.target.value)}
                            className="w-12 h-10 p-1 mr-2"
                          />
                          <Input 
                            value={editedProfile.visualElements.primaryColor} 
                            onChange={(e) => handleNestedInputChange('visualElements', 'primaryColor', e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Secondary Color</label>
                        <div className="flex items-center mt-1">
                          <Input 
                            type="color"
                            value={editedProfile.visualElements.secondaryColor} 
                            onChange={(e) => handleNestedInputChange('visualElements', 'secondaryColor', e.target.value)}
                            className="w-12 h-10 p-1 mr-2"
                          />
                          <Input 
                            value={editedProfile.visualElements.secondaryColor} 
                            onChange={(e) => handleNestedInputChange('visualElements', 'secondaryColor', e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Typography</label>
                        <Input 
                          value={editedProfile.visualElements.typography} 
                          onChange={(e) => handleNestedInputChange('visualElements', 'typography', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Image Style</label>
                        <Input 
                          value={editedProfile.visualElements.imageStyle} 
                          onChange={(e) => handleNestedInputChange('visualElements', 'imageStyle', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Performance</CardTitle>
                  <CardDescription>
                    How content using this profile performs compared to other profiles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-[400px]">
                    <div className="text-center">
                      <BarChart className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">Analytics Coming Soon</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Profile analytics will be available once you have published content using this profile.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}