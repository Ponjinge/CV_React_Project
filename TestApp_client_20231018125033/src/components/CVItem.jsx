import React from "react";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export function CVItem({ CV, CVActions, CV_element }) {
  
  const [chosenElement, setChosenElement] = React.useState(CV_element);
  const handleElementSelect = (CV_element) => {
    setChosenElement(CV_element);
  };
 
  
  return (
    <ListItem>
      <ListItemIcon>
        <Checkbox
          data-testid="CV-checkbox"
          edge="start"
          color="primary"
          checked={CV.isSelected}
          onClick={() => {
            CVActions.toggleCV(CV);
          }}
        />
      </ListItemIcon>
      {/* We can change CV.name to CV["name"], also we can make this function generic without crashing the code */}
      <ListItemText>{CV[chosenElement]}</ListItemText>
      <ListItemSecondaryAction>
        <IconButton
          data-testid="CV-delete-button"
          edge="end"
          size="small"
          onClick={() => {
            CVActions.deleteCV(CV);
          }}
        >
          <ClearIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
