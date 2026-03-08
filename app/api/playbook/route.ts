// app/api/playbook/route.ts

import { NextRequest, NextResponse } from "next/server";
import { generatePlaybook } from "@/lib/ai/pipeline";
import { PlaybookInputs } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate inputs
    const { targetName, targetUrl, companyName, companyUrl, companyDescription, marketType } = body;

    if (!targetName || !targetUrl || !companyName || !companyUrl || !companyDescription || !marketType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const inputs: PlaybookInputs = {
      targetName,
      targetUrl,
      targetDepartment: body.targetDepartment || undefined,
      companyName,
      companyDescription,
      companyUrl,
      marketType,
    };

    const playbook = await generatePlaybook(inputs);

    return NextResponse.json(playbook);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to generate playbook",
      },
      { status: 500 }
    );
  }
}
