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

export function CVItemsPage() {
  const { loading, cvs, ...cvActions } = useCVs();
  const { draftCVs, ...draftCVActions } = useDraftCVs();
  const showLoader = useShowLoader(loading, 200);
  return (
    <Container className="main-container" maxWidth="sm">
      {loading ? (
        showLoader ? (
          <LinearProgress />
        ) : null
      ) : (
        <div className="cv-items-container">
          <Typography component="p" variant="h5">
            {`You have ${cvs.length} CV element Item${
              cvs.length === 1 ? "" : "s"
            }`}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => draftCVActions.createDraftCV()}
          >
            Add CV element
          </Button>
          <List style={{ width: "100%" }}>
            {cvs.map((cv) => (
              <CVItem
                key={getCVId(cv)}
                cv={cv}
                cvActions={cvActions}
              />
            ))}
            {draftCVs.map((draft) => (
              <DraftCVItem
                key={getCVId(draft)}
                cv={draft}
                cvActions={cvActions}
                draftCVActions={draftCVActions}
              />
            ))}
          </List>
        </div>
      )}
      <MoreInfo />
    </Container>
  );
}
