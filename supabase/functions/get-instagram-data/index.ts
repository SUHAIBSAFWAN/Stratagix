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

    // Get the user's Instagram account from the database
    const { data: socialAccount, error: socialAccountError } = await supabaseClient
      .from('social_accounts')
      .select('*')
      .eq('profile_id', user.id)
      .eq('platform', 'instagram')
      .single();

    if (socialAccountError || !socialAccount) {
      return new Response(JSON.stringify({ error: 'Instagram account not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // In a real implementation, we would use the access_token to fetch data from the Instagram API
    // For this demo, we'll return mock data
    const mockData = {
      account: {
        username: 'company_instagram',
        followers: 12500,
        following: 850,
        posts: 342
      },
      insights: {
        impressions: 45600,
        reach: 32400,
        profileViews: 1240,
        websiteClicks: 380
      },
      recentPosts: [
        {
          id: 'post1',
          type: 'image',
          caption: 'Exciting new product launch coming soon!',
          likes: 532,
          comments: 48,
          saves: 72,
          impressions: 4250,
          reach: 3890,
          engagement_rate: 4.2
        },
        {
          id: 'post2',
          type: 'carousel',
          caption: 'Behind the scenes at our office',
          likes: 872,
          comments: 103,
          saves: 134,
          impressions: 7320,
          reach: 6540,
          engagement_rate: 5.8
        },
        {
          id: 'post3',
          type: 'video',
          caption: 'Our CEO talking about industry trends',
          likes: 412,
          comments: 89,
          saves: 56,
          impressions: 3980,
          reach: 3540,
          engagement_rate: 3.9
        }
      ]
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