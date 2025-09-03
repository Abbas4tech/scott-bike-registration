import { ProfileForm } from "@/components/formExample";
import { StepperProvider } from "@/components/stepper/coresteps";
import BikeRegistrationStepper from "@/components/stepper/stepper";
import React from "react";

const Registration = () => {
  return (
    <div>
      <ProfileForm />
      <StepperProvider defaultStep={0}>
        <BikeRegistrationStepper />
      </StepperProvider>
    </div>
  );
};

export default Registration;
