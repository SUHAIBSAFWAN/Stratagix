import { DashboardOverview } from '@/components/dashboard/dashboard-overview';
import { RecentInsights } from '@/components/dashboard/recent-insights';
import { UpcomingContent } from '@/components/dashboard/upcoming-content';
import { AccountConnectCards } from '@/components/dashboard/account-connect-cards';

export default function Home() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      
      <AccountConnectCards />
      
      <DashboardOverview />
      
      <div className="grid gap-6 md:grid-cols-2">
        <RecentInsights />
        <UpcomingContent />
      </div>
    </div>
  );
}