import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useStepper } from "@/components/ui/stepper";
import { useState } from "react";
import { BikeRegistrationFormData } from "../model/schema";
import { useFormContext } from "react-hook-form";

const RegisterSerielNumber = () => {
  const { setStepCompleted, nextStep } = useStepper();

  const { control, watch, setError } =
    useFormContext<BikeRegistrationFormData>();

  const serialNumber = watch("serialNumber");

  const submithandler = async () => {
    try {
      if (!serialNumber) {
        throw new Error("Serial number is required");
      }
      const res = await fetch("/api/bikes", {
        method: "POST",
        body: JSON.stringify({ serialNumber }),
      });
      const data = await res.json();

      if (res.ok) {
        setStepCompleted(0, true);
        nextStep();
      } else {
        setError("serialNumber", {
          message: data.error,
        });
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Register your bike to extend your warranty by 2 years, in addition to
        the 3-year standard coverage when compliant with our warranty policy.
        Please visit our warranty policy page for more details.
      </p>

      <FormField
        control={control}
        name="serialNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-bold text-base">
              Enter your bike Serial Number
            </FormLabel>
            <FormControl>
              <Input placeholder="STM34D30L24110132N" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button disabled={!serialNumber} type="button" onClick={submithandler}>
        FIND MY BIKE
      </Button>

      <p className="text-sm text-gray-600">
        Where do I find my serial number on an E-Bike or a Bike?
      </p>
    </div>
  );
};

export default RegisterSerielNumber;
