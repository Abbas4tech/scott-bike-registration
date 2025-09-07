import React from "react";
import { useFormContext } from "react-hook-form";
import { CircleCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useStepper } from "@/components/ui/stepper";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import DatePicker from "@/components/ui/date-picker";

import { BikeRegistrationFormData } from "../model/schema";
import BikeInfoCard from "./bikeInfoCard";

/**
 * Step 2 of registration form - Displays bike information
 * Shows serial number, model details, and purchase date selection
 */
const BikeInformation = (): React.JSX.Element => {
  const { control, watch } = useFormContext<BikeRegistrationFormData>();
  const { prevStep, nextStep, setStepCompleted } = useStepper();
  const dop = watch("dateOfPurchase"); // Watch date of purchase for validation

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        {/* Serial Number Field (Read-only) */}
        <FormField
          control={control}
          name="serialNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel aria-disabled="true">Serial Number</FormLabel>
              <FormControl>
                <Input disabled placeholder="Enter first name!" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription className="text-green-500 text-xs items-center flex gap-1 font-bold">
                <CircleCheck size={14} />
                Serial Number found
              </FormDescription>
            </FormItem>
          )}
        />

        {/* Bike Image and Basic Info */}
        <BikeInfoCard imageSize={400} showDescription={false} />

        {/* Model and Shop Details (Read-only) */}
        <FormField
          control={control}
          name="modelDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel aria-disabled="true">Model Description</FormLabel>
              <FormControl>
                <Input disabled placeholder="Enter first name!" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="shopName"
          render={({ field }) => (
            <FormItem>
              <FormLabel aria-disabled="true">Shop Name</FormLabel>
              <FormControl>
                <Input disabled placeholder="Enter first name!" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date of Purchase Selection */}
        <FormField
          control={control}
          name="dateOfPurchase"
          render={({ field }) => <DatePicker field={field} />}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-4 mt-4">
        <Button
          variant={"link"}
          type="button"
          onClick={prevStep}
          className="text-blue-600 text-sm"
        >
          THIS IS NOT MY BIKE
        </Button>

        <Button
          disabled={!dop} // Disable if date not selected
          type="button"
          size={"lg"}
          onClick={() => {
            setStepCompleted(1, true);
            nextStep();
          }}
          variant={"default"}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default BikeInformation;
