import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "@/lib/utils";

import { BikeModel } from "../model/types";

export type SerialNumberRequest = { serialNumber: string };
export type SerialNumberResponse = {
  data: BikeModel;
  status: number;
};

export const serialNumberApi = createApi({
  reducerPath: "serialNumberApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    verifySerialNumber: builder.mutation<
      SerialNumberResponse,
      SerialNumberRequest
    >({
      query: (body) => ({
        url: "/verify-serial-number",
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
      }),
    }),
  }),
});

export const { useVerifySerialNumberMutation } = serialNumberApi;
export default serialNumberApi;
