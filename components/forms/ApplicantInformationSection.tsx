import { ChangeEvent } from "react";
import { US_STATES } from "@/lib/usStates";
import { FormErrors, FormValues } from "@/lib/applicationFormValidation";
import { FormField } from "@/components/forms/FormField";
import { TextInput } from "@/components/forms/TextInput";
import { FieldError } from "@/components/forms/FieldError";
import { SelectInput } from "@/components/forms/SelectInput";

type ApplicantInformationSectionProps = {
  values: FormValues;
  errors: FormErrors;
  onFieldChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
};

export function ApplicantInformationSection({
  values,
  errors,
  onFieldChange,
}: ApplicantInformationSectionProps) {
  return (
    <fieldset className="space-y-4">
      <legend className="mb-4 text-lg font-semibold text-slate-900">
        Applicant Information
      </legend>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField htmlFor="firstName" label="First name">
          <>
            <TextInput
              id="firstName"
              name="firstName"
              type="text"
              required
              autoComplete="given-name"
              value={values.firstName}
              onChange={onFieldChange}
            />
            <FieldError message={errors.firstName} />
          </>
        </FormField>

        <FormField htmlFor="lastName" label="Last name">
          <>
            <TextInput
              id="lastName"
              name="lastName"
              type="text"
              required
              autoComplete="family-name"
              value={values.lastName}
              onChange={onFieldChange}
            />
            <FieldError message={errors.lastName} />
          </>
        </FormField>

        <FormField htmlFor="email" label="Email">
          <>
            <TextInput
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={values.email}
              onChange={onFieldChange}
            />
            <FieldError message={errors.email} />
          </>
        </FormField>

        <FormField htmlFor="phoneNumber" label="Phone number">
          <>
            <TextInput
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              required
              autoComplete="tel"
              inputMode="tel"
              placeholder="555-123-4567"
              value={values.phoneNumber}
              onChange={onFieldChange}
            />
            <FieldError message={errors.phoneNumber} />
          </>
        </FormField>

        <FormField htmlFor="dateOfBirth" label="Date of birth">
          <>
            <TextInput
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              required
              autoComplete="bday"
              value={values.dateOfBirth}
              onChange={onFieldChange}
            />
            <FieldError message={errors.dateOfBirth} />
          </>
        </FormField>

        <FormField htmlFor="ssn" label="Social Security Number">
          <>
            <TextInput
              id="ssn"
              name="ssn"
              type="text"
              required
              inputMode="numeric"
              autoComplete="off"
              placeholder="123-45-6789"
              pattern="\d{3}-\d{2}-\d{4}"
              maxLength={11}
              title="SSN must be in the format 123-45-6789"
              value={values.ssn}
              onChange={onFieldChange}
            />
            <FieldError message={errors.ssn} />
          </>
        </FormField>
      </div>

      <div className="grid gap-4">
        <FormField htmlFor="addressLine1" label="Address line 1">
          <>
            <TextInput
              id="addressLine1"
              name="addressLine1"
              type="text"
              required
              autoComplete="address-line1"
              value={values.addressLine1}
              onChange={onFieldChange}
            />
            <FieldError message={errors.addressLine1} />
          </>
        </FormField>

        <FormField htmlFor="addressLine2" label="Address line 2">
          <TextInput
            id="addressLine2"
            name="addressLine2"
            type="text"
            autoComplete="address-line2"
            value={values.addressLine2}
            onChange={onFieldChange}
          />
        </FormField>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <FormField htmlFor="city" label="City">
          <>
            <TextInput
              id="city"
              name="city"
              type="text"
              required
              autoComplete="address-level2"
              value={values.city}
              onChange={onFieldChange}
            />
            <FieldError message={errors.city} />
          </>
        </FormField>

        <FormField htmlFor="state" label="State">
          <>
            <SelectInput
              id="state"
              name="state"
              required
              autoComplete="address-level1"
              value={values.state}
              onChange={onFieldChange}
            >
              <option value="">Select a state</option>
              {US_STATES.map((state) => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
            </SelectInput>
            <FieldError message={errors.state} />
          </>
        </FormField>
        <FormField htmlFor="zipCode" label="ZIP code">
          <>
            <TextInput
              id="zipCode"
              name="zipCode"
              type="text"
              required
              autoComplete="postal-code"
              inputMode="numeric"
              placeholder="33701"
              pattern="\d{5}"
              maxLength={5}
              title="ZIP code must be 5 digits"
              value={values.zipCode}
              onChange={onFieldChange}
            />
            <FieldError message={errors.zipCode} />
          </>
        </FormField>
      </div>
    </fieldset>
  );
}
