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
  const { loading, CVs, ...CVActions } = useCVs();
  const { draftCVs, ...draftCVActions } = useDraftCVs();
  const showLoader = useShowLoader(loading, 200);
  
  
const [itemSelect, setItemSelect] = React.useState(false);
const handleButtonClick = () => {
  //   // Toggle the value of itemSelect when the button is clicked
  setItemSelect(!itemSelect);
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

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleButtonClick()}>
           Choose CV Element
          </Button>

          {itemSelect && <h1>Hello</h1>}
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => draftCVActions.createDraftCV()}>
            Add CV Item
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
          
         
        </div>
      )}
      <MoreInfo />
    </Container>
  );
}
