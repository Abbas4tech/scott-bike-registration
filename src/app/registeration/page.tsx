"use client";
import { JSX } from "react";

import { StepperProvider } from "@/components/ui/stepper";

import BikeRegisterationForm from "./components/bikeRegisterationForm";

const BikeRegistrationPage = (): JSX.Element => (
  <div className="mx-auto p-6 bg-white rounded-lg">
    <h1 className="text-3xl font-brandon md:text-5xl text-neutral-600 tracking-wider font-extrabold mb-12 text-center">
      BIKE REGISTRATION
    </h1>

    <StepperProvider isStepsAccessible={false} defaultStep={0}>
      <BikeRegisterationForm />
    </StepperProvider>
  </div>
);

export default BikeRegistrationPage;
