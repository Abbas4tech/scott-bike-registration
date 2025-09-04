"use client";
import { useFormContext } from "react-hook-form";
import { JSX } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

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

import {
  BikeRegistrationFormData,
  bikeRegisterationInitialData,
} from "../model/schema";
import { useVerifySerialNumberMutation } from "../services/serialNumberApi";

const RegisterSerielNumber = (): JSX.Element => {
  const { setStepCompleted, nextStep } = useStepper();

  const { control, watch, setError, reset } =
    useFormContext<BikeRegistrationFormData>();

  const sn = watch("serialNumber");

  const [verifySerialNumber, { isLoading }] = useVerifySerialNumberMutation();
  const isDisabled = !sn || isLoading;

  const submithandler = async (): Promise<void> => {
    try {
      const res = await verifySerialNumber({ serialNumber: sn }).unwrap();
      reset({ ...bikeRegisterationInitialData, ...res.data });

      setStepCompleted(0, true);
      nextStep();
    } catch (err) {
      console.error(err);
      const { error } = (err as FetchBaseQueryError).data as {
        error: string;
      };
      setError("serialNumber", { message: error });
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

      <Button disabled={isDisabled} type="button" onClick={submithandler}>
        {isLoading ? "FINDING...." : "FIND MY BIKE"}
      </Button>

      <p className="text-sm text-gray-600">
        Where do I find my serial number on an E-Bike or a Bike?
      </p>
    </div>
  );
};

export default RegisterSerielNumber;
