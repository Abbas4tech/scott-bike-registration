"use client";
import React, {
  createContext,
  useContext,
  useState,
  HTMLAttributes,
  forwardRef,
  PropsWithChildren,
  useEffect,
  FC,
  useCallback,
} from "react";

import { cn } from "@/lib/utils";

interface StepperContextType {
  activeStep: number;
  steps: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (_step: number) => void;
  isStepCompleted: (_step: number) => boolean;
  setStepCompleted: (_step: number, _completed: boolean) => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  registerStep: (_index: number) => void;
  isStepsAccessible: boolean;
}

const StepperContext = createContext<StepperContextType | undefined>(undefined);

const useStepper = (): StepperContextType => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("useStepper must be used within a StepperProvider");
  }
  return context;
};

// Stepper Provider
type StepperProviderProps = {
  defaultStep?: number;
  /**
   * If true: completed steps (and going back) are accessible (default / original behavior).
   * If false: user can only move forward (prev is disabled and indicators only allow advancing to next step).
   */
  isStepsAccessible?: boolean;
};

const StepperProvider: FC<PropsWithChildren<StepperProviderProps>> = ({
  children,
  defaultStep = 0,
  isStepsAccessible = true,
}) => {
  const [activeStep, setActiveStep] = useState(defaultStep);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>(
    {}
  );
  const [stepIndexes, setStepIndexes] = useState<number[]>([]);

  const steps = stepIndexes.length;

  const isLastStep = activeStep === steps - 1;
  const isFirstStep = activeStep === 0;

  // Use useCallback to memoize the registerStep function
  const registerStep = useCallback((index: number) => {
    setStepIndexes((prev) => {
      if (!prev.includes(index)) {
        return [...prev, index].sort((a, b) => a - b);
      }
      return prev;
    });
  }, []);

  const nextStep = (): void => {
    if (!isLastStep) {
      setActiveStep((prev) => Math.min(prev + 1, Math.max(0, steps - 1)));
    }
  };

  const prevStep = (): void => {
    // If steps are not accessible (forward-only mode), prev should be a no-op.
    if (!isStepsAccessible) {
      return;
    }
    if (!isFirstStep) {
      setActiveStep((prev) => Math.max(prev - 1, 0));
    }
  };

  const goToStep = (step: number): void => {
    if (step < 0 || step >= steps) {
      return;
    }

    if (isStepsAccessible) {
      // original behavior: allow navigation to completed steps, first step or going back
      const canNavigate =
        step === 0 || completedSteps[step - 1] || step < activeStep;
      if (canNavigate) {
        setActiveStep(step);
      }
    } else {
      // forward-only mode: only allow moving to the immediate next step (or stay on current)
      if (step === activeStep + 1) {
        setActiveStep(step);
      }
    }
  };

  const isStepCompleted = (step: number): boolean => !!completedSteps[step];

  const setStepCompleted = (step: number, completed: boolean): void => {
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
        registerStep,
        isStepsAccessible,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};

// Step Component
interface StepProps {
  index: number;
}

const Step: FC<PropsWithChildren<StepProps>> = ({ children, index }) => {
  const { activeStep, registerStep } = useStepper();

  // Register step only once on mount
  useEffect(() => {
    registerStep(index);
  }, [index, registerStep]);

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
>(({ children, stepNumber, className, ...res }, ref) => (
  <h2 ref={ref} {...res} className={cn("text-xl font-semibold", className)}>
    {stepNumber !== undefined && (
      <span className="step-number">STEP {stepNumber + 1}: </span>
    )}
    <span>{children}</span>
  </h2>
));

StepTitle.displayName = "StepTitle";

const StepContent: FC<PropsWithChildren> = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...res }, ref) => (
  <div
    ref={ref}
    {...res}
    className={cn("step-content-inner mt-4", className)}
  />
));

StepContent.displayName = "StepContent";

// Stepper Navigation Component
const StepperNavigation: FC = () => {
  const {
    nextStep,
    prevStep,
    isLastStep,
    isFirstStep,
    activeStep,
    isStepCompleted,
    isStepsAccessible,
  } = useStepper();

  return (
    <div className="stepper-navigation flex justify-between mt-8">
      <button
        onClick={prevStep}
        disabled={isFirstStep || !isStepsAccessible}
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
  const { steps, activeStep, goToStep, isStepCompleted, isStepsAccessible } =
    useStepper();

  return (
    <div className="stepper-indicators flex justify-between mb-8 relative">
      {/* Connector line */}
      <div className="absolute top-4 left-0 right-0 h-0.5 bg-blue-200 z-10" />

      {Array.from({ length: steps }).map((_, index) => {
        const completed = isStepCompleted(index);
        const active = index === activeStep;

        const accessible = isStepsAccessible
          ? index === 0 || isStepCompleted(index - 1) || index < activeStep
          : index === activeStep + 1; // forward-only mode: only immediate next step is clickable

        return (
          <div
            key={index}
            className="flex flex-col items-center relative z-10"
            aria-current={active ? "step" : undefined}
          >
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
              aria-label={`Go to step ${index + 1}`}
            >
              {completed ? "✓" : index + 1}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export const Stepper: FC<PropsWithChildren> = ({ children }) => (
  <>
    <StepperIndicators />
    {children}
  </>
);

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
