import React from "react";
import { Mosaic } from "react-loading-indicators";
export default function CustomLoading() {
  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <Mosaic color="#1976d2" size="medium" text="" textColor="" />
    </div>
  );
}
