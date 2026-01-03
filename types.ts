
export interface AuditReport {
  currentFollowers: number;
  engagementRate: string;
  niche: string;
  suggestedContent: string[];
  riskFactor: 'Low' | 'Medium' | 'High';
  competitorAnalysis: string;
}

export interface GrowthStep {
  id: string;
  label: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  timestamp: string;
}

export interface LogEntry {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
}
