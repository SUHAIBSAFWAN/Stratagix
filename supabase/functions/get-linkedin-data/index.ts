// Follow this setup guide to integrate the Deno runtime into your application:
// https://deno.land/manual/examples/deploy_node_npm

import { serve } from "npm:@supabase/functions-js@2.1.3";
import { createClient } from "npm:@supabase/supabase-js@2.39.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders
    });
  }

  try {
    // Create a Supabase client with the Auth context of the logged in user
    const authHeader = req.headers.get('Authorization');
    
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing Authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Parse the token from the Authorization header
    const token = authHeader.replace('Bearer ', '');
    
    // Create a Supabase client with the Admin key
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        global: {
          headers: { Authorization: `Bearer ${token}` },
        },
      }
    );
    
    // Get user data to verify the request
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Get the user's LinkedIn account from the database
    const { data: socialAccount, error: socialAccountError } = await supabaseClient
      .from('social_accounts')
      .select('*')
      .eq('profile_id', user.id)
      .eq('platform', 'linkedin')
      .single();

    if (socialAccountError || !socialAccount) {
      return new Response(JSON.stringify({ error: 'LinkedIn account not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // In a real implementation, we would use the access_token to fetch data from the LinkedIn API
    // For this demo, we'll return mock data
    const mockData = {
      company: {
        name: 'Company, Inc.',
        followers: 8200,
        employees: 124,
        industry: 'Technology'
      },
      analytics: {
        impressions: 28700,
        uniqueVisitors: 12300,
        clicks: 1840,
        engagementRate: 2.7
      },
      recentPosts: [
        {
          id: 'post1',
          type: 'article',
          title: 'Industry Insights: The Future of Technology',
          reactions: 342,
          comments: 78,
          shares: 56,
          impressions: 5670,
          clicks: 430,
          engagement_rate: 3.8
        },
        {
          id: 'post2',
          type: 'image',
          title: 'Meet our new leadership team',
          reactions: 287,
          comments: 42,
          shares: 38,
          impressions: 4280,
          clicks: 310,
          engagement_rate: 3.2
        },
        {
          id: 'post3',
          type: 'document',
          title: 'Q2 Market Analysis Report',
          reactions: 187,
          comments: 31,
          shares: 94,
          impressions: 3870,
          clicks: 520,
          engagement_rate: 4.1
        }
      ],
      followerDemographics: {
        industries: [
          { name: 'Technology', percentage: 42 },
          { name: 'Marketing and Advertising', percentage: 18 },
          { name: 'Financial Services', percentage: 12 },
          { name: 'Other', percentage: 28 }
        ],
        companySize: [
          { size: '1-10', percentage: 15 },
          { size: '11-50', percentage: 28 },
          { size: '51-200', percentage: 22 },
          { size: '201-1000', percentage: 18 },
          { size: '1001+', percentage: 17 }
        ],
        jobFunctions: [
          { function: 'Engineering', percentage: 32 },
          { function: 'Marketing', percentage: 24 },
          { function: 'Operations', percentage: 18 },
          { function: 'Sales', percentage: 14 },
          { function: 'Other', percentage: 12 }
        ]
      }
    };

    return new Response(JSON.stringify(mockData), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});