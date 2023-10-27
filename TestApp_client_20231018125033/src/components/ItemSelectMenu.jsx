import React from "react";
import {
    Button,
    List,
    } from "@mui/material"; //Check the mui material documentation
    // for more info on these components and more components 



export function ItemSelectMenu(){
    const [chosenElement, setChosenElement] = React.useState(null);
    const handleElementSelect = (element) => {
        setChosenElement(element);
    };  
    return( //Replace this List either with a Select Menu ,
    //Or with a button  for each element in the CV form using a list of elements 
        <List>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => handleElementSelect("name")}>
                Name
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => handleElementSelect("surname")}>
                Surname
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => handleElementSelect("nationality")}>
                Nationality
              </Button>
            </List>
    );   
}


