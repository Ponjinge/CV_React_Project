import React from "react";
import { Button, List } from "@mui/material"; //Check the mui material documentation
import { FormElement } from "./FormElement";
import { getCVId } from "../utils";
// for more info on these components and more components

export function ItemSelectMenu({
  CVActions,
  draftCVs,
  draftCVActions,
  CV_category_list,
}) {
  const [CV_element_list, setCV_element_list] = React.useState([]);
  const handleElementSelect = (element) => {
    switch (element) {
      case "Experience":
        setCV_element_list([
          "job_title",
          "company_name",
          "start_date", 
          "end_date",
          "job_description",
        ]); 
        break;
      case "Publications":
        setCV_element_list([
          "publication_title",
          "publication_date",
          "publication_summary",
        ]);
        break;
      case "Honors/Awards":
        setCV_element_list(["award_title", "award_date", "award_summary"]);
        break;

      case "Education":
        setCV_element_list([
          "institution_name",
          "degree",
          "start_date",
          "end_date",
          "education_summary",
          "toto"
        ]);
        break;
      case "Skills":
        setCV_element_list(["skill_name", "skill_level"]);
        break;
      case "Languages":
        setCV_element_list(["language_name", "language_level"]);
        break;
      case "Interests":
        setCV_element_list(["interest_name", "interest_level"]);
        break;
      case "References":
        setCV_element_list([
          "reference_name",
          "reference_function",
          "reference_contact",
        ]);
        break;

      default:
        break;
    }
  };

  const [itemSelect, setItemSelect] = React.useState(false);
  const handleButtonClick = () => {
    //   // Toggle the value of itemSelect when the button is clicked
    setItemSelect(!itemSelect);
  };

  return (
    //Replace this List either with a Select Menu ,
    //Or with a button  for each element in the CV form using a list of elements
    <>
      <List>
        {CV_category_list.map((formCategory) => (
          <Button
            sx={{ mt: 3, mr: 1 }}
            key={formCategory}
            variant="contained"
            color="primary"
            onClick={() => {
              handleElementSelect(formCategory);
              draftCVActions.createDraftCV();
              handleButtonClick();
            }}>
            {formCategory}
          </Button>
        ))}
      </List>
      {itemSelect && (
        <FormElement
          key={getCVId(draftCVs[0])}
          CV={draftCVs[0]}
          CVActions={CVActions}
          draftCVActions={draftCVActions}
          CV_element_list={CV_element_list}
        />
      )}
    </>
  );
}
