import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type BikeRegistrationFormData } from "../model/schema";
import { BASE_URL } from "@/lib/utils";

export const bikeRegistrationApi = createApi({
  reducerPath: "bikeRegistrationApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    registerBike: builder.mutation<
      { success: boolean; id?: string; message?: string; payload?: any },
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
