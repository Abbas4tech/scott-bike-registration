"use client";
import {
  StepperProvider,
  StepperIndicators,
  Step,
  StepTitle,
  StepContent,
} from "@/components/ui/stepper";
import RegisterSerielNumber from "./components/registerSerialNumber";
import BikeInformation from "./components/bikeInformation";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  BikeRegistrationFormData,
  bikeRegistrationSchema,
} from "./model/schema";
import { zodResolver } from "@hookform/resolvers/zod";

const BikeRegistrationStepper = () => {
  const form = useForm<BikeRegistrationFormData>({
    resolver: zodResolver(bikeRegistrationSchema),
    defaultValues: { firstName: "" },
    mode: "onChange",
  });

  return (
    <div className="w-xl mx-auto p-6 bg-white rounded-lg">
      <h1 className="text-4xl text-gray-500 font-bold mb-6 text-center">
        BIKE REGISTRATION
      </h1>

      <Form {...form}>
        <StepperProvider defaultStep={0}>
          <StepperIndicators />

          <Step index={0}>
            <StepTitle stepNumber={0}>SERIAL NUMBER</StepTitle>
            <StepContent>
              <RegisterSerielNumber />
            </StepContent>
          </Step>

          <Step index={1}>
            <StepTitle stepNumber={1}>BIKE INFORMATION</StepTitle>
            <StepContent>
              <BikeInformation />
            </StepContent>
          </Step>

          <Step index={2}>
            <StepTitle stepNumber={2}>PERSONAL INFORMATION</StepTitle>
            <StepContent></StepContent>
          </Step>

          <Step index={3}>
            <StepTitle stepNumber={3}>REGISTRATION CONFIRMATION</StepTitle>
            <StepContent>
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-2xl">✓</span>
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
        </StepperProvider>
      </Form>
    </div>
  );
};

export default BikeRegistrationStepper;
