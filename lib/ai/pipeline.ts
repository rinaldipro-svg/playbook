// lib/ai/pipeline.ts

import { Anthropic } from "@anthropic-ai/sdk";
import {
  PlaybookInputs,
  EnrichedContext,
  DecisionArchitecture,
  ProcurementProcess,
  ProfilePresentation,
  PositioningStrategy,
} from "@/lib/types";
import { scrapeWebsite } from "./scraper";
import {
  getEnrichmentPrompt,
  getDecisionArchitecturePrompt,
  getProcurementProcessPrompt,
  getProfilePresentationPrompt,
  getPositioningStrategyPrompt,
} from "./prompts";

const client = new Anthropic();

export async function enrichContext(
  inputs: PlaybookInputs,
  targetData: string,
  companyData: string
): Promise<EnrichedContext> {
  const enrichmentPrompt = getEnrichmentPrompt(inputs, targetData, companyData);

  const message = await client.messages.create({
    model: "claude-3-5-haiku-20241022",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: enrichmentPrompt,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from Claude");
  }

  try {
    const enriched = JSON.parse(content.text);
    return enriched as EnrichedContext;
  } catch (error) {
    console.error("Failed to parse enrichment response:", content.text);
    throw new Error("Failed to parse Claude response as JSON");
  }
}

export async function generateDecisionArchitecture(
  inputs: PlaybookInputs,
  enriched: EnrichedContext
): Promise<DecisionArchitecture> {
  const prompt = getDecisionArchitecturePrompt(inputs, enriched);

  const message = await client.messages.create({
    model: "claude-3-5-haiku-20241022",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from Claude");
  }

  try {
    const result = JSON.parse(content.text);
    return result as DecisionArchitecture;
  } catch (error) {
    console.error("Failed to parse decision architecture response:", content.text);
    throw new Error("Failed to parse Claude response as JSON");
  }
}

export async function generateProcurementProcess(
  inputs: PlaybookInputs,
  enriched: EnrichedContext
): Promise<ProcurementProcess> {
  const prompt = getProcurementProcessPrompt(inputs, enriched);

  const message = await client.messages.create({
    model: "claude-3-5-haiku-20241022",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from Claude");
  }

  try {
    const result = JSON.parse(content.text);
    return result as ProcurementProcess;
  } catch (error) {
    console.error("Failed to parse procurement process response:", content.text);
    throw new Error("Failed to parse Claude response as JSON");
  }
}

export async function generateProfilePresentation(
  inputs: PlaybookInputs,
  enriched: EnrichedContext
): Promise<ProfilePresentation> {
  const prompt = getProfilePresentationPrompt(inputs, enriched);

  const message = await client.messages.create({
    model: "claude-3-5-haiku-20241022",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from Claude");
  }

  try {
    const result = JSON.parse(content.text);
    return result as ProfilePresentation;
  } catch (error) {
    console.error("Failed to parse profile presentation response:", content.text);
    throw new Error("Failed to parse Claude response as JSON");
  }
}

export async function generatePositioningStrategy(
  inputs: PlaybookInputs,
  enriched: EnrichedContext
): Promise<PositioningStrategy> {
  const prompt = getPositioningStrategyPrompt(inputs, enriched);

  const message = await client.messages.create({
    model: "claude-3-5-haiku-20241022",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from Claude");
  }

  try {
    const result = JSON.parse(content.text);
    return result as PositioningStrategy;
  } catch (error) {
    console.error("Failed to parse positioning strategy response:", content.text);
    throw new Error("Failed to parse Claude response as JSON");
  }
}

export async function generatePlaybook(inputs: PlaybookInputs) {
  try {
    // Step 1: Scrape websites
    console.log("Scraping websites...");
    const targetData = await scrapeWebsite(inputs.targetUrl);
    const companyData = await scrapeWebsite(inputs.companyUrl);

    // Step 2: Enrich context
    console.log("Enriching context with AI...");
    const enrichedContext = await enrichContext(
      inputs,
      targetData,
      companyData
    );

    // Step 3: Generate all sections in parallel
    console.log("Generating playbook sections...");
    const [decisionArchitecture, procurementProcess, profilePresentation, positioning] =
      await Promise.all([
        generateDecisionArchitecture(inputs, enrichedContext),
        generateProcurementProcess(inputs, enrichedContext),
        generateProfilePresentation(inputs, enrichedContext),
        generatePositioningStrategy(inputs, enrichedContext),
      ]);

    return {
      inputs,
      enrichedContext,
      decisionArchitecture,
      procurementProcess,
      profilePresentation,
      positioning,
      generatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error generating playbook:", error);
    throw error;
  }
}
