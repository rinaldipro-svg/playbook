// lib/ai/scraper.ts

import { load } from "cheerio";

export async function scrapeWebsite(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      return `Unable to fetch content from ${url}. Status: ${response.status}`;
    }

    const html = await response.text();
    const $ = load(html);

    // Remove script and style tags
    $("script").remove();
    $("style").remove();

    // Extract main content
    let content = "";

    // Try to get main content area
    const main = $("main").text() || $("article").text() || $("[role='main']").text();
    if (main) {
      content = main;
    } else {
      // Fallback to body text
      content = $("body").text();
    }

    // Clean up whitespace
    content = content
      .replace(/\s+/g, " ")
      .trim()
      .substring(0, 5000);

    return content || "No content could be extracted from the website.";
  } catch (error) {
    return `Error scraping ${url}: ${error instanceof Error ? error.message : "Unknown error"}`;
  }
}
