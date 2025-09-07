// components/BikeInfoCard.tsx
import Image from "next/image";
import React, { memo } from "react";
import { useFormContext } from "react-hook-form";

import { BikeRegistrationFormData } from "../model/schema";

interface BikeInforCardProps {
  imageSize: number;
  showDescription?: boolean;
}

/**
 * Displays bike information with an image and optional description
 * Renders conditionally based on form data availability
 */
const BikeInfoCard = ({
  imageSize,
  showDescription = true,
}: BikeInforCardProps): React.JSX.Element | undefined => {
  const form = useFormContext<BikeRegistrationFormData>();

  // Don't render if required form data is missing
  if (!form.getValues("modelDescription") || !form.getValues("serialNumber")) {
    return;
  }

  return (
    <div className="flex my-4 gap-4 items-center">
      <Image
        width={imageSize}
        height={imageSize}
        src={`/assets/${form.getValues("serialNumber")}.jpg`}
        className="border border-neutral-300"
        alt="Bike"
      />
      {showDescription && (
        <p className="font-bold text-lg">
          {form.getValues("modelDescription")}
        </p>
      )}
    </div>
  );
};

export default memo(BikeInfoCard);
