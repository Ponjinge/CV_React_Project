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

export function ElementDisplay({ CV, CVActions }) {
  // const [chosenElement, setChosenElement] = React.useState(CV_element);
  // const handleElementSelect = (CV_element) => {
  //   setChosenElement(CV_element);
  // };

  return (
    <>
      {/* <ListItemIcon>
        <Checkbox
          data-testid="CV-checkbox"
          edge="start"
          color="primary"
          checked={CV.isSelected}
          onClick={() => {
            CVActions.toggleCV(CV);
          }}
        />
      </ListItemIcon> */}

      <h1>
      {` ${CV.first_name} ${CV["last_name"]} CV`}
      </h1>
    </>
  );
}
