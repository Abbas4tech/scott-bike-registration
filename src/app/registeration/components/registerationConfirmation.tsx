import { CircleCheckBigIcon, BanIcon } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

interface RegisterationConfirmationProps {
  success: boolean;
  message: string;
}

const RegisterationConfirmation = ({
  message,
  success,
}: RegisterationConfirmationProps): React.JSX.Element => (
  <div className="text-center py-10">
    <div
      className={cn(
        "w-24 h-24  rounded-full flex items-center justify-center mx-auto mb-4",
        success ? "bg-green-100" : "bg-red-100"
      )}
    >
      {success ? (
        <CircleCheckBigIcon size={50} className="text-green-600" />
      ) : (
        <BanIcon size={50} className="text-red-600" />
      )}
    </div>
    <h2 className="text-2xl font-bold mb-2">
      {success ? " Registration Complete!" : " Registration Failed!"}
    </h2>
    <p className="text-gray-600">{message}</p>
  </div>
);

export default RegisterationConfirmation;
