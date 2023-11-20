import React from "react";
import {
  Container,
  Button,
  Typography,
  List,
  LinearProgress,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useCVs } from "../hooks/useCVs";
import { CVItem } from "./CVItem";
import { useDraftCVs } from "../hooks/useDraftCVs";
import { DraftCVItem } from "./DraftCVItem";
import { useShowLoader } from "../hooks/util-hooks";
import { MoreInfo } from "./MoreInfo";
import { getCVId } from "../utils";
import { FormElement } from "./FormElement";
import { ItemSelectMenu } from "./ItemSelectMenu";
import { ElementDisplay } from "./ElementDisplay";
export function CVPresentation() {
  const { loading, CVs, ...CVActions } = useCVs();
  const { draftCVs, ...draftCVActions } = useDraftCVs();
  const showLoader = useShowLoader(loading, 200);

  return (
    <Container className="main-container" maxWidth="sm">
      {loading ? (
        showLoader ? (
          <LinearProgress />
        ) : null
      ) : (
        <div className="CV-items-container">
          <Typography component="p" variant="h5">
            {` ${CVs.first_name} ${CVs["last_name"]} CV`}
          </Typography>
          {CVs.map((CV) => (
            <div key={getCVId(CV)}>
              {CV.first_name && (
                <ElementDisplay
                  CV={CVs}
                  CVActions={CVActions}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
