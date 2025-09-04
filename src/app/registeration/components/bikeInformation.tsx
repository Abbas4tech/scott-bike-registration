import React from "react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

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
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";

import { BikeRegistrationFormData } from "../model/schema";

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
              <FormLabel className="font-sans text-neutral-400 tracking-wide font-bold">
                Serial Number
              </FormLabel>
              <FormControl>
                <Input disabled placeholder="Enter first name!" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Image
          width={400}
          height={400}
          alt="Bike"
          className="object-fit border border-neutral-300"
          src={"/assets/SCR29A20M24110345N.jpg"}
        />
        <FormField
          control={control}
          name="modelDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-sans text-neutral-400 tracking-wide font-bold">
                Model Description
              </FormLabel>
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
              <FormLabel className="font-sans text-neutral-400 tracking-wide font-bold">
                Shop Name
              </FormLabel>
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
              <FormLabel className="font-sans tracking-wide font-bold">
                Date of Purchase
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      size={"xl"}
                      className={cn(
                        "pl-3 text-left font-sans font-normal capitalize hover:bg-inherit ring-offset-background justify-start border border-neutral-300 text-muted-foreground",
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
                    className="font-sans"
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
