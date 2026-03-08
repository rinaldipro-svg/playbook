// lib/ai/prompts.ts

import {
  PlaybookInputs,
  EnrichedContext,
  DecisionArchitecture,
  ProcurementProcess,
  ProfilePresentation,
  PositioningStrategy,
} from "@/lib/types";

export function getEnrichmentPrompt(
  inputs: PlaybookInputs,
  targetData: string,
  companyData: string
): string {
  return `You are a strategic intelligence analyst. Analyze the following raw web data and extract structured intelligence for a ${inputs.marketType}/B2B penetration strategy.

## RAW DATA FROM ${inputs.targetName}'s WEBSITE
${targetData}

## RAW DATA FROM ${inputs.companyName}'s WEBSITE  
${companyData}

## TASK
Extract and return a JSON object (ONLY JSON, no markdown) with this exact structure:

{
  "targetIntelligence": {
    "officialName": "Full legal name of the target",
    "industry": "Primary industry/sector",
    "size": "Employee count or revenue if found",
    "strategicPriorities": ["Priority 1 from their website", "Priority 2", "Priority 3"],
    "knownPainPoints": ["Inferred pain point 1", "Pain point 2", "Pain point 3"],
    "recentNews": ["Any recent initiative or change mentioned"],
    "procurementSignals": ["Any supplier/vendor/procurement info found"],
    "keyTerminology": ["Industry-specific terms they use"],
    "regulatoryEnvironment": ["Applicable regulations"],
    "fiscalCycle": "Fiscal year if identifiable",
    "languageRequirements": "Primary business language(s)"
  },
  "companyIntelligence": {
    "coreSolutions": ["Solution 1", "Solution 2"],
    "certifications": ["ISO 9001"],
    "geographicPresence": ["Country/region 1"],
    "keyDifferentiators": ["Differentiator 1"],
    "relevantExperience": ["Relevant client/project if mentioned"]
  },
  "fitAnalysis": {
    "alignmentScore": "high|medium|low",
    "bestFitAreas": ["Area where seller matches target needs"],
    "gaps": ["Area where seller may need to strengthen"],
    "recommendedAngle": "The single best entry angle for this target"
  }
}`;
}

export function getDecisionArchitecturePrompt(
  inputs: PlaybookInputs,
  enriched: EnrichedContext
): string {
  return `You are a senior B2B/B2G strategic intelligence analyst specializing in stakeholder mapping and organizational power dynamics. You have 20 years of experience mapping decision architectures at ${
    inputs.marketType === "B2G"
      ? "government entities and crown corporations"
      : "Fortune 500 enterprises"
  }.

## INTELLIGENCE BRIEFING
Target: ${inputs.targetName} (${inputs.targetDepartment || "General"})
Industry: ${enriched.targetIntelligence.industry}
Strategic Priorities: ${enriched.targetIntelligence.strategicPriorities.join(", ")}
Recommended Angle: ${enriched.fitAnalysis.recommendedAngle}

## SELLER
Company: ${inputs.companyName}
Description: ${inputs.companyDescription}

## MISSION
Map the complete decision architecture at ${inputs.targetName} for penetration.

${
  inputs.marketType === "B2G"
    ? `
GOVERNMENT-SPECIFIC REQUIREMENTS:
- Include the lobby/transparency registry applicable to this jurisdiction
- Include the public procurement authority with specific thresholds
- Include community/Indigenous stakeholder requirements if applicable
- Reference specific legislation
- Note any trade agreement implications
`
    : `
PRIVATE SECTOR REQUIREMENTS:
- Map the likely incumbent vendors
- Identify board/investment committee thresholds
- Note industry-specific regulatory requirements
`
}

Respond with ONLY a valid JSON object:

{
  "narrative": "A 4-6 sentence strategic briefing describing decision-making dynamics",
  "layers": [
    {
      "name": "Executive Sponsors",
      "color": "#2563EB",
      "badge": "Executive Summit",
      "description": "Layer description",
      "stakeholders": [
        {
          "title": "Exact title",
          "name": "Name or '[To be identified]'",
          "role": "Their specific role and authority",
          "badge": "Role badge",
          "influence": "What they control",
          "detail": "5-8 sentences of actionable intelligence",
          "risk": "critical|high|medium|low"
        }
      ]
    }
  ],
  "sentinels": [
    {
      "name": "External entity name",
      "type": "regulatory|legal|community|competitive",
      "icon": "🔒",
      "color": "#DC2626",
      "detail": "4-6 sentences describing blocking power",
      "mitigation": "3-4 sentences of mitigation steps"
    }
  ],
  "tradeAlert": {
    "title": "Trade Agreement Alert or null if not applicable",
    "content": "Specific implications"
  }
}`;
}

