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
  isIndicatorButtonsAccessible: boolean; // Renamed for clarity
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
   * If true: indicator buttons are clickable for navigation (default behavior).
   * If false: indicator buttons are disabled, navigation must be done programmatically.
   */
  isIndicatorButtonsAccessible?: boolean; // Renamed for clarity
};

const StepperProvider: FC<PropsWithChildren<StepperProviderProps>> = ({
  children,
  defaultStep = 0,
  isIndicatorButtonsAccessible = true, // Renamed for clarity
}) => {
  const [activeStep, setActiveStep] = useState(defaultStep);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>(
    {}
  );
  const [stepIndexes, setStepIndexes] = useState<number[]>([]);

  const steps = stepIndexes.length;
  const isLastStep = activeStep === steps - 1;
  const isFirstStep = activeStep === 0;

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
    if (!isFirstStep) {
      setActiveStep((prev) => Math.max(prev - 1, 0));
    }
  };

  const goToStep = (step: number): void => {
    if (step < 0 || step >= steps) {
      return;
    }
    setActiveStep(step);
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
        isIndicatorButtonsAccessible, // Renamed for clarity
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};

// Step Component (unchanged)
interface StepProps {
  index: number;
}

const Step: FC<PropsWithChildren<StepProps>> = ({ children, index }) => {
  const { activeStep, registerStep } = useStepper();

  useEffect(() => {
    registerStep(index);
  }, [index, registerStep]);

  if (activeStep !== index) {
    return null;
  }

  return <div className="step contaienr max-w-lg mx-auto">{children}</div>;
};

// StepTitle Component (unchanged)
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

// Stepper Navigation Component (unchanged)
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
type StepIndicatorProps = {
  labels: string[];
};

const StepperIndicators: FC<StepIndicatorProps> = ({ labels }) => {
  const {
    steps,
    activeStep,
    goToStep,
    isStepCompleted,
    isIndicatorButtonsAccessible,
  } = useStepper(); // Use renamed prop

  if (labels.length !== steps) {
    console.error("Labels of Indicator must be equal to steps");
    return null;
  }

  return (
    <div className="stepper-indicators mx-auto max-w-md md:max-w-3xl flex justify-between mb-8 md:mb-16 relative">
      <div className="absolute top-16 left-0 right-0 h-1 rounded bg-muted z-10" />

      {Array.from({ length: steps }).map((_, index) => {
        const active = index === activeStep;

        // Always allow navigation programmatically, but disable indicator buttons if specified
        const accessible =
          isIndicatorButtonsAccessible &&
          (index === 0 || isStepCompleted(index - 1) || index < activeStep);

        const indicatorClasses = `
          ${
            active
              ? "border-blue-500 bg-blue-500 text-white"
              : "border-gray-200 bg-gray-100 text-gray-400"
          }
          ${accessible ? "cursor-pointer" : "cursor-not-allowed"}
        `;

        return (
          <div
            key={index}
            className="flex flex-col items-center relative z-10"
            aria-current={active ? "step" : undefined}
          >
            <button
              className="flex flex-1 flex-col items-center bg-transparent border-0"
              role="region"
              tabIndex={-1}
              aria-label={`Go to step: ${index + 1}`}
              type="button"
              onClick={() => accessible && goToStep(index)}
              disabled={!accessible}
            >
              <div
                className={`text-xs p-3 text-center h-14 flex tracking-wide items-center justify-center cursor-default ${
                  active ? "text-neutral-900" : "text-muted-foreground"
                }`}
                role="button"
              >
                {labels[index]}
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${indicatorClasses}`}
              />
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
