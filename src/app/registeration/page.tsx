import { JSX } from "react";
import { Metadata } from "next";

import { StepperProvider } from "@/components/ui/stepper";

import BikeRegisterationForm from "./components/bikeRegisterationForm";

export const metadata: Metadata = {
  title: "Bike Registration | SCOTT Sports",
  description:
    "Register your Scott bike to extend your warranty by 2 years. Complete the simple registration process to get additional coverage on your bike.",
  keywords:
    "bike registration, Scott bike, warranty extension, bicycle registration, bike warranty",
  authors: [{ name: "Scott Sports" }],
  openGraph: {
    title: "Bike Registration | SCOTT Sports",
    description: "Register your Scott bike to extend your warranty by 2 years.",
    type: "website",
    locale: "en_US",
    siteName: "Scott Sports",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bike Registration | SCOTT Sports",
    description: "Register your Scott bike to extend your warranty by 2 years.",
  },
  robots: "index, follow",
};

const BikeRegistrationPage = (): JSX.Element => (
  <div className="mx-auto p-4 bg-white rounded-lg">
    <h1 className="text-3xl font-brandon md:text-5xl text-neutral-600 tracking-wider font-extrabold mb-12 text-center">
      BIKE REGISTRATION
    </h1>

    <StepperProvider isIndicatorButtonsAccessible={false} defaultStep={0}>
      <BikeRegisterationForm />
    </StepperProvider>
  </div>
);

export default BikeRegistrationPage;
