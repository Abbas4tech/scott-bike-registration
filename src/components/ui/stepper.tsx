"use client";
import { cn } from "@/lib/utils";
import React, {
  createContext,
  useContext,
  useState,
  HTMLAttributes,
  forwardRef,
  PropsWithChildren,
  isValidElement,
  Children,
  FC,
} from "react";

// Stepper Context
interface StepperContextType {
  activeStep: number;
  steps: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  isStepCompleted: (step: number) => boolean;
  setStepCompleted: (step: number, completed: boolean) => void;
  isLastStep: boolean;
  isFirstStep: boolean;
}

const StepperContext = createContext<StepperContextType | undefined>(undefined);

const useStepper = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("useStepper must be used within a StepperProvider");
  }
  return context;
};

// Stepper Provider
type StepperProviderProps = {
  defaultStep?: number;
};

const StepperProvider: FC<PropsWithChildren<StepperProviderProps>> = ({
  children,
  defaultStep = 0,
}) => {
  const [activeStep, setActiveStep] = useState(defaultStep);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>(
    {}
  );

  // Count the number of steps by checking children
  const steps = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === Step
  ).length;

  const isLastStep = activeStep === steps - 1;
  const isFirstStep = activeStep === 0;

  const nextStep = () => {
    if (!isLastStep) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (!isFirstStep) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    // Only allow navigation to completed steps or the next available step
    const canNavigate =
      step === 0 || completedSteps[step - 1] || step < activeStep;
    if (canNavigate && step >= 0 && step < steps) {
      setActiveStep(step);
    }
  };

  const isStepCompleted = (step: number) => {
    return !!completedSteps[step];
  };

  const setStepCompleted = (step: number, completed: boolean) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [step]: completed,
    }));
  };

  return (
    <StepperContext.Provider
      value={{
        activeStep,
        steps,
        nextStep,
        prevStep,
        goToStep,
        isStepCompleted,
        setStepCompleted,
        isLastStep,
        isFirstStep,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};

// Step Component
interface StepProps {
  index?: number;
}

const Step: FC<PropsWithChildren<StepProps>> = ({ children, index = 0 }) => {
  const { activeStep } = useStepper();

  if (activeStep !== index) {
    return null;
  }

  return <div className="step">{children}</div>;
};

// StepTitle Component
type StepTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  stepNumber?: number;
};
const StepTitle: FC<StepTitleProps> = forwardRef<
  HTMLHeadingElement,
  StepTitleProps
>(({ children, stepNumber, className, ...res }, ref) => {
  return (
    <h2 ref={ref} {...res} className={cn("text-xl font-semibold", className)}>
      {stepNumber !== undefined && (
        <span className="step-number">STEP {stepNumber + 1}: </span>
      )}
      <span>{children}</span>
    </h2>
  );
});

const StepContent: FC<PropsWithChildren> = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...res }, ref) => {
  return (
    <div
      ref={ref}
      {...res}
      className={cn("step-content-inner mt-4", className)}
    />
  );
});

// Stepper Navigation Component
const StepperNavigation: FC = () => {
  const {
    nextStep,
    prevStep,
    isLastStep,
    isFirstStep,
    activeStep,
    isStepCompleted,
  } = useStepper();

  return (
    <div className="stepper-navigation flex justify-between mt-8">
      <button
        onClick={prevStep}
        disabled={isFirstStep}
        className="px-4 py-2 bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <button
        onClick={nextStep}
        disabled={!isStepCompleted(activeStep)}
        className="px-4 py-2 bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLastStep ? "Complete Registration" : "Next"}
      </button>
    </div>
  );
};

// Stepper Indicators Component
const StepperIndicators: FC = () => {
  const { steps, activeStep, goToStep, isStepCompleted } = useStepper();

  return (
    <div className="stepper-indicators flex justify-between mb-8 relative">
      {/* Connector line */}
      <div className="absolute top-4 left-0 right-0 h-0.5 bg-blue-200 z-10"></div>

      {Array.from({ length: steps }).map((_, index) => {
        const completed = isStepCompleted(index);
        const active = index === activeStep;
        const accessible = index === 0 || isStepCompleted(index - 1);

        return (
          <div key={index} className="flex flex-col items-center relative z-10">
            <button
              type="button"
              onClick={() => accessible && goToStep(index)}
              disabled={!accessible}
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                active
                  ? "border-blue-600 bg-blue-600 text-white"
                  : completed
                  ? "border-green-500 bg-green-500 text-white"
                  : accessible
                  ? "border-gray-300 bg-white text-gray-500"
                  : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {completed ? "✓" : index + 1}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export {
  Step,
  StepContent,
  type StepProps,
  type StepperContextType,
  StepperIndicators,
  StepperNavigation,
  StepperProvider,
  StepTitle,
  type StepperProviderProps,
  useStepper,
};
