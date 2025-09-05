import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import React, { useMemo, memo } from "react";
import { useFormContext } from "react-hook-form";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useStepper } from "@/components/ui/stepper";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { BikeRegistrationFormData } from "../model/schema";

const COUNTRIES = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "it", label: "Italy" },
  { value: "es", label: "Spain" },
];

const LANGUAGES = [
  { value: "english", label: "English" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "italian", label: "Italian" },
  { value: "spanish", label: "Spanish" },
];

const GENDERS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

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

const DatePickerField = memo(() => (
  <FormField
    name="dateOfBirth"
    render={({ field }) => (
      <FormItem className="flex flex-col">
        <FormLabel className="mb-2">Birthday</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                size={"xl"}
                variant="outline"
                className={cn(
                  "pl-3 text-left font-normal capitalize justify-start",
                  !field.value && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="h-4 w-4 opacity-50" />
                {field.value ? format(field.value, "PPP") : "Pick a date"}
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
              captionLayout="dropdown"
            />
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    )}
  />
));

DatePickerField.displayName = "DatePickerField";

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

const PersonalInformation = (): React.JSX.Element => {
  const { prevStep } = useStepper();
  const form = useFormContext<BikeRegistrationFormData>();

  const NavigationButtons = useMemo(
    () => (
      <div className="mt-4 flex justify-end">
        <Button
          size="lg"
          variant="link"
          type="button"
          onClick={prevStep}
          className="text-blue-600 text-sm uppercase"
        >
          Previous
        </Button>
        <Button
          size="lg"
          type="submit"
          disabled={!form.formState.isValid}
          variant="default"
        >
          Submit
        </Button>
      </div>
    ),
    [prevStep, form.formState.isValid]
  );

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

      <DatePickerField />

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

      {NavigationButtons}
    </div>
  );
};

export default memo(PersonalInformation);
