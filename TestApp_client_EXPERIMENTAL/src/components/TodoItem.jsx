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

export function CVItem({ cv, cvActions }) {
  return (
    <ListItem>
      <ListItemIcon>
        <Checkbox
          data-testid="cv-checkbox"
          edge="start"
          color="primary"
          checked={cv.isSelected}
          onClick={() => {
            cvActions.toggleCV(cv);
          }}
        />
      </ListItemIcon>
      <ListItemText>{cv.name}</ListItemText>
      <ListItemSecondaryAction>
        <IconButton
          data-testid="cv-delete-button"
          edge="end"
          size="small"
          onClick={() => {
            cvActions.deleteCV(cv);
          }}
        >
          <ClearIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
