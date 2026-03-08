// lib/types/index.ts

export interface PlaybookInputs {
  targetName: string;
  targetUrl: string;
  targetDepartment?: string;
  companyName: string;
  companyDescription: string;
  companyUrl: string;
  marketType: "B2B" | "B2G";
}

export interface ScrapedContext {
  targetData: {
    mainContent: string;
    title?: string;
    metadata?: Record<string, string>;
  };
  companyData: {
    mainContent: string;
    title?: string;
    metadata?: Record<string, string>;
  };
}

export interface TargetIntelligence {
  officialName: string;
  industry: string;
  size: string;
  strategicPriorities: string[];
  knownPainPoints: string[];
  recentNews: string[];
  procurementSignals: string[];
  keyTerminology: string[];
  regulatoryEnvironment: string[];
  fiscalCycle: string;
  languageRequirements: string;
}

export interface CompanyIntelligence {
  coreSolutions: string[];
  certifications: string[];
  geographicPresence: string[];
  keyDifferentiators: string[];
  relevantExperience: string[];
}

export interface FitAnalysis {
  alignmentScore: "high" | "medium" | "low";
  bestFitAreas: string[];
  gaps: string[];
  recommendedAngle: string;
}

export interface EnrichedContext {
  targetIntelligence: TargetIntelligence;
  companyIntelligence: CompanyIntelligence;
  fitAnalysis: FitAnalysis;
}

export interface Stakeholder {
  title: string;
  name: string;
  role: string;
  badge: string;
  influence: string;
  detail: string;
  risk: "critical" | "high" | "medium" | "low";
}

export interface StakeholderLayer {
  name: string;
  color: string;
  badge: string;
  description: string;
  stakeholders: Stakeholder[];
}

export interface Sentinel {
  name: string;
  type: "regulatory" | "legal" | "community" | "competitive";
  icon: string;
  color: string;
  detail: string;
  mitigation: string;
}

export interface DecisionArchitecture {
  narrative: string;
  layers: StakeholderLayer[];
  sentinels: Sentinel[];
  tradeAlert: {
    title: string;
    content: string;
  } | null;
}

export interface FormatConstraint {
  label: string;
  desc: string;
  color: string;
}

export interface ProcurementStage {
  stage: string;
  duration: string;
  color: string;
  actions: string[];
  deps: string[];
}

export interface ProcurementProcess {
  formatConstraints: FormatConstraint[] | null;
  languageAlert: {
    title: string;
    content: string;
  } | null;
  entryRequirements: Array<{
    req: string;
    priority: "critical" | "blocking" | "important" | "recommended";
    timeline: string;
    detail: string;
    icon: string;
  }>;
  cycle: ProcurementStage[];
  budgetInsight: string;
}

export interface ProfilePage {
  num: number;
  title: string;
  content: string;
  fields: string[];
  design: string;
}

export interface SupportDocument {
  name: string;
  priority: "must-have" | "recommended" | "nice-to-have";
  outline: string[];
}

export interface ProfilePresentation {
  positioning: string;
  pages: ProfilePage[];
  documents: SupportDocument[];
}

export interface ValueProp {
  primary: string;
  supporting: string[];
  metrics: string[];
}

export interface Competitive {
  weaknesses: string[];
  moat: string[];
  switchingNarrative: string;
}

export interface MessagePillar {
  pillar: string;
  audience: string;
  headline: string;
  points: string[];
}

export interface ObjectionHandler {
  objection: string;
  response: string;
  evidence: string;
}

export interface PositioningStrategy {
  valueProp: ValueProp;
  competitive: Competitive;
  pillars: MessagePillar[];
  objections: ObjectionHandler[];
}

export interface Playbook {
  inputs: PlaybookInputs;
  enrichedContext: EnrichedContext;
  decisionArchitecture: DecisionArchitecture;
  procurementProcess: ProcurementProcess;
  profilePresentation: ProfilePresentation;
  positioning: PositioningStrategy;
  generatedAt: string;
}
