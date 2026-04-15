import { ApplicationInput } from "@/types/application";
import { US_STATES } from "@/lib/usStates";
import { getDigitsOnly, getStringValue } from "@/lib/utils/common";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhoneNumber(phoneNumber: string): boolean {
  return getDigitsOnly(phoneNumber).length === 10;
}

function isValidIsoDate(dateOfBirth: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth)) {
    return false;
  }

  const [yearString, monthString, dayString] = dateOfBirth.split("-");
  const year = Number(yearString);
  const month = Number(monthString);
  const day = Number(dayString);

  const dob = new Date(Date.UTC(year, month - 1, day));

  if (
    dob.getUTCFullYear() !== year ||
    dob.getUTCMonth() !== month - 1 ||
    dob.getUTCDate() !== day
  ) {
    return false;
  }

  const today = new Date();
  let age = today.getFullYear() - year;
  const hasHadBirthdayThisYear =
    today.getMonth() + 1 > month ||
    (today.getMonth() + 1 === month && today.getDate() >= day);

  if (!hasHadBirthdayThisYear) {
    age -= 1;
  }

  return age >= 0 && age <= 120;
}

function isValidSsn(ssn: string): boolean {
  return /^\d{3}-\d{2}-\d{4}$/.test(ssn);
}

function isValidState(state: string): boolean {
  return US_STATES.some((entry) => entry.code === state);
}

function isValidZipCode(zipCode: string): boolean {
  return /^\d{5}(-\d{4})?$/.test(zipCode);
}

function isValidAmount(amountRequested: string): boolean {
  if (!/^\d+(\.\d{1,2})?$/.test(amountRequested)) {
    return false;
  }

  const parsedAmount = Number(amountRequested);

  return Number.isFinite(parsedAmount) && parsedAmount > 0;
}

function validateRequired(value: string, label: string): void {
  if (!value) {
    throw new Error(`${label} is required`);
  }
}

export function parseAndValidateApplicationInput(
  raw: Record<string, unknown>,
): ApplicationInput {
  const rawAmountRequested = getStringValue(raw.amountRequested);
  const normalizedState = getStringValue(raw.state).toUpperCase();

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
    state: normalizedState,
    zipCode: getStringValue(raw.zipCode),
    programName: getStringValue(raw.programName),
    amountRequested: 0,
    agreementAccepted: raw.agreementAccepted === true,
  };

  validateRequired(input.firstName, "First name");
  validateRequired(input.lastName, "Last name");
  validateRequired(input.addressLine1, "Address line 1");
  validateRequired(input.city, "City");
  validateRequired(input.programName, "Program name");

  if (!isValidEmail(input.email)) {
    throw new Error("A valid email is required");
  }

  if (!isValidPhoneNumber(input.phoneNumber)) {
    throw new Error("A valid 10-digit phone number is required");
  }

  if (!isValidIsoDate(input.dateOfBirth)) {
    throw new Error("A valid date of birth is required");
  }

  if (!isValidSsn(input.ssn)) {
    throw new Error("SSN must be in the format 123-45-6789");
  }

  if (!isValidState(input.state)) {
    throw new Error("State must be a valid 2-letter US code");
  }

  if (!isValidZipCode(input.zipCode)) {
    throw new Error("ZIP code must be 5 digits or ZIP+4");
  }

  if (!isValidAmount(rawAmountRequested)) {
    throw new Error("Amount requested must be greater than 0");
  }

  if (!input.agreementAccepted) {
    throw new Error("Agreement must be accepted");
  }

  input.amountRequested = Number(rawAmountRequested);

  return input;
}
