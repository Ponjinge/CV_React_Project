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

//Here we can add extra text fields for the CV form, but this is a short term solution,
//as it would be better to have a more generic solution that can support adding more fields to the CV form
//The best course of action would be to modify this function so that it takes in the field name as a parameter 
//and then creates a text field for that field name

//implementation in CVItemsPage.jsx
export function DraftCVItem({ CV, CVActions, draftCVActions, CV_element }) {
  return (
    <ListItemWithTwoSecondaryActions>
      <ListItemText inset>
        <TextField
          style={{ width: "100%" }}
          placeholder={CV_element}
          size="small"
          value={CV[CV_element]}
          onChange={(e) => {
            draftCVActions.setDraftCVElement(CV, CV_element, e.target.value);
            console.log("CV: "+ CV);
            console.log("CV_element:"+ CV_element);
            console.log(e.target);
          }}
        />
      </ListItemText>
      <ListItemSecondaryAction>
        <Button
          variant="outlined"
          size="small"
          onClick={async () => {
            await CVActions.saveCV(CV, CV_element);
            draftCVActions.deleteDraftCVElement(CV);
          }}
        >
          Save  
        </Button>
        <IconButton
          edge="end"
          size="small"
          onClick={() => {
            draftCVActions.deleteDraftCVElement(CV);
          }}
        >
          <ClearIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItemWithTwoSecondaryActions>
  );
}
