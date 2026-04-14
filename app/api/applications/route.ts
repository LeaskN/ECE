import {
  createApplicationId,
  saveApplication,
  saveHandoffRecord,
} from "@/lib/applications";
import { evaluateApplication } from "@/lib/triage";
import { parseAndValidateApplicationInput } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const apiKey = request.headers.get("X-API-Key");

  if (!apiKey || apiKey !== process.env.INTERNAL_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const rawBody = await request.json();
    const input = parseAndValidateApplicationInput(rawBody);
    const { reviewTier, riskFlags } = evaluateApplication(input);

    const applicationId = createApplicationId();
    const submittedAt = new Date().toISOString();

    saveApplication({
      applicationId,
      submittedAt,
      reviewTier,
      riskFlags,
      ...input,
    });

    saveHandoffRecord({
      applicationId,
      applicantName: `${input.firstName} ${input.lastName}`,
      email: input.email,
      phoneNumber: input.phoneNumber,
      programName: input.programName,
      amountRequested: input.amountRequested,
      reviewTier,
      riskFlags,
      submittedAt,
    });

    return NextResponse.json(
      {
        applicationId,
        reviewTier,
        riskFlags,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid application payload" },
      { status: 400 },
    );
  }
}
