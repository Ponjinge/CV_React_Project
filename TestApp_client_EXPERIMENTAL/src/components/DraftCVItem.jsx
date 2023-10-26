import React from "react";
import {
  TextField,
  Button,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { withStyles } from "tss-react/mui";
import ClearIcon from "@mui/icons-material/Clear";

const ListItemWithTwoSecondaryActions = withStyles(ListItem, {
  secondaryAction: {
    paddingRight: "120px",
  },
});


export function DraftCVItem({ cv, cvActions, draftCVActions }) {
  return (
    <ListItemWithTwoSecondaryActions>
      <ListItemText inset>
        <TextField
          style={{ width: "100%" }}
          placeholder="What needs doing?"
          size="small"
          value={cv.name}
          onChange={(e) => {
            draftCVActions.setDraftCVName(cv, e.target.value);
          }}
        />
      </ListItemText>
      <ListItemSecondaryAction>
        <Button
          variant="outlined"
          size="small"
          onClick={async () => {
            await cvActions.saveCV(cv);
            draftCVActions.deleteDraftCV(cv);
          }}
        >
          Save
        </Button>
        <IconButton
          edge="end"
          size="small"
          onClick={() => {
            draftCVActions.deleteDraftCV(cv);
          }}
        >
          <ClearIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItemWithTwoSecondaryActions>
  );
}
