import React from "react";
import { FormTextField } from "./FormTextField";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  TextField,
  Box,
  Divider,
} from "@mui/material"; //Check the mui material documentation
// for more info on these components and more components

export function FormElement({CV, CVActions, draftCVActions, CV_element_list}) {
  const [error, setError] = React.useState(false);
  const [value, setValue] = React.useState("");
  const formElementList = {CV_element_list};
  const handleChange = (event, entryText) => {
    setValue(event.target.value);
    setHelperTextForm(entryText);
    setError(false);
  };
  const [helperTextForm, setHelperTextForm] = React.useState(" ");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (value === "") {
      setHelperTextForm("REQUIRED");
      setError(true);
    } else {
      setHelperTextForm("AHHHHHHHH ");
      setError(false);
    }
  };
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}>
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ m: 3 }} error={error} variant="standard">
          <FormLabel id="cv-entry">Enter your CV information</FormLabel>
          <div>
            <Divider>Personal Info </Divider>

           {CV_element_list.map((formElement) => (
              <FormTextField
                key={formElement}
                CV={CV}
                CVActions={CVActions}
                draftCVActions={draftCVActions}
                CV_element={formElement} //Not sure if this is correct or whether the mapping should be modified
              />
            ))}   
          
          </div>

          {/* <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
            {" "}
            Submit
          </Button> */}
          
          <Button
            variant="outlined"
            size="small"
            onClick={async () => {
              await CVActions.saveCV(CV, "first_name");
              //await CVActions.saveCV(CV, "last_name");
              draftCVActions.deleteDraftCVElement(CV);
            }}>
            SUBMIT{" "}
          </Button>

          <FormHelperText>{helperTextForm}</FormHelperText>
          <Divider>Academic Info </Divider>
        </FormControl>
      </form>
    </Box>
  );
}
