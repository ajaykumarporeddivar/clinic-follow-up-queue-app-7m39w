export type ClientStatus = 'Active' | 'Inactive' | 'On Hold' | 'Pending Intake';
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type FollowUpType = 'Call' | 'Email' | 'SMS' | 'In-person' | 'Check-in';
export type RecordSource = 'Manual' | 'Form' | 'Referral';
export type QueueStatus = 'New' | 'Prioritized' | 'Contacted' | 'Closed' | 'Archived';
export type ReportType = 'Retention' | 'Engagement' | 'Conversion';

export interface Clinic {
  id: string;
  name: string;
  location: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Operator' | 'Viewer';
  clinicId: string;
}

export interface Client {
  id: string;
  clinicId: string;
  name: string;
  email: string;
  phone: string;
  lastVisitDate: string; // ISO date string
  nextFollowUpDate: string | null; // ISO date string
  status: ClientStatus;
  notes: string;
}

export interface IntakeRecord {
  id: string;
  clinicId: string;
  clientId: string | null; // Can be null if client isn't yet identified/created
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  description: string;
  source: RecordSource;
  intakeDate: string; // ISO date string
  priority: TaskPriority;
  status: QueueStatus;
  assignedTo: string; // User ID
  notes: string;
  isFlagged: boolean;
}

export interface FollowUpTask {
  id: string;
  clinicId: string;
  intakeRecordId: string;
  clientId: string;
  clientName: string;
  type: FollowUpType;
  dueDate: string; // ISO date string
  priority: TaskPriority;
  status: 'Pending' | 'Completed' | 'Skipped';
  notes: string;
  completedDate: string | null; // ISO date string
  assignedTo: string; // User ID
}

export interface ROIReport {
  id: string;
  clinicId: string;
  title: string;
  type: ReportType;
  dateGenerated: string; // ISO date string
  metrics: {
    totalClients: number;
    newClients: number;
    followUpCompletionRate: number; // percentage 0-100
    repeatVisitRate: number; // percentage 0-100
    estimatedRevenueImpact: number; // currency
  };
  period: 'Last 30 Days' | 'Last 90 Days' | 'Last Year';
  content: string; // Markdown or simple text summary
}