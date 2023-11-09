import React from "react";
import { TextField } from "@mui/material";

export function FormTextField({ CV, draftCVActions, CV_element }) {
  const [conditionsMet, setConditionsMet] = React.useState(true); //Switch to true
  const handleConditionsMet = () => {
    setConditionsMet(!conditionsMet);
  };

  return (   
        <TextField
          error={!conditionsMet}
          id="outlined-required"
          label={CV_element + "* "}
          defaultValue={CV[CV_element] !== "" ? CV[CV_element] : ""}
          helperText={conditionsMet ? "" : "Required"}
          onChange={(e) => {
            draftCVActions.setDraftCVElement(CV, CV_element, e.target.value);
          }}
        />
      
  );
}

