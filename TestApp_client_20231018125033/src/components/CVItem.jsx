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
  return (
    <ListItem>
      <ListItemIcon>
        <Checkbox
          data-testid="CV-checkbox"
          edge="start"
          color="primary"
          checked={CV.isComplete}
          onClick={() => {
            CVActions.toggleCV(CV);
          }}
        />
      </ListItemIcon>
      <ListItemText>{CV[CV_element]}</ListItemText>
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
