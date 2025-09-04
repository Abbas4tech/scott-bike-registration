import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "@/lib/utils";

import { type BikeRegistrationFormData } from "../model/schema";

export const bikeRegistrationApi = createApi({
  reducerPath: "bikeRegistrationApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    registerBike: builder.mutation<
      { success: boolean; id?: string; message: string; payload?: unknown },
      BikeRegistrationFormData
    >({
      query: (body) => {
        // convert Date objects to ISO strings to send over JSON
        const serialized = {
          ...body,
          dateOfPurchase:
            body.dateOfPurchase instanceof Date
              ? body.dateOfPurchase.toISOString()
              : body.dateOfPurchase,
          dateOfBirth:
            body.dateOfBirth instanceof Date
              ? body.dateOfBirth.toISOString()
              : body.dateOfBirth,
        };
        return {
          url: "/register",
          method: "POST",
          body: serialized,
        };
      },
    }),
  }),
});

export const { useRegisterBikeMutation } = bikeRegistrationApi;
export default bikeRegistrationApi;
