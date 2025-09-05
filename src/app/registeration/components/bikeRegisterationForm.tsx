"use client";
import React, { useCallback, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";

import { Form } from "@/components/ui/form";
import {
  Step,
  StepContent,
  StepperIndicators,
  StepTitle,
  useStepper,
} from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";

import {
  bikeRegisterationInitialData,
  BikeRegistrationFormData,
  bikeRegistrationSchema,
} from "../model/schema";
import { useRegisterBikeMutation } from "../services/bikeRegisterationApi";
import RegisterSerialNumber from "./registerSerialNumber";
import BikeInformation from "./bikeInformation";
import PersonalInformation from "./personalInformation";
import RegisterationConfirmation from "./registerationConfirmation";
import BikeInfoCard from "./bikeInfoCard";

/**
 * Main bike registration form component
 * Manages multi-step form process and submission
 */
const BikeRegistrationForm = (): React.JSX.Element => {
  const [confirmation, setConfirmation] = useState({
    success: false,
    message: "",
  });

  // Initialize form with validation schema and default values
  const form = useForm<BikeRegistrationFormData>({
    resolver: zodResolver(bikeRegistrationSchema),
    defaultValues: bikeRegisterationInitialData,
    mode: "onChange",
  });

  const { setStepCompleted, nextStep, prevStep } = useStepper();
  const [registerBike, { isLoading }] = useRegisterBikeMutation();

  // Form submission handler
  const submitHandler = useCallback<SubmitHandler<BikeRegistrationFormData>>(
    async (data) => {
      try {
        const isValidData = bikeRegistrationSchema.safeParse(data).success;
        if (!isValidData) {
          return;
        }

        const res = await registerBike(data).unwrap();
        setConfirmation({ success: res.success, message: res.message });
      } catch (error) {
        console.error(error);
        const { message } = (error as FetchBaseQueryError).data as {
          message: string;
        };
        setConfirmation({ success: false, message });
      } finally {
        setStepCompleted(2, true);
        nextStep();
      }
    },
    [registerBike, setStepCompleted, nextStep]
  );

  // Navigation buttons for personal information step
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
          disabled={!form.formState.isValid || isLoading}
          variant="default"
          className="tracking-wider min-w-40"
        >
          {isLoading ? (
            <LoaderCircle size={40} className="animate-spin size-6 font-bold" />
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    ),
    [prevStep, form.formState.isValid, isLoading]
  );

  // Step labels for stepper indicator
  const Labels = useMemo(
    () => [
      "Serial number",
      "Bike information",
      "Personal information",
      "Registration confirmation",
    ],
    []
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)}>
        <StepperIndicators labels={Labels} />

        {Labels.map((title, index) => (
          <Step key={index} index={index}>
            {index === 2 && <BikeInfoCard imageSize={150} />}
            <StepTitle
              className="text-2xl text-neutral-500 md:text-3xl font-brandon uppercase font-extrabold tracking-wider"
              stepNumber={index}
            >
              {title}
            </StepTitle>
            <StepContent>
              {index === 0 && <RegisterSerialNumber />}
              {index === 1 && <BikeInformation />}
              {index === 2 && (
                <>
                  <PersonalInformation />
                  {NavigationButtons}
                </>
              )}
              {index === 3 && (
                <RegisterationConfirmation
                  message={confirmation.message}
                  success={confirmation.success}
                />
              )}
            </StepContent>
          </Step>
        ))}
      </form>
    </Form>
  );
};

export default BikeRegistrationForm;
