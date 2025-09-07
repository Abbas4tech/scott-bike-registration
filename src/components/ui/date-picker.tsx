import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import React, { useState, useEffect, memo } from "react";
import { ControllerRenderProps } from "react-hook-form";

import { cn } from "@/lib/utils";
import { BikeRegistrationFormData } from "@/app/registeration/model/schema";

import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { Button } from "./button";
import { FormItem, FormLabel, FormControl, FormMessage } from "./form";
import { Calendar } from "./calendar";

interface DatePickerFieldProps {
  field: ControllerRenderProps<BikeRegistrationFormData>;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({ field }) => {
  const [month, setMonth] = useState<Date | undefined>(
    (field.value as Date) || new Date()
  );

  useEffect(() => {
    if (field.value) {
      setMonth(field.value as Date);
    }
  }, [field.value]);

  return (
    <FormItem className="flex flex-col">
      <FormLabel className="mb-2">Birthday</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              size={"xl"}
              variant="outline"
              className={cn(
                "pl-3 text-left font-normal capitalize hover:bg-inherit ring-offset-background justify-start border border-neutral-300 text-muted-foreground",
                !field.value && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="h-4 w-4 opacity-50" />
              {field.value ? format(field.value as Date, "PPP") : "Pick a date"}
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value as Date}
            onSelect={field.onChange}
            month={month}
            onMonthChange={setMonth}
            disabled={(date: Date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
};

export default memo(DatePickerField);
