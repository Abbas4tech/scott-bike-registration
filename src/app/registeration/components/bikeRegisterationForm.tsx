import React, { useState } from "react";
import { BanIcon, CircleCheckBigIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { Form } from "@/components/ui/form";
import {
  StepperIndicators,
  Step,
  StepTitle,
  StepContent,
  useStepper,
} from "@/components/ui/stepper";
import { cn } from "@/lib/utils";

import BikeInformation from "./bikeInformation";
import PersonalInformation from "./personalInformation";
import RegisterSerielNumber from "./registerSerialNumber";
import {
  BikeRegistrationFormData,
  bikeRegistrationSchema,
  bikeRegisterationInitialData,
} from "../model/schema";
import { useRegisterBikeMutation } from "../services/bikeRegisterationApi";

const BikeRegisterationForm = (): React.JSX.Element => {
  const [confirmation, setConfirmation] = useState<{
    success: boolean;
    message: string;
  }>({
    success: false,
    message: "",
  });

  const form = useForm<BikeRegistrationFormData>({
    resolver: zodResolver(bikeRegistrationSchema),
    defaultValues: bikeRegisterationInitialData,
    mode: "onChange",
  });

  const { setStepCompleted, nextStep } = useStepper();

  const [registerBike] = useRegisterBikeMutation();

  const submitHandler: SubmitHandler<BikeRegistrationFormData> = async (d) => {
    try {
      const isValidData = bikeRegistrationSchema.safeParse(d).success;
      if (!isValidData) {
        return;
      }

      const res = await registerBike(d).unwrap();
      setConfirmation({ success: res.success, message: res.message });
    } catch (error) {
      console.error(error);
      const { message } = (error as FetchBaseQueryError).data as {
        message: string;
      };
      setConfirmation({
        success: false,
        message,
      });
    } finally {
      setStepCompleted(2, true);
      nextStep();
    }
  };

  const stepLabels = [
    "Serial number",
    "Bike information",
    "Personal information",
    "Registration confirmation",
  ];
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)}>
        <StepperIndicators labels={stepLabels} />

        <Step index={0}>
          <StepTitle
            className="text-2xl text-neutral-500 md:text-3xl font-brandon font-extrabold tracking-wider"
            stepNumber={0}
          >
            SERIAL NUMBER
          </StepTitle>
          <StepContent>
            <RegisterSerielNumber />
          </StepContent>
        </Step>

        <Step index={1}>
          <StepTitle
            className="text-2xl text-neutral-500 md:text-3xl font-bold font-brandon tracking-wider"
            stepNumber={1}
          >
            BIKE INFORMATION
          </StepTitle>
          <StepContent>
            <BikeInformation />
          </StepContent>
        </Step>

        <Step index={2}>
          <StepTitle
            className="text-2xl text-neutral-500 md:text-3xl font-bold tracking-wider"
            stepNumber={2}
          >
            PERSONAL INFORMATION
          </StepTitle>
          <StepContent>
            <PersonalInformation />
          </StepContent>
        </Step>

        <Step index={3}>
          <StepTitle
            className="text-2xl text-neutral-500 md:text-3xl font-bold tracking-wider"
            stepNumber={3}
          >
            REGISTRATION CONFIRMATION
          </StepTitle>
          <StepContent>
            <div className="text-center py-10">
              <div
                className={cn(
                  "w-24 h-24  rounded-full flex items-center justify-center mx-auto mb-4",
                  confirmation.success ? "bg-green-100" : "bg-red-100"
                )}
              >
                {confirmation.success ? (
                  <CircleCheckBigIcon size={50} className="text-green-600" />
                ) : (
                  <BanIcon size={50} className="text-red-600" />
                )}
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {confirmation.success
                  ? " Registration Complete!"
                  : " Registration Failed!"}
              </h2>
              <p className="text-gray-600">{confirmation.message}</p>
            </div>
          </StepContent>
        </Step>

        {/* <StepperNavigation /> */}
      </form>
    </Form>
  );
};

export default BikeRegisterationForm;
