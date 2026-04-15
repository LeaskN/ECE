import { US_STATES } from "@/lib/usStates";

export type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  ssn: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  programName: string;
  amountRequested: string;
  agreementAccepted: boolean;
};

export type StringField = {
  [K in keyof FormValues]: FormValues[K] extends string ? K : never;
}[keyof FormValues];

export type BooleanField = {
  [K in keyof FormValues]: FormValues[K] extends boolean ? K : never;
}[keyof FormValues];

export type FormErrors = Partial<Record<keyof FormValues, string>>;

export const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  dateOfBirth: "",
  ssn: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  zipCode: "",
  programName: "",
  amountRequested: "",
  agreementAccepted: false,
};

function validateRequired(value: string, label: string): string | undefined {
  if (!value.trim()) {
    return `${label} is required`;
  }

  return undefined;
}

function validateEmail(email: string): string | undefined {
  if (!email.trim()) {
    return "Email is required";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Enter a valid email address";
  }

  return undefined;
}

function validatePhoneNumber(phoneNumber: string): string | undefined {
  if (!phoneNumber.trim()) {
    return "Phone number is required";
  }

  const digitsOnly = phoneNumber.replace(/\D/g, "");

  if (digitsOnly.length !== 10) {
    return "Enter a valid 10-digit phone number";
  }

  return undefined;
}

function validateDateOfBirth(dateOfBirth: string): string | undefined {
  if (!dateOfBirth.trim()) {
    return "Date of birth is required";
  }

  const dob = new Date(dateOfBirth);

  if (Number.isNaN(dob.getTime())) {
    return "Enter a valid date of birth";
  }

  const today = new Date();

  let age = today.getFullYear() - dob.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());

  if (!hasHadBirthdayThisYear) {
    age -= 1;
  }

  if (age < 0) {
    return "Date of birth cannot be in the future";
  }

  if (age > 120) {
    return "Enter a realistic date of birth";
  }

  return undefined;
}

function validateSsn(ssn: string): string | undefined {
  if (!ssn.trim()) {
    return "SSN is required";
  }

  if (!/^\d{3}-\d{2}-\d{4}$/.test(ssn)) {
    return "SSN must be in the format 123-45-6789";
  }

  return undefined;
}

function validateState(state: string): string | undefined {
  if (!state.trim()) {
    return "State is required";
  }

  const isValidState = US_STATES.some((entry) => entry.code === state);

  if (!isValidState) {
    return "Select a valid state";
  }

  return undefined;
}

function validateZipCode(zipCode: string): string | undefined {
  if (!zipCode.trim()) {
    return "ZIP code is required";
  }

  if (!/^\d{5}(-\d{4})?$/.test(zipCode)) {
    return "ZIP code must be 5 digits or ZIP+4";
  }

  return undefined;
}

function validateAmountRequested(amountRequested: string): string | undefined {
  if (!amountRequested.trim()) {
    return "Amount requested is required";
  }

  const amount = Number(amountRequested);

  if (!Number.isFinite(amount) || amount <= 0) {
    return "Amount requested must be greater than 0";
  }

  return undefined;
}

function validateAgreement(agreementAccepted: boolean): string | undefined {
  if (!agreementAccepted) {
    return "You must agree to the terms";
  }

  return undefined;
}

export function validateStringField(
  field: StringField,
  value: string,
): string | undefined {
  switch (field) {
    case "firstName":
      return validateRequired(value, "First name");
    case "lastName":
      return validateRequired(value, "Last name");
    case "email":
      return validateEmail(value);
    case "phoneNumber":
      return validatePhoneNumber(value);
    case "dateOfBirth":
      return validateDateOfBirth(value);
    case "ssn":
      return validateSsn(value);
    case "addressLine1":
      return validateRequired(value, "Address line 1");
    case "addressLine2":
      return undefined;
    case "city":
      return validateRequired(value, "City");
    case "state":
      return validateState(value);
    case "zipCode":
      return validateZipCode(value);
    case "programName":
      return validateRequired(value, "Program name");
    case "amountRequested":
      return validateAmountRequested(value);
  }
}

export function validateBooleanField(
  field: BooleanField,
  value: boolean,
): string | undefined {
  switch (field) {
    case "agreementAccepted":
      return validateAgreement(value);
  }
}
