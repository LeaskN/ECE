import { evaluateApplication } from "@/lib/triage";
import { ApplicationInput } from "@/types/application";
import { POST } from "@/app/api/applications/route";
import { NextRequest } from "next/server";

function buildApplication(
  overrides: Partial<ApplicationInput> = {},
): ApplicationInput {
  return {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@example.com",
    phoneNumber: "555-123-4567",
    dateOfBirth: "1990-01-01",
    ssn: "123-45-6788",
    addressLine1: "123 Main St",
    addressLine2: "",
    city: "Tampa",
    state: "FL",
    zipCode: "33602",
    programName: "Teacher Stipend",
    amountRequested: 500,
    agreementAccepted: true,
    ...overrides,
  };
}

describe("evaluateApplication", () => {
  it("returns standard review for a low-risk application", () => {
    const result = evaluateApplication(buildApplication());

    expect(result.reviewTier).toBe("standard");
    expect(result.riskFlags).toEqual([]);
  });

  it("flags applications above the amount threshold for manual review", () => {
    const result = evaluateApplication(
      buildApplication({ amountRequested: 1500 }),
    );

    expect(result.reviewTier).toBe("manual_review");
    expect(result.riskFlags).toContain("amount_above_threshold");
  });

  it("flags underage applicants for manual review", () => {
    const result = evaluateApplication(
      buildApplication({ dateOfBirth: "2012-01-01" }),
    );

    expect(result.reviewTier).toBe("manual_review");
    expect(result.riskFlags).toContain("applicant_under_18");
  });

  it("flags suspicious SSN values for manual review", () => {
    const result = evaluateApplication(
      buildApplication({ ssn: "000-00-0000" }),
    );

    expect(result.reviewTier).toBe("manual_review");
    expect(result.riskFlags).toContain("invalid_ssn_first_3");
    expect(result.riskFlags).toContain("invalid_ssn_middle_2");
    expect(result.riskFlags).toContain("invalid_ssn_last_4");
  });
});

describe("POST /api/applications auth", () => {
  it("returns 401 when API key is missing", async () => {
    const request = new NextRequest("http://localhost:3000/api/applications", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await POST(request);

    expect(response.status).toBe(401);
  });
});
