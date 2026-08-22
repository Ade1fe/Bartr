export interface DashboardStats {
  activeTrades: number;
  activeTradesDelta: string;
  creditBalance: number;
  creditBalanceDelta: string;
  completedTrades: number;
  reputation: number;
  reviewCount: number;
}

export interface ActiveTradeSummary {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerAvatarUrl: string | null;
  title: string;
  status: 'in_progress' | 'pending' | 'completed';
  progress: number;
  daysRemaining: number;
}

export interface DashboardNotification {
  id: string;
  actorName: string;
  actorAvatarUrl: string | null;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface DashboardListing {
  id: string;
  title: string;
  photos: string[];
  views: number;
}

export interface CreditActivity {
  id: string;
  label: string;
  subLabel: string;
  amount: number;
  createdAt: string;
}

export interface TradeStatistics {
  period: 'week' | 'month' | 'year';
  completed: number;
  inProgress: number;
  pending: number;
  trend: 'up' | 'down' | 'flat';
}

export interface DashboardData {
  stats: DashboardStats;
  activeTrades: ActiveTradeSummary[];
  notifications: DashboardNotification[];
  unreadNotificationCount: number;
  listings: DashboardListing[];
  recentCredits: CreditActivity[];
  tradeStatistics: TradeStatistics;
}