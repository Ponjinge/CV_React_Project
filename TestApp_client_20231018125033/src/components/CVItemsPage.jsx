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
export function CVItemsPage() {
  const { loading, CVs, ...CVActions } = useCVs();
  const { draftCVs, ...draftCVActions } = useDraftCVs();
  const showLoader = useShowLoader(loading, 200);

  const [itemSelect, setItemSelect] = React.useState(false);
  const handleButtonClick = () => {
    //   // Toggle the value of itemSelect when the button is clicked
    setItemSelect(!itemSelect);
  };
  const [elementSelect, setElementSelect] = React.useState("name");
  const handleElementSelect = (CV_element) => {
    setElementSelect(CV_element);
  };
 
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

          {draftCVs.map((draft) => (
            <FormElement
              key={getCVId(draft)}
              CV={draft}
              CVActions={CVActions}
              draftCVActions={draftCVActions}
              CV_element_list= {["first_name", "last_name","nationality", "date_of_birth", "email", "phone_number", "address"]}
            />
          ))}

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleButtonClick()}>
            Choose CV Element
          </Button>

          {itemSelect && ( //Replace by ItemSelectMenu when finsihed
            <List>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() =>
                  handleElementSelect("name") & draftCVActions.createDraftCV()
                }>
                name
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() =>
                  handleElementSelect("nationality") &
                  draftCVActions.createDraftCV()
                }>
                nationality
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() =>
                  handleElementSelect("Other") & draftCVActions.createDraftCV()
                }>
                Other
              </Button>
            </List>
          )}

          <List style={{ width: "100%" }}>
            {CVs.map((CV) => (
              <CVItem
                key={getCVId(CV)}
                CV={CV}
                CVActions={CVActions}
                CV_element={elementSelect} //Not sure if this is correct or whether the mapping should be modified
              />
            ))}

            {draftCVs.map((draft) => (
              <DraftCVItem
                key={getCVId(draft)}
                CV={draft}
                CVActions={CVActions}
                draftCVActions={draftCVActions}
                CV_element={elementSelect} //Not sure if this is correct or whether the mapping should be modified
              />
            ))}
          </List>
          <div>
            <div />
            <Divider>Work</Divider>
            <div />
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleButtonClick()}>
              Choose Element
            </Button>

            {itemSelect && ( //Replace by ItemSelectMenu when finsihed
              <List>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() =>
                    handleElementSelect("Experience") &
                    draftCVActions.createDraftCV()
                  }>
                  Experience
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() =>
                    handleElementSelect("Publications") &
                    draftCVActions.createDraftCV()
                  }>
                  Publications
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() =>
                    handleElementSelect("Honors/Awards") &
                    draftCVActions.createDraftCV()
                  }>
                  Honors/Awards
                </Button>
              </List>
            )}

            <List style={{ width: "100%" }}>
              {CVs.map((CV) => (
                <CVItem
                  key={getCVId(CV)}
                  CV={CV}
                  CVActions={CVActions}
                  CV_element={elementSelect} //Not sure if this is correct or whether the mapping should be modified
                />
              ))}

              {draftCVs.map((draft) => (
                <DraftCVItem
                  key={getCVId(draft)}
                  CV={draft}
                  CVActions={CVActions}
                  draftCVActions={draftCVActions}
                  CV_element={elementSelect} //Not sure if this is correct or whether the mapping should be modified
                />
              ))}
            </List>
          </div>
        </div>
      )}

      <div></div>

      <MoreInfo />
    </Container>
  );
}
