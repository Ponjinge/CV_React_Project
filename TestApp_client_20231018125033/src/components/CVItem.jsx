import React from "react";
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export function CVItem({ CV, CVActions, CV_element_list }) {
  // const [chosenElement, setChosenElement] = React.useState(CV_element);
  // const handleElementSelect = (CV_element) => {
  //   setChosenElement(CV_element);
  // };

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
      {CV_element_list.map((CV_element) => (
        <List key={CV_element}>
          <ListItem>
            <ListItemText>{CV_element} :  {CV[CV_element]}</ListItemText>
          </ListItem>
        </List>
      ))}

      <ListItemSecondaryAction>
        <IconButton
          data-testid="CV-delete-button"
          edge="end"
          size="small"
          onClick={() => {
            CVActions.deleteCV(CV);
          }}>
          <ClearIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
