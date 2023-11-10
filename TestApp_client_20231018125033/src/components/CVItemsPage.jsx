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

  const [itemSelectedAcad, setItemSelectedAcad] = React.useState(false);
  const handleButtonClickAcad = () => {
    //   // Toggle the value of itemSelect when the button is clicked
    setItemSelectedAcad(!itemSelectedAcad);
  };
  const [itemSelectedWork, setItemSelectedWork] = React.useState(false);
  const handleButtonClickWork = () => {
    //   // Toggle the value of itemSelect when the button is clicked
    setItemSelectedWork(!itemSelectedWork);
  };

  const [formRender, setFormRender] = React.useState(false);
  const handleFormRender = () => {
    setFormRender(true);
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

          {/* {!basicInfoExists && ( */}
          <Button
            onClick={
              () => draftCVActions.createDraftCV() & handleFormRender()
              // setBasicInfoExists(true)
            }>
            Generate Basic Info{" "}
          </Button>
          {/* )}  */}
          <Divider><h1>Personal Info</h1> </Divider>
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
          <div>
            <List style={{ width: "100%" }}>
              {CVs.map((CV) => (
                <div key={getCVId(CV)}>
                  {CV.first_name && (
                    <CVItem
                      CV={CV}
                      CVActions={CVActions}
                      CV_element_list={[
                        "first_name",
                        "last_name",
                        "nationality",
                        "date_of_birth",
                        "email",
                        "phone_number",
                        "address",
                      ]} //Not sure if this is correct or whether the mapping should be modified
                    />
                  )}
                </div>
              ))}
            </List>
          </div>
          <Divider><h1>Academic Info</h1> </Divider>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleButtonClickAcad()}>
            Choose CV Element
          </Button>

          {itemSelectedAcad && ( //Replace by ItemSelectMenu when finsihed
            <ItemSelectMenu
              CVActions={CVActions}
              draftCVs={draftCVs}
              draftCVActions={draftCVActions}
              CV_category_list={[
                "Education",
                "Skills",
                "Languages",
                "Interests",
                "References",
              ]}
            />
          )}

          <div>
            <h2>Education</h2>
            <List style={{ width: "100%" }}>
              {CVs.map((CV) => (
                <div key={getCVId(CV)}>
                  {CV.institution_name && (
                    <CVItem
                      key={getCVId(CV)}
                      CV={CV}
                      CVActions={CVActions}
                      CV_element_list={[
                        "institution_name",
                        "degree",
                        "start_date",
                        "end_date",
                        "education_summary",
                      ]}
                    />
                  )}
                </div>
              ))}
            </List>
          </div>

          <div>
            <h2>Languages</h2>
            <List style={{ width: "100%" }}>
              {CVs.map((CV) => (
                <div key={getCVId(CV)}>
                  {CV.language_name && (
                    <CVItem
                      key={getCVId(CV)}
                      CV={CV}
                      CVActions={CVActions}
                      CV_element_list={[
                        "language_name", "language_level"
                      ]}
                    />
                  )}
                </div>
              ))}
            </List>
          </div>

          <div>
            <h2>References</h2>
            <List style={{ width: "100%" }}>
              {CVs.map((CV) => (
                <div key={getCVId(CV)}>
                  {CV.reference_name && (
                    <CVItem
                      key={getCVId(CV)}
                      CV={CV}
                      CVActions={CVActions}
                      CV_element_list={[
                        "reference_name",
                        "reference_function",
                        "reference_contact",
                      ]}
                    />
                  )}
                </div>
              ))}
            </List>
          </div>

          <Divider><h1>Work Experience </h1></Divider>

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleButtonClickWork()}>
            Choose CV Element
          </Button>

          {itemSelectedWork && ( //Replace by ItemSelectMenu when finsihed
            <ItemSelectMenu
              CVActions={CVActions}
              draftCVs={draftCVs}
              draftCVActions={draftCVActions}
              CV_category_list={["Experience", "Publications", "Honors/Awards"]}
            />
          )}

          <div>
            <h2>Experience</h2>
            <List style={{ width: "100%" }}>
              {CVs.map((CV) => (
                <div key={getCVId(CV)}>
                  {CV.job_title && (
                    <CVItem
                      key={getCVId(CV)}
                      CV={CV}
                      CVActions={CVActions}
                      CV_element_list={[
                        "job_title",
                        "company_name",
                        "start_date",
                        "end_date",
                        "job_description",
                      ]}
                    />
                  )}
                </div>
              ))}
            </List>
          </div>
          <div>
            <h2>Publications</h2>
            <List style={{ width: "100%" }}>
              {CVs.map((CV) => (
                <div key={getCVId(CV)}>
                  {CV.publication_title && (
                    <CVItem
                      key={getCVId(CV)}
                      CV={CV}
                      CVActions={CVActions}
                      CV_element_list={[
                        "publication_title",
                        "publication_date",
                        "publication_summary",
                      ]}
                    />
                  )}
                </div>
              ))}
            </List>
          </div>

          <div>
            <h2>Honors/Awards</h2>
            <List style={{ width: "100%" }}>
              {CVs.map((CV) => (
                <div key={getCVId(CV)}>
                  {CV.award_title && (
                    <CVItem
                      key={getCVId(CV)}
                      CV={CV}
                      CVActions={CVActions}
                      CV_element_list={[
                        "award_title", "award_date", "award_summary"
                      ]}
                    />
                  )}
                </div>
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
