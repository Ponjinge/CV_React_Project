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

export function FormElement({
  CV,
  CVActions,
  draftCVActions,
  CV_element_list,
}) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}>
      <form>
        <FormControl sx={{ m: 3 }} variant="standard">
          <FormLabel id="cv-entry">Enter your CV information</FormLabel>
          <div>
            <Divider>Personal Info </Divider>

            {CV_element_list.map((formElement) => (
              <FormTextField
                key={formElement}
                CV={CV}
                CVActions={CVActions}
                draftCVActions={draftCVActions}
                CV_element={formElement}
              />
            ))}
          </div>

          <Button // Need to refresh the page after submitting the form
            sx={{ mt: 3, mr: 1 }}
            variant="outlined"
            size="small"
            onClick={async () => {
              await CVActions.saveCV(CV, "first_name");
              draftCVActions.deleteDraftCVElement(CV);
              window.location.reload();
            }}>
            SUBMIT{" "}
          </Button>

          <Divider>Academic Info </Divider>
        </FormControl>
      </form>
    </Box>
  );
}
