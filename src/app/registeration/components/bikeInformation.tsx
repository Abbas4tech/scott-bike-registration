import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useFormContext } from "react-hook-form";
import { BikeRegistrationFormData } from "../model/schema";

const BikeInformation = () => {
  const { control } = useFormContext<BikeRegistrationFormData>();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter first name!" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <p className="text-sm text-gray-500">Serial Number</p>
          <p className="font-medium">{"STM34D30L24110132N"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Model Description</p>
          <p className="font-medium">Bike Spark RC World Cup (EU) IGPG/L</p>
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

      <button className="text-blue-600 text-sm">THIS IS NOT MY BIKE</button>
    </div>
  );
};

export default BikeInformation;
