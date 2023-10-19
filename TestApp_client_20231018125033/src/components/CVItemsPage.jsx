import React from "react";
import {
  Container,
  Button,
  Typography,
  List,
  LinearProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useCVs } from "../hooks/useCVs";
import { CVItem } from "./CVItem";
import { useDraftCVs } from "../hooks/useDraftCVs";
import { DraftCVItem } from "./DraftCVItem";
import { useShowLoader } from "../hooks/util-hooks";
import { MoreInfo } from "./MoreInfo";
import { getCVId } from "../utils";
import { useState } from "react";

export function CVItemsPage() {
  const { loading, CVs, ...CVActions } = useCVs();
  const { draftCVs, ...draftCVActions } = useDraftCVs();
  const showLoader = useShowLoader(loading, 200);

  // //Pop up code for the CV form
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedCVElement, setSelectedCVElement] = useState("name"); // Default value

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleMenuItemClick = (element) => {
    setSelectedCVElement(element);
    setMenuOpen(false);
  };

  const handleConfirmation = () => {
    // Implement your logic for creating CV with the selected CV_element
    console.log(`Creating CV with ${selectedCVElement}`);
  };

  //fin

  return (
    <Container className="main-container" maxWidth="sm">
      {loading ? (
        showLoader ? (
          <LinearProgress />
        ) : null
      ) : (
        <div className="CV-items-container">
          <Typography component="p" variant="h5">
            {`You have ${CVs.length} CV Item${CVs.length === 1 ? "" : "s"}`}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => draftCVActions.createDraftCV()}>
            Add CV
          </Button>
          <List style={{ width: "100%" }}>
            {CVs.map((CV) => (
              <CVItem
                key={getCVId(CV)}
                CV={CV}
                CVActions={CVActions}
                CV_element={"name"} //Not sure if this is correct or whether the mapping should be modified
              />
            ))}
            {CVs.map((CV) => (
              <CVItem
                key={getCVId(CV)}
                CV={CV}
                CVActions={CVActions}
                CV_element={"surname"} //Not sure if this is correct or whether the mapping should be modified
              />
            ))}
            {draftCVs.map((draft) => (
              <DraftCVItem
                key={getCVId(draft)}
                CV={draft}
                CVActions={CVActions}
                draftCVActions={draftCVActions}
                CV_element={"name"} //Not sure if this is correct or whether the mapping should be modified
              />
            ))}
            {draftCVs.map((draft) => (
              <DraftCVItem
                key={getCVId(draft)}
                CV={draft}
                CVActions={CVActions}
                draftCVActions={draftCVActions}
                CV_element={"surname"} //Not sure if this is correct or whether the mapping should be modified
              />
            ))}
          </List>
          
          {/* Pop up code for the CV form */}
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
            <ListItemText>{CV[selectedCVElement]}</ListItemText>
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
              <Button onClick={handleMenuOpen}>Change CV Element</Button>
              <Menu
                anchorEl={isMenuOpen}
                keepMounted
                open={Boolean(isMenuOpen)}
                onClose={handleMenuClose}>
                <MenuItem onClick={() => handleMenuItemClick("name")}>
                  Name
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("surname")}>
                  Surname
                </MenuItem>
                {/* Add more menu items as needed */}
              </Menu>
              <Button onClick={handleConfirmation}>Confirm</Button>
            </ListItemSecondaryAction>
          </ListItem>
        </div>
      )}
      <MoreInfo />
    </Container>
  );
}
