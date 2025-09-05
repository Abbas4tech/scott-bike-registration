import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";

import { Form } from "@/components/ui/form";
import {
  StepperIndicators,
  Step,
  StepTitle,
  StepContent,
  useStepper,
} from "@/components/ui/stepper";

import BikeInformation from "./bikeInformation";
import PersonalInformation from "./personalInformation";
import RegisterSerielNumber from "./registerSerialNumber";
import {
  BikeRegistrationFormData,
  bikeRegistrationSchema,
  bikeRegisterationInitialData,
} from "../model/schema";
import { useRegisterBikeMutation } from "../services/bikeRegisterationApi";
import RegisterationConfirmation from "./registerationConfirmation";

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
            className="text-2xl text-neutral-500 md:text-3xl font-extrabold font-brandon tracking-wider"
            stepNumber={1}
          >
            BIKE INFORMATION
          </StepTitle>
          <StepContent>
            <BikeInformation />
          </StepContent>
        </Step>

        <Step index={2}>
          <div className="flex my-4 gap-4 items-center">
            <Image
              width={150}
              height={150}
              src={`/assets/${form.getValues("serialNumber")}.jpg`}
              className="border border-neutral-300"
              alt="Bike"
            />
            <p className="font-bold text-lg">
              {form.getValues("modelDescription")}
            </p>
          </div>
          <StepTitle
            className="text-2xl font-brandon text-neutral-500 md:text-3xl font-extrabold tracking-wider"
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
            className="text-2xl font-brandon text-neutral-500 md:text-3xl font-extrabold tracking-wider"
            stepNumber={3}
          >
            REGISTRATION CONFIRMATION
          </StepTitle>
          <StepContent>
            <RegisterationConfirmation
              message={confirmation.message}
              success={confirmation.success}
            />
          </StepContent>
        </Step>
      </form>
    </Form>
  );
};

export default BikeRegisterationForm;
