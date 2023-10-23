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


//  New API Key
// Public :yjjbasgf
// Private : 5d90b05e-ddaa-4a55-9891-26d8359dd6ec

