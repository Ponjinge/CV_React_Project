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

  // const [basicInfoExists, setBasicInfoExists] = React.useState(false);
  // const handleBasicInfoExists = () => {
  //   setBasicInfoExists(true);
  // };

   const [formRender, setFormRender] = React.useState(false);
   const handleFormRender = () => {
     setFormRender(true);
   };

  // React.useEffect(() => {
  //   const hasBasicInfo = CVs.some((CV) => CV.first_name !== "");
  //   if (hasBasicInfo) {
  //     handleBasicInfoExists();
  //   } else {
  //     console.log("Basic info does not exist");
  //   }
  // }, [CVs, handleBasicInfoExists]);

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

          {/* {!basicInfoExists && ( */}
            <Button
              onClick={() =>
                draftCVActions.createDraftCV() &
                handleFormRender() 
                // setBasicInfoExists(true)
              }>
              Generate Basic Info{" "}
            </Button>
          {/* )}  */}
          {formRender && ( 
            <FormElement
              key={getCVId(draftCVs[0])}
              CV={draftCVs[0]}
              CVActions={CVActions}
              draftCVActions={draftCVActions}
              CV_element_list={[
                "first_name",
                "last_name",
                "nationality",
                "date_of_birth",
                "email",
                "phone_number",
                "address",
              ]}
            />
         )} 

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleButtonClick()}>
            Choose CV Element
          </Button>

          {itemSelect && ( //Replace by ItemSelectMenu when finsihed
            <ItemSelectMenu
              CVActions={CVActions}
              draftCVs={draftCVs}
              draftCVActions={draftCVActions}
              CV_category_list={[
                "Experience",
                "Publications",
                "Honors/Awards",
              ]}
            
            />
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

           

            {/* {draftCVs.map((draft) => (
              <DraftCVItem
                key={getCVId(draft)}
                CV={draft}
                CVActions={CVActions}
                draftCVActions={draftCVActions}
                CV_element={elementSelect} //Not sure if this is correct or whether the mapping should be modified
              />
            ))} */}
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

          
            <List style={{ width: "100%" }}>
              {CVs.map((CV) => (
                <CVItem
                  key={getCVId(CV)}
                  CV={CV}
                  CVActions={CVActions}
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
