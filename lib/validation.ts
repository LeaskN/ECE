import { getStringValue } from "@/lib/utils/common";
import { ApplicationInput } from "@/types/application";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidDate(date: string): boolean {
  return !Number.isNaN(new Date(date).getTime());
}

function isValidSsn(ssn: string): boolean {
  return /^\d{3}-\d{2}-\d{4}$/.test(ssn);
}

function isValidState(state: string): boolean {
  return /^[A-Z]{2}$/.test(state);
}

function isValidZipCode(zipCode: string): boolean {
  return /^\d{5}(-\d{4})?$/.test(zipCode);
}

export function parseAndValidateApplicationInput(
  raw: Record<string, unknown>,
): ApplicationInput {
  const input: ApplicationInput = {
    firstName: getStringValue(raw.firstName),
    lastName: getStringValue(raw.lastName),
    email: getStringValue(raw.email),
    phoneNumber: getStringValue(raw.phoneNumber),
    dateOfBirth: getStringValue(raw.dateOfBirth),
    ssn: getStringValue(raw.ssn),
    addressLine1: getStringValue(raw.addressLine1),
    addressLine2: getStringValue(raw.addressLine2),
    city: getStringValue(raw.city),
    state: getStringValue(raw.state).toUpperCase(),
    zipCode: getStringValue(raw.zipCode),
    programName: getStringValue(raw.programName),
    amountRequested: Number(raw.amountRequested),
    agreementAccepted: raw.agreementAccepted === true,
  };

  if (!input.firstName) {
    throw new Error("First name is required");
  }

  if (!input.lastName) {
    throw new Error("Last name is required");
  }

  if (!isValidEmail(input.email)) {
    throw new Error("A valid email is required");
  }

  if (!input.phoneNumber) {
    throw new Error("Phone number is required");
  }

  if (!isValidDate(input.dateOfBirth)) {
    throw new Error("A valid date of birth is required");
  }

  if (!isValidSsn(input.ssn)) {
    throw new Error("SSN must be in the format nnn-nn-nnnn");
  }

  if (!input.addressLine1) {
    throw new Error("Address line 1 is required");
  }

  if (!input.city) {
    throw new Error("City is required");
  }

  if (!isValidState(input.state)) {
    throw new Error("State must be a 2-letter code");
  }

  if (!isValidZipCode(input.zipCode)) {
    throw new Error("ZIP code must be 5 digits");
  }

  if (!input.programName) {
    throw new Error("Program name is required");
  }

  if (!Number.isFinite(input.amountRequested) || input.amountRequested <= 0) {
    throw new Error("Amount requested must be greater than 0");
  }

  if (!input.agreementAccepted) {
    throw new Error("Agreement must be accepted");
  }

  return input;
}
