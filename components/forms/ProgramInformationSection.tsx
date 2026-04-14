import { ChangeEvent } from "react";
import { FieldError } from "@/components/forms/FieldError";
import { FormField } from "@/components/forms/FormField";
import { TextInput } from "@/components/forms/TextInput";
import { FormErrors, FormValues } from "@/lib/applicationFormValidation";

type ProgramInformationSectionProps = {
  values: FormValues;
  errors: FormErrors;
  onFieldChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function ProgramInformationSection({
  values,
  errors,
  onFieldChange,
  onCheckboxChange,
}: ProgramInformationSectionProps) {
  return (
    <fieldset className="space-y-4">
      <legend className="mb-4 text-lg font-semibold text-slate-900">
        Program Information
      </legend>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField htmlFor="programName" label="Program name">
          <>
            <TextInput
              id="programName"
              name="programName"
              type="text"
              required
              value={values.programName}
              onChange={onFieldChange}
            />
            <FieldError message={errors.programName} />
          </>
        </FormField>

        <FormField htmlFor="amountRequested" label="Amount requested">
          <>
            <TextInput
              id="amountRequested"
              name="amountRequested"
              type="number"
              required
              min="0.01"
              step="0.01"
              inputMode="decimal"
              value={values.amountRequested}
              onChange={onFieldChange}
            />
            <FieldError message={errors.amountRequested} />
          </>
        </FormField>
      </div>

      <div className="rounded-lg bg-slate-50 px-4 py-3">
        <label
          htmlFor="agreementAccepted"
          className="flex items-start gap-3 text-sm text-slate-700"
        >
          <input
            id="agreementAccepted"
            name="agreementAccepted"
            type="checkbox"
            required
            checked={values.agreementAccepted}
            onChange={onCheckboxChange}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-300"
          />
          <span>I agree to the terms.</span>
        </label>

        <div className="mt-2">
          <FieldError message={errors.agreementAccepted} />
        </div>
      </div>
    </fieldset>
  );
}
