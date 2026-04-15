export type ReviewTier = "standard" | "manual_review";

export type ApplicationInput = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  ssn: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  programName: string;
  amountRequested: number;
  agreementAccepted: boolean;
};

export type StoredApplication = Omit<ApplicationInput, "ssn"> & {
  applicationId: string;
  submittedAt: string;
  reviewTier: ReviewTier;
  riskFlags: string[];
  ssnEncrypted: string;
};

export type HandoffRecord = {
  applicationId: string;
  applicantName: string;
  email: string;
  phoneNumber: string;
  programName: string;
  amountRequested: number;
  reviewTier: ReviewTier;
  riskFlags: string[];
  submittedAt: string;
};
