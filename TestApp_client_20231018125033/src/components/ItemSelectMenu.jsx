import React from "react";
import {
    Checkbox,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Select,
    MenuItem,
    SelectChangeEvent ,
    } from "@mui/material";



export function ItemSelectMenu(){
    const [chosenElement, setChosenElement] = React.useState(null);
    const handleElementSelect = (element) => {
        setChosenElement(element);
    };
    return(
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Item Select Menu"
        >
          <MenuItem onClick={() => handleElementSelect('name')}>Name</MenuItem>
          <MenuItem onClick={() => handleElementSelect('surname')}>Surname</MenuItem>
          <MenuItem onClick={() => handleElementSelect('nationality')}>Nationality</MenuItem>
          {/* Add more menu items as needed */}
          </Select>
    );   
}


