import React from "react";
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

export function FormElement(CV) {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [helperTextForm, setHelperTextForm] = React.useState(" ");

  const handleChange = (event, entryText) => {
    setValue(event.target.value);
    setHelperTextForm(entryText);
    setError(false);
  };
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
            <TextField
              id="outlined-required"
              label="First Name*"
              value={CV.name}
              helperText={helperTextForm}
              onChange={handleChange}
            />

            <TextField
              id="outlined-required"
              label="Last Name*"
              defaultValue=""
              helperText={helperTextForm}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              id="outlined-required"
              label="Nationality*"
              defaultValue=""
              helperText={helperTextForm}
              onChange={handleChange}
            />
            <TextField
              id="outlined-required"
              label="Date of Birth*"
              defaultValue=""
              helperText={helperTextForm}
              onChange={handleChange}
            />
            <TextField
              id="outlined-required"
              label="Mail*"
              defaultValue=""
              helperText={helperTextForm}
              onChange={handleChange}
            />
            <TextField
              id="outlined-required"
              label="Tel*"
              defaultValue=""
              helperText={helperTextForm}
              onChange={handleChange}
            />
            <TextField
              id="outlined-required"
              label="Address*"
              defaultValue=""
              helperText={helperTextForm}
              onChange={handleChange}
            />


          </div>

          <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
            {" "}
            Submit
          </Button>

          <FormHelperText>{helperTextForm}</FormHelperText>
          <Divider>Academic Info </Divider>
          </FormControl>
          

      </form>
    </Box>        
  );
}