export function getProcurementProcessPrompt(
  inputs: PlaybookInputs,
  enriched: EnrichedContext
): string {
  return `You are a procurement intelligence specialist with expertise in ${
    inputs.marketType === "B2G"
      ? "public sector procurement law and government tender processes"
      : "enterprise vendor management and commercial negotiation"
  }.

## CONTEXT
Target: ${inputs.targetName} (${inputs.targetDepartment || "General"})
Industry: ${enriched.targetIntelligence.industry}
Market Type: ${inputs.marketType}

## MISSION
Map the COMPLETE procurement process including entry gates, dependencies, compliance requirements, and realistic timelines.

${
  inputs.marketType === "B2G"
    ? `
B2G REQUIREMENTS — INCLUDE:
1. FORMAT CONSTRAINTS: File format, size limit, language requirements
2. LANGUAGE COMPLIANCE: Applicable language laws with specific penalties
3. LOBBY REGISTRY: Which registry, registration timeline
4. PUBLIC AUTHORITY: Authorization thresholds and validity period
5. TENDER PLATFORM: Which electronic tendering system to monitor
6. CLASSIFICATION CODES: Which code system (UNSPSC, NIGP, CPV)
`
    : `
B2B REQUIREMENTS:
1. VENDOR QUALIFICATION: Typical qualification process
2. NDA/CONFIDENTIALITY: When and how to establish information sharing
3. EVALUATION CRITERIA: Typical weighting (technical vs. commercial)
4. DECISION TIMELINE: Realistic cycle time from first contact to PO
`
}

Respond with ONLY valid JSON:

{
  "formatConstraints": ${
    inputs.marketType === "B2G"
      ? `[
    { "label": "PDF", "desc": "Only accepted format", "color": "#DC2626" },
    { "label": "< 10 MB", "desc": "Maximum file size", "color": "#DC2626" },
    { "label": "100%", "desc": "In official language", "color": "#DC2626" }
  ]`
      : `null`
  },
  "languageAlert": ${
    inputs.marketType === "B2G"
      ? `{
    "title": "Language Compliance Alert",
    "content": "Specific law name, compliance deadline, penalty amounts"
  }`
      : `null`
  },
  "entryRequirements": [
    {
      "req": "Requirement name",
      "priority": "critical|blocking|important|recommended",
      "timeline": "Specific timeline",
      "detail": "4-6 sentences of specific guidance",
      "icon": "🌐"
    }
  ],
  "cycle": [
    {
      "stage": "Stage name",
      "duration": "Realistic duration range",
      "color": "#hex",
      "actions": ["Action 1", "Action 2"],
      "deps": ["Dependency that must be complete"]
    }
  ],
  "budgetInsight": "3-4 sentences about fiscal cycle and optimal engagement timing"
}`;
}

export function getProfilePresentationPrompt(
  inputs: PlaybookInputs,
  enriched: EnrichedContext
): string {
  return `You are a B2B marketing strategist specializing in corporate presentations and sales enablement for ${
    inputs.marketType === "B2G" ? "government procurement" : "enterprise sales"
  }.

## CONTEXT
Seller: ${inputs.companyName}
Target: ${inputs.targetName} (${inputs.targetDepartment || "General"})
Best Fit Areas: ${enriched.fitAnalysis.bestFitAreas.join(", ")}

## MISSION
Design a page-by-page corporate presentation template and complete list of supporting documents, tailored to ${inputs.targetName}'s requirements.

Respond with ONLY valid JSON:

{
  "positioning": "A single powerful positioning statement in quotes",
  "pages": [
    {
      "num": 1,
      "title": "Page title",
      "content": "3-4 sentences describing page content",
      "fields": ["Field 1", "Field 2", "Field 3"],
      "design": "1-2 sentences on visual design"
    }
  ],
  "documents": [
    {
      "name": "Document name",
      "priority": "must-have|recommended|nice-to-have",
      "outline": [
        "Section/content item 1",
        "Section 2",
        "Section 3",
        "Section 4",
        "Section 5"
      ]
    }
  ]
}`;
}

export function getPositioningStrategyPrompt(
  inputs: PlaybookInputs,
  enriched: EnrichedContext
): string {
  return `You are a competitive strategy consultant who has led 200+ enterprise penetration campaigns. You specialize in displacing incumbent vendors.

## CONTEXT
Seller: ${inputs.companyName} - ${inputs.companyDescription}
Target: ${inputs.targetName}
Pain Points: ${enriched.targetIntelligence.knownPainPoints.join(", ")}

## MISSION
Develop a COMPLETE positioning strategy including value proposition, competitive analysis, messaging pillars, and objection handling.

Respond with ONLY valid JSON:

{
  "valueProp": {
    "primary": "Single sentence connecting capability to need",
    "supporting": ["Value point 1", "Point 2", "Point 3", "Point 4"],
    "metrics": ["[XX]% metric 1", "[XX]% metric 2", "[XX] metric 3", "Zero incidents"]
  },
  "competitive": {
    "weaknesses": ["Incumbent weakness 1", "Weakness 2", "Weakness 3", "Weakness 4"],
    "moat": ["Differentiator 1", "Diff 2", "Diff 3", "Diff 4"],
    "switchingNarrative": "5-7 sentences framing the cost of status quo as escalating risk"
  },
  "pillars": [
    {
      "pillar": "Pillar name",
      "audience": "Specific stakeholder group",
      "headline": "Compelling headline",
      "points": ["Proof point 1", "Point 2", "Point 3", "Point 4"]
    }
  ],
  "objections": [
    {
      "objection": "Realistic objection",
      "response": "3-4 sentence strategic response",
      "evidence": "Specific evidence to deploy"
    }
  ]
}`;
}
