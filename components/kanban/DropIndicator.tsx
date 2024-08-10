import { DropIndicatorProps } from "@/types";
import React from "react";

const DropIndicator: React.FC<DropIndicatorProps> = ({ beforeId, status }) => {
    return (
      <div
        data-before={beforeId || "-1"}
        data-column={status}
        className="my-0.5 h-0.5 w-[280px] bg-darkBlue opacity-0"
      />
    );
  };

export default DropIndicator;