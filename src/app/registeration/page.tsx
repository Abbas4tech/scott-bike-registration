"use client";
import { JSX } from "react";

import { StepperProvider } from "@/components/ui/stepper";

import BikeRegisterationForm from "./components/bikeRegisterationForm";

const BikeRegistrationPage = (): JSX.Element => (
  <div className="w-lg mx-auto p-6 bg-white rounded-lg">
    <h1 className="text-4xl text-gray-500 font-bold mb-6 text-center">
      BIKE REGISTRATION
    </h1>

    <StepperProvider isStepsAccessible={false} defaultStep={0}>
      <BikeRegisterationForm />
    </StepperProvider>
  </div>
);

export default BikeRegistrationPage;
