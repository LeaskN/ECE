"use client";

import {
  ChangeEvent,
  SyntheticEvent,
  useActionState,
  useEffect,
  useState,
} from "react";
import { ApplicantInformationSection } from "@/components/forms/ApplicantInformationSection";
import { ProgramInformationSection } from "@/components/forms/ProgramInformationSection";
import { submitApplication } from "@/app/apply/actions";
import { formatSsnInput } from "@/lib/utils/ssn";
import {
  FormErrors,
  FormValues,
  StringField,
  BooleanField,
  initialValues,
  validateStringField,
  validateBooleanField,
} from "@/lib/applicationFormValidation";

const stringFields: StringField[] = [
  "firstName",
  "lastName",
  "email",
  "phoneNumber",
  "dateOfBirth",
  "ssn",
  "addressLine1",
  "addressLine2",
  "city",
  "state",
  "zipCode",
  "programName",
  "amountRequested",
];

const requiredSubmitStringFields: Exclude<StringField, "addressLine2">[] = [
  "firstName",
  "lastName",
  "email",
  "phoneNumber",
  "dateOfBirth",
  "ssn",
  "addressLine1",
  "city",
  "state",
  "zipCode",
  "programName",
  "amountRequested",
];

const submitFieldOrder: Array<keyof FormValues> = [
  "firstName",
  "lastName",
  "email",
  "phoneNumber",
  "dateOfBirth",
  "ssn",
  "addressLine1",
  "city",
  "state",
  "zipCode",
  "programName",
  "amountRequested",
  "agreementAccepted",
];

export function ApplicationForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionState, formAction, isPending] = useActionState(
    submitApplication,
    null,
  );

  useEffect(() => {
    if (!submissionState?.success) {
      return;
    }

    setValues(initialValues);
    setErrors({});
  }, [submissionState?.success]);

  function handleFieldChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;
    const fieldName = name as StringField;

    if (!stringFields.includes(fieldName)) {
      return;
    }

    let nextValue = value;

    if (fieldName === "phoneNumber") {
      nextValue = value.replace(/[^\d()\-\s]/g, "");
    }

    if (fieldName === "ssn") {
      nextValue = formatSsnInput(value, values.ssn);
    }

    setValues((current) => ({
      ...current,
      [fieldName]: nextValue,
    }));

    setErrors((current) => ({
      ...current,
      [fieldName]: validateStringField(fieldName, nextValue),
    }));
  }

  function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, checked } = event.target;
    const fieldName = name as BooleanField;

    setValues((current) => ({
      ...current,
      [fieldName]: checked,
    }));

    setErrors((current) => ({
      ...current,
      [fieldName]: validateBooleanField(fieldName, checked),
    }));
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    const nextErrors: FormErrors = {};

    for (const field of requiredSubmitStringFields) {
      nextErrors[field] = validateStringField(field, values[field]);
    }

    nextErrors.agreementAccepted = validateBooleanField(
      "agreementAccepted",
      values.agreementAccepted,
    );

    setErrors(nextErrors);

    const firstInvalidField = submitFieldOrder.find(
      (field) => nextErrors[field],
    );

    if (firstInvalidField) {
      event.preventDefault();

      requestAnimationFrame(() => {
        const fieldElement = document.getElementById(firstInvalidField);
        fieldElement?.focus();
      });

      return;
    }
  }

  return (
    <form
      autoComplete="on"
      action={formAction}
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <ApplicantInformationSection
        values={values}
        errors={errors}
        onFieldChange={handleFieldChange}
      />

      <div className="my-8 border-t border-slate-200" />

      <ProgramInformationSection
        values={values}
        errors={errors}
        onFieldChange={handleFieldChange}
        onCheckboxChange={handleCheckboxChange}
      />

      {submissionState?.error ? (
        <p className="mt-4 text-sm text-red-600">{submissionState.error}</p>
      ) : null}

      {submissionState?.success ? (
        <div className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-800">
          <p>Application submitted successfully.</p>
          <p>Application ID: {submissionState.applicationId}</p>
          <p>Review tier: {submissionState.reviewTier}</p>
        </div>
      ) : null}

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Submitting..." : "Submit application"}
        </button>
      </div>
    </form>
  );
}
