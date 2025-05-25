# STRATEGIX Technical Documentation

## Architecture Overview

### Frontend Architecture

#### Component Structure
- **Layout Components**: Reusable layout elements
  - `Sidebar`: Navigation and branding
  - `Header`: User controls and global search
  - `ThemeToggle`: Dark/light mode switcher

- **Dashboard Components**: Data visualization
  - `DashboardOverview`: Main metrics display
  - `RecentInsights`: Latest analytics
  - `UpcomingContent`: Scheduled content preview
  - `AccountConnectCards`: Platform connections

- **Page Components**: Feature-specific implementations
  - Analytics, Audience, Calendar, Performance, Profiles, Settings, Trends

#### State Management
- React's built-in hooks for local state
- Supabase real-time subscriptions for data sync
- React Query for server state management

### Backend Architecture

#### Database Design

1. **Authentication Tables**
```sql
profiles
  - id (uuid, PK)
  - email (text)
  - full_name (text)
  - created_at (timestamp)
  - updated_at (timestamp)

social_accounts
  - id (uuid, PK)
  - profile_id (uuid, FK)
  - platform (text)
  - access_token (text)
  - refresh_token (text)
  - platform_user_id (text)
  - metadata (jsonb)
```

2. **Content Management Tables**
```sql
content_items
  - id (uuid, PK)
  - profile_id (uuid, FK)
  - company_profile_id (uuid, FK)
  - title (text)
  - description (text)
  - content_type (text)
  - platform (text)
  - scheduled_date (timestamp)
  - status (text)
  - content_data (jsonb)
  - performance_metrics (jsonb)
```

3. **Analytics Tables**
```sql
company_profiles
  - id (uuid, PK)
  - profile_id (uuid, FK)
  - name (text)
  - description (text)
  - mission (text)
  - audience (jsonb)
  - brand_voice (jsonb)
  - competitors (text[])
  - visual_elements (jsonb)

trends
  - id (uuid, PK)
  - title (text)
  - category (text)
  - platform (text)
  - description (text)
  - relevance (integer)
  - growth (integer)
  - momentum (text)
  - hashtags (text[])
  - examples (jsonb[])
```

#### Edge Functions

1. **Instagram Data Function**
```typescript
// Endpoint: /functions/get-instagram-data
// Purpose: Fetch Instagram metrics and insights
// Authentication: Requires valid JWT
// Rate Limiting: 100 requests per minute
```

2. **LinkedIn Data Function**
```typescript
// Endpoint: /functions/get-linkedin-data
// Purpose: Fetch LinkedIn company metrics
// Authentication: Requires valid JWT
// Rate Limiting: 100 requests per minute
```

### Security Implementation

#### Row Level Security (RLS)

1. **Profiles Table**
```sql
-- Read access
USING (auth.uid() = id)
-- Update access
USING (auth.uid() = id)
```

2. **Social Accounts Table**
```sql
-- Read access
USING (profile_id = auth.uid())
-- Write access
WITH CHECK (profile_id = auth.uid())
```

3. **Content Items Table**
```sql
-- Read access
USING (profile_id = auth.uid())
-- Write access
WITH CHECK (profile_id = auth.uid())
```

#### OAuth2 Flow

1. **Instagram Authentication**
```typescript
// Scope: instagram_basic, instagram_content_publish
// Response type: code
// Grant type: authorization_code
```

2. **LinkedIn Authentication**
```typescript
// Scope: r_organization_social, w_organization_social
// Response type: code
// Grant type: authorization_code
```

### Performance Optimizations

1. **Database Indexes**
```sql
-- Content calendar queries
CREATE INDEX idx_content_items_scheduled_date 
ON content_items(scheduled_date);

-- Trend analysis
CREATE INDEX idx_trends_category ON trends(category);
CREATE INDEX idx_trends_platform ON trends(platform);
```

2. **Client-Side Optimizations**
- Image optimization with Next.js Image component
- Code splitting per route
- Component-level code splitting
- Lazy loading for charts and heavy components

### Data Flow

1. **Real-time Updates**
```typescript
// Subscribe to changes
supabase
  .channel('table_db_changes')
  .on('postgres_changes', { 
    event: '*', 
    schema: 'public' 
  }, handler)
  .subscribe()
```

2. **Data Fetching Pattern**
```typescript
// React Query implementation
const { data, isLoading } = useQuery({
  queryKey: ['metrics'],
  queryFn: fetchMetrics,
  staleTime: 60000
})
```

### Error Handling

1. **API Error Structure**
```typescript
interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  status: number;
}
```

2. **Global Error Boundary**
```typescript
class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
}
```

### Testing Strategy

1. **Unit Tests**
- Component testing with React Testing Library
- Hook testing with @testing-library/react-hooks
- Utility function testing with Jest

2. **Integration Tests**
- API integration testing
- Database operations testing
- Authentication flow testing

3. **End-to-End Tests**
- User journey testing with Cypress
- Critical path testing
- Cross-browser compatibility

### Deployment Configuration

1. **Build Process**
```bash
# Production build
npm run build
# Static export
next export
```

2. **Environment Variables**
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_INSTAGRAM_CLIENT_ID=
NEXT_PUBLIC_LINKEDIN_CLIENT_ID=
```

### Monitoring and Logging

1. **Application Metrics**
- Request/response times
- Error rates
- User session duration
- Resource utilization

2. **Business Metrics**
- Active users
- Content engagement
- Platform connections
- Feature usage

### API Documentation

1. **Internal APIs**
```typescript
// Fetch analytics
GET /api/analytics
Query params: timeRange, platform

// Update content
PUT /api/content/:id
Body: ContentUpdatePayload
```

2. **External APIs**
```typescript
// Instagram Graph API
GET /instagram/media
GET /instagram/insights

// LinkedIn Marketing API
GET /linkedin/organization
GET /linkedin/analytics
```

### Maintenance Procedures

1. **Database Maintenance**
- Regular backups
- Index optimization
- Query performance monitoring
- Data archival strategy

2. **Application Updates**
- Dependency updates
- Security patches
- Feature deployments
- Rollback procedures

## Technical Requirements

### Development Environment
- Node.js 18.x or later
- npm 9.x or later
- Git 2.x or later

### Production Environment
- Edge Functions runtime
- PostgreSQL 14.x or later
- Redis 6.x or later (optional)

### Browser Support
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Performance Benchmarks

### Target Metrics
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms

### Load Testing
- Concurrent users: 1000
- Response time: < 200ms
- Error rate: < 0.1%
- Throughput: > 100 req/s
