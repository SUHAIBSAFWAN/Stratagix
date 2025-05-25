# StrageiX - Social Media Management Platform

A comprehensive social media management platform built with Next.js, featuring analytics, content planning, and trend analysis for Instagram and LinkedIn.

## Features

- **Authentication & Integration**
  - Secure OAuth authentication for Instagram and LinkedIn
  - Supabase-based token management
  - Real-time data synchronization

- **Analytics Dashboard**
  - Real-time metrics tracking
  - Interactive data visualization
  - Performance insights
  - Audience demographics

- **Trend Analysis**
  - Platform-specific trend monitoring
  - Actionable recommendations
  - Content strategy insights

- **Company Profile Management**
  - Brand identity management
  - Target audience definition
  - Visual brand elements
  - Competitor analysis

- **Content Calendar**
  - Strategic content planning
  - Visual scheduling interface
  - Content categorization
  - Performance tracking

## Tech Stack

- **Frontend**
  - Next.js 13 (App Router)
  - TailwindCSS
  - shadcn/ui components
  - Framer Motion
  - Recharts

- **Backend**
  - Supabase
  - Edge Functions
  - Real-time subscriptions
  - Row Level Security

## Prerequisites

- Node.js 18.x or later
- Supabase account
- Instagram Developer account
- LinkedIn Developer account

## Installation

1. Clone the repository:
   ```bash
   git clone (https://github.com/SUHAIBSAFWAN/Stratagix.git)
   cd strategix
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

   Add your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── analytics/         # Analytics page
│   ├── audience/          # Audience insights
│   ├── auth/             # Authentication
│   ├── calendar/         # Content calendar
│   ├── performance/      # Performance metrics
│   ├── profiles/         # Company profiles
│   ├── settings/         # User settings
│   └── trends/           # Trend analysis
├── components/            # React components
│   ├── dashboard/        # Dashboard components
│   ├── layout/           # Layout components
│   └── ui/              # UI components
├── lib/                  # Utility functions
│   └── supabase/        # Supabase client
└── supabase/             # Supabase configuration
    ├── functions/       # Edge Functions
    └── migrations/      # Database migrations
```

## Database Schema

### Profiles
- User profiles and authentication
- Social media connections
- Account preferences

### Company Profiles
- Brand identity
- Target audience
- Visual elements
- Competitor analysis

### Content Calendar
- Scheduled posts
- Content categories
- Performance metrics
- Publishing status

### Analytics
- Engagement metrics
- Audience demographics
- Content performance
- Growth trends

## Edge Functions

### Instagram Data
- Real-time metrics
- Post analytics
- Audience insights
- Engagement tracking

### LinkedIn Data
- Company page metrics
- Post performance
- Follower demographics
- Engagement analysis

## Security

- Row Level Security (RLS) policies
- Secure token management
- OAuth2 implementation
- Data encryption

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@socialpro.com or join our Discord community.

## Roadmap

- [ ] AI-powered content suggestions
- [ ] Advanced analytics exports
- [ ] Team collaboration features
- [ ] Custom reporting tools
- [ ] Multi-platform expansion

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)
- [Framer Motion](https://www.framer.com/motion/)
