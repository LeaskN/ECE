export function getSsnParts(ssn: string): [string, string, string] {
  const [first3, middle2, last4] = ssn.split("-");

  if (!first3 || !middle2 || !last4) {
    throw new Error("SSN must be validated before use");
  }

  return [first3, middle2, last4];
}
