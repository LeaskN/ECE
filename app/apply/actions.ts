"use server";

const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3002";

type SubmitResult = {
  success: boolean;
  applicationId?: string;
  reviewTier?: string;
  riskFlags?: string[];
  error?: string;
};

export async function submitApplication(
  _prevState: SubmitResult | null,
  formData: FormData,
): Promise<SubmitResult> {
  const payload = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    dateOfBirth: formData.get("dateOfBirth"),
    ssn: formData.get("ssn"),
    addressLine1: formData.get("addressLine1"),
    addressLine2: formData.get("addressLine2"),
    city: formData.get("city"),
    state: formData.get("state"),
    zipCode: formData.get("zipCode"),
    programName: formData.get("programName"),
    amountRequested: formData.get("amountRequested"),
    agreementAccepted: formData.get("agreementAccepted") === "on",
  };

  const response = await fetch(`${API_BASE_URL}/api/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": process.env.INTERNAL_API_KEY ?? "",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      success: false,
      error: data.error ?? "Submission failed",
    };
  }

  return {
    success: true,
    applicationId: data.applicationId,
    reviewTier: data.reviewTier,
    riskFlags: data.riskFlags,
  };
}
