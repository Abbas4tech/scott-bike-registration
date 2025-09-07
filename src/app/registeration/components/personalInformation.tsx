import React, { memo } from "react";
import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import DatePicker from "@/components/ui/date-picker";

import { BikeRegistrationFormData } from "../model/schema";
import { COUNTRIES, LANGUAGES, GENDERS } from "../model/constants";

const TextField = memo(
  ({
    name,
    label,
    type = "text",
    placeholder,
  }: {
    name: keyof BikeRegistrationFormData;
    label: string;
    type?: string;
    placeholder: string;
  }) => (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} <span className="text-red-500">*</span>
          </FormLabel>
          <FormControl>
            <Input placeholder={placeholder} type={type} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
);

TextField.displayName = "TextField";

const SelectField = memo(
  ({
    name,
    label,
    options,
    placeholder,
  }: {
    name: keyof BikeRegistrationFormData;
    label: string;
    options: typeof COUNTRIES;
    placeholder: string;
  }) => (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} <span className="text-red-500">*</span>
          </FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="w-full font-sans" size="default">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="w-full">
              {options.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
);

SelectField.displayName = "SelectField";

const RadioGroupField = memo(
  ({
    name,
    label,
    options,
  }: {
    name: keyof BikeRegistrationFormData;
    label: string;
    options: typeof LANGUAGES;
  }) => (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>
            {label} <span className="text-red-500">*</span>
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="flex flex-col space-y-1"
            >
              {options.map(({ value, label }) => (
                <FormItem
                  key={value}
                  className="flex items-center space-x-3 space-y-0 gap-0"
                >
                  <FormControl>
                    <RadioGroupItem value={value} />
                  </FormControl>
                  <FormLabel className="font-normal">{label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
);

RadioGroupField.displayName = "RadioGroupField";

const CheckboxField = memo(
  ({
    name,
    label,
    link,
    linkText,
  }: {
    name: keyof BikeRegistrationFormData;
    label: string;
    link?: string;
    linkText?: string;
  }) => (
    <FormField
      name={name}
      render={({ field }) => (
        <div className="flex flex-col gap-1">
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 gap-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="gap-1 font-normal">
                {label}
                {link && (
                  <a href={link} className="text-blue-600 underline">
                    {linkText}
                  </a>
                )}
                {name === "consent" && <span className="text-red-500">*</span>}
              </FormLabel>
            </div>
          </FormItem>
          <FormMessage />
        </div>
      )}
    />
  )
);

CheckboxField.displayName = "CheckboxField";

/**
 * Step 3 of registration form - Collects user's personal information
 * Includes validation and required field markers
 */
const PersonalInformation = (): React.JSX.Element => {
  const { control } = useFormContext<BikeRegistrationFormData>();
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <TextField
          name="firstName"
          label="First Name"
          placeholder="First Name"
        />

        <TextField name="lastName" label="Last Name" placeholder="Last Name" />

        <TextField
          name="email"
          label="Email"
          type="email"
          placeholder="Email"
        />

        <SelectField
          name="country"
          label="Country"
          options={COUNTRIES}
          placeholder="Select your Country"
        />
      </div>

      <RadioGroupField
        name="preferredLanguage"
        label="Preferred Language"
        options={LANGUAGES}
      />

      <RadioGroupField name="gender" label="Gender" options={GENDERS} />

      <FormField
        control={control}
        name="dateOfBirth"
        render={({ field }) => <DatePicker field={field} />}
      />

      <CheckboxField
        name="newsOptIn"
        label="I agree to receive News and Updates from SCOTT Sports."
      />

      <CheckboxField
        name="consent"
        label="I have read and accept the"
        link="#"
        linkText="privacy policy."
      />
    </div>
  );
};

export default memo(PersonalInformation);
