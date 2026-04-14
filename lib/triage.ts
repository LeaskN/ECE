import { getSsnParts } from "@/lib/utils/ssn";
import { getDigitsOnly, getUserAge } from "@/lib/utils/common";
import { ApplicationInput, ReviewTier } from "@/types/application";

type TriageResult = {
  reviewTier: ReviewTier;
  riskFlags: string[];
};

function getSsnRiskFlags(ssn: string): string[] {
  const flags: string[] = [];
  const [first3, middle2, last4] = getSsnParts(ssn);

  if (first3 === "000") {
    flags.push("invalid_ssn_first_3");
  }

  if (first3 === "666") {
    flags.push("invalid_ssn_666_prefix");
  }

  if (Number(first3) >= 900) {
    flags.push("invalid_ssn_900_series");
  }

  if (middle2 === "00") {
    flags.push("invalid_ssn_middle_2");
  }

  if (last4 === "0000") {
    flags.push("invalid_ssn_last_4");
  }

  if (/^(\d)\1{2}-(\d)\2-(\d)\3{3}$/.test(ssn)) {
    flags.push("suspicious_ssn_repeating_digits");
  }

  if (ssn === "123-45-6789") {
    flags.push("suspicious_ssn_known_fake");
  }

  return flags;
}

export function evaluateApplication(input: ApplicationInput): TriageResult {
  const riskFlags: string[] = [];

  if (input.amountRequested > 1000) {
    riskFlags.push("amount_above_threshold");
  }

  if (getUserAge(input.dateOfBirth) < 18) {
    riskFlags.push("applicant_under_18");
  }

  riskFlags.push(...getSsnRiskFlags(input.ssn));

  const phoneDigits = getDigitsOnly(input.phoneNumber);
  if (phoneDigits.length < 10) {
    riskFlags.push("invalid_phone_number");
  }

  const reviewTier: ReviewTier =
    riskFlags.length > 0 ? "manual_review" : "standard";

  return {
    reviewTier,
    riskFlags,
  };
}
