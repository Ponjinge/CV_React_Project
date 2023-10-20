import React from "react";
import { Typography } from "@mui/material";


//Why are we exporting this ???
export const API_TYPE_NAME = "CV"
//This code seems redundant 
export function AppName() {
  return (
    <Typography className="app-bar-title" component="h1" variant="h5">
      IRIT {API_TYPE_NAME} Composer
    </Typography>
  );
}
