import { Form } from "@/components/ui/form";
import {
  StepperIndicators,
  Step,
  StepTitle,
  StepContent,
  useStepper,
} from "@/components/ui/stepper";
import React from "react";
import BikeInformation from "./bikeInformation";
import PersonalInformation from "./personalInformation";
import RegisterSerielNumber from "./registerSerialNumber";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  BikeRegistrationFormData,
  bikeRegistrationSchema,
  bikeRegisterationInitialData,
} from "../model/schema";
import { CircleCheckBigIcon } from "lucide-react";

const BikeRegisterationForm = () => {
  const form = useForm<BikeRegistrationFormData>({
    resolver: zodResolver(bikeRegistrationSchema),
    defaultValues: bikeRegisterationInitialData,
    mode: "onChange",
  });

  const { setStepCompleted, nextStep } = useStepper();

  const submitHandler: SubmitHandler<BikeRegistrationFormData> = (d) => {
    const isValidData = bikeRegistrationSchema.safeParse(d).success;
    console.log(d, isValidData);
    if (!isValidData) return;
    setStepCompleted(2, true);
    nextStep();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)}>
        <StepperIndicators />

        <Step index={0}>
          <StepTitle
            className="text-2xl md:text-3xl font-bold tracking-wider"
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
            className="text-2xl md:text-3xl font-bold tracking-wider"
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
            className="text-2xl md:text-3xl font-bold tracking-wider"
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
            className="text-2xl md:text-3xl font-bold tracking-wider"
            stepNumber={3}
          >
            REGISTRATION CONFIRMATION
          </StepTitle>
          <StepContent>
            <div className="text-center py-10">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CircleCheckBigIcon size={50} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Registration Complete!
              </h2>
              <p className="text-gray-600">
                Your bike has been successfully registered. You will receive a
                confirmation email shortly.
              </p>
            </div>
          </StepContent>
        </Step>

        {/* <StepperNavigation /> */}
      </form>
    </Form>
  );
};

export default BikeRegisterationForm;
