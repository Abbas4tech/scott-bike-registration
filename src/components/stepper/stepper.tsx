"use client";
import { useState } from "react";
import {
  StepperProvider,
  StepperIndicators,
  Step,
  StepContent,
  StepperNavigation,
  useStepper,
  StepTitle,
} from "./coresteps";

// Create a separate component for Step 0 that uses useStepper
const SerialNumberStep = ({
  formData,
  handleInputChange,
}: {
  formData: any;
  handleInputChange: any;
}) => {
  const { setStepCompleted, nextStep } = useStepper();

  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Register your bike to extend your warranty by 2 years, in addition to
        the 3-year standard coverage when compliant with our warranty policy.
        Please visit our warranty policy page for more details.
      </p>

      <div>
        <h3 className="font-medium mb-2">Enter your bike Serial Number</h3>
        <input
          type="text"
          name="serialNumber"
          value={formData.serialNumber}
          onChange={handleInputChange}
          placeholder="STM34D30L24110132N"
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>

      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
        onClick={() => {
          console.log(formData.serialNumber);
          if (formData.serialNumber) {
            setStepCompleted(0, true); // This should now work correctly
            nextStep();
          }
        }}
      >
        FIND MY BIKE
      </button>

      <p className="text-sm text-gray-600">
        Where do I find my serial number on an E-Bike or a Bike?
      </p>
    </div>
  );
};

// Example Usage Component
const BikeRegistrationStepper = () => {
  const [formData, setFormData] = useState({
    serialNumber: "",
    // ... other fields
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    language: "",
    gender: "",
    birthday: "",
    acceptNews: false,
    acceptPolicy: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div className="w-xl mx-auto p-6 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-6">BIKE REGISTRATION</h1>

      <StepperProvider defaultStep={0}>
        <StepperIndicators />

        <Step index={0}>
          <StepTitle stepNumber={0}>SERIAL NUMBER</StepTitle>
          <StepContent>
            <SerialNumberStep
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </StepContent>
        </Step>

        {/* Other steps remain the same */}
        {/* ... */}

        <Step index={1}>
          <StepTitle stepNumber={1}>BIKE INFORMATION</StepTitle>
          <StepContent>
            <div className="space-y-6">
              <div className="p-4 bg-green-50 rounded-md">
                <p className="text-green-700 flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  Serial Number found
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Serial Number</p>
                  <p className="font-medium">
                    {formData.serialNumber || "STM34D30L24110132N"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Model Description</p>
                  <p className="font-medium">
                    Bike Spark RC World Cup (EU) IGPG/L
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Shop Name</p>
                  <p className="font-medium">BM SPORTECH IB SL</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date of purchase</p>
                  <p className="font-medium">25/07/2025</p>
                </div>
              </div>

              <button className="text-blue-600 text-sm">
                THIS IS NOT MY BIKE
              </button>
            </div>
          </StepContent>
        </Step>

        <Step index={2}>
          <StepTitle stepNumber={2}>PERSONAL INFORMATION</StepTitle>
          <StepContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    First Name*
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Country*
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select your Country</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="ES">Spain</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-medium mb-3">Preferred Language*</h4>
                <div className="flex flex-wrap gap-4">
                  {["English", "French", "German", "Italian", "Spanish"].map(
                    (lang) => (
                      <label key={lang} className="flex items-center">
                        <input
                          type="radio"
                          name="language"
                          value={lang}
                          checked={formData.language === lang}
                          onChange={handleInputChange}
                          className="mr-2"
                          required
                        />
                        {lang}
                      </label>
                    )
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Gender</h4>
                <div className="flex gap-4">
                  {["Male", "Female", "Other"].map((gender) => (
                    <label key={gender} className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      {gender}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Birthday</h4>
                <input
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="acceptNews"
                    checked={formData.acceptNews}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  I agree to receive News and Updates from SCOTT Sports.
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="acceptPolicy"
                    checked={formData.acceptPolicy}
                    onChange={handleInputChange}
                    className="mr-2"
                    required
                  />
                  I have read and accept the privacy policy.*
                </label>
              </div>
            </div>
          </StepContent>
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
    </div>
  );
};

export default BikeRegistrationStepper;
