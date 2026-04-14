export function getSsnParts(ssn: string): [string, string, string] {
  const [first3, middle2, last4] = ssn.split("-");

  if (!first3 || !middle2 || !last4) {
    throw new Error("SSN must be validated before use");
  }

  return [first3, middle2, last4];
}

export function formatSsnInput(value: string, previousValue = ""): string {
  const digitsOnly = value.replace(/\D/g, "").slice(0, 9);
  const digitCount = digitsOnly.length;
  const endsWithDash = value.endsWith("-");
  const isDeleting = value.length < previousValue.length;

  if (digitCount < 3) {
    return digitsOnly;
  }

  if (digitCount === 3) {
    if (isDeleting) {
      return digitsOnly;
    }

    return endsWithDash ? `${digitsOnly}-` : digitsOnly;
  }

  if (digitCount < 5) {
    return `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3)}`;
  }

  if (digitCount === 5) {
    if (isDeleting) {
      return `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3)}`;
    }

    return endsWithDash
      ? `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3)}-`
      : `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3)}`;
  }

  return `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3, 5)}-${digitsOnly.slice(5)}`;
}
