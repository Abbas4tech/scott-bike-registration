import React from "react";
import { useFormContext } from "react-hook-form";
import { CalendarIcon, CircleCheck } from "lucide-react";
import { format } from "date-fns";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useStepper } from "@/components/ui/stepper";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";

import { BikeRegistrationFormData } from "../model/schema";
import BikeInfoCard from "./bikeInfoCard";

const BikeInformation = (): React.JSX.Element => {
  const { control, watch } = useFormContext<BikeRegistrationFormData>();

  // We are here redirecting to previous step on clicking "This is not my bike" button
  // In actual scenario it will trigger a different form scenario
  const { prevStep, nextStep, setStepCompleted } = useStepper();

  const dop = watch("dateOfPurchase");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <FormField
          control={control}
          name="serialNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel aria-disabled="true">Serial Number</FormLabel>
              <FormControl>
                <Input disabled placeholder="Enter first name!" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription className="text-green-500 text-xs items-center flex gap-1 font-bold">
                <CircleCheck size={14} />
                Serial Number found
              </FormDescription>
            </FormItem>
          )}
        />
        <BikeInfoCard imageSize={400} showDescription={false} />
        <FormField
          control={control}
          name="modelDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel aria-disabled="true">Model Description</FormLabel>
              <FormControl>
                <Input disabled placeholder="Enter first name!" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="shopName"
          render={({ field }) => (
            <FormItem>
              <FormLabel aria-disabled="true">Shop Name</FormLabel>
              <FormControl>
                <Input disabled placeholder="Enter first name!" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="dateOfPurchase"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="tracking-wide font-bold">
                Date of Purchase
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      type="button"
                      variant={"outline"}
                      size={"xl"}
                      className={cn(
                        "pl-3 text-left font-normal capitalize hover:bg-inherit ring-offset-background justify-start border border-neutral-300 text-muted-foreground",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="h-4 w-4 opacity-50" />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Calendar
                    mode="single"
                    className=""
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <Button
          variant={"link"}
          type="button"
          onClick={prevStep}
          className="text-blue-600 text-sm"
        >
          THIS IS NOT MY BIKE
        </Button>

        <Button
          disabled={!dop}
          type="button"
          size={"lg"}
          onClick={() => {
            setStepCompleted(1, true);
            nextStep();
          }}
          variant={"default"}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default BikeInformation;
