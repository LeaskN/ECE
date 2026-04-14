export function getStringValue(value: FormDataEntryValue | unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function getDigitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

export function getUserAge(dateOfBirth: string): number {
  const today = new Date();
  const dob = new Date(dateOfBirth);

  let age = today.getFullYear() - dob.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());

  if (!hasHadBirthdayThisYear) {
    age -= 1;
  }

  return age;
}
