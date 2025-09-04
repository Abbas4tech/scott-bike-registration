import { NextRequest, NextResponse } from "next/server";

import { bikeRegistrationSchema } from "@/app/registeration/model/schema";

// Helper function to fake delay from loading data from db
const delay = (ms: number): Promise<unknown> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();

    // if client sends dates as strings, convert them to Date before validating
    const normalized = {
      ...body,
      dateOfPurchase: body.dateOfPurchase
        ? new Date(body.dateOfPurchase)
        : undefined,
      dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : undefined,
    };

    const result = bikeRegistrationSchema.safeParse(normalized);

    if (!result.success) {
      // return validation errors (zod format is helpful for FE)
      return NextResponse.json(
        { success: false, errors: result.error.format() },
        { status: 400 }
      );
    }

    const data = result.data;

    // Fake failure rules:
    // - if email contains "fail" -> force a failure (useful for QA)
    // - otherwise random 20% failure to simulate server-side issues (change as desired)
    const shouldFail = data.email.includes("fail") || Math.random() < 0.2;

    // fake 3-second delay
    await delay(3000);

    if (shouldFail) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Registration failed (simulated). Please contact our Support.",
        },
        { status: 409 }
      );
    }

    // Fake a registration id
    const registrationId = `REG-${Math.random()
      .toString(36)
      .slice(2, 9)
      .toUpperCase()}`;

    // Normally you'd store the validated `data` in DB here.

    return NextResponse.json(
      {
        success: true,
        id: registrationId,
        message:
          "Your bike has been successfully registered. You will receive a confirmation email shortly.",
        payload: { serialNumber: data.serialNumber, email: data.email },
      },
      { status: 201 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid Request";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
