import z from "zod";

export const bikeRegistrationSchema = z.object({
  serialNumber: z.string().min(1, { message: "Serial number is required" }),
  modelDescription: z
    .string()
    .min(1, { message: "Model description is required" }),
  shopName: z.string().min(1, { message: "Shop name is required" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.email({ message: "Invalid email address" }),
  country: z.string().min(1, { message: "Country is required" }),
  dateOfPurchase: z
    .string()
    .min(1, { message: "Date of purchase is required" }),
  preferredLanguage: z
    .string()
    .min(1, { message: "Language selection is required" }),
  gender: z.string().min(1, { message: "Gender selection is required" }),
  dateOfBirth: z.string(),
  newsOptIn: z.boolean(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must provide consent to continue",
  }),
});

export type BikeRegistrationFormData = z.infer<typeof bikeRegistrationSchema>;
