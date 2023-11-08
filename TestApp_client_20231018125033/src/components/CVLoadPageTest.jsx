import React from "react";
import { useCVs } from "../hooks/useCVs";

export function CVLoadPageTest() {
  const { CVs } = useCVs();

  const isNotEmpty = (value) => {
    return value !== null && value !== undefined && value !== "";
  };

  const generateListItems = (cv, category) => {
    if (cv[category] && typeof cv[category] === 'object') {
      return Object.keys(cv[category]).map((key) => {
        const value = cv[category][key];
        if (isNotEmpty(value)) {
          return (
            <li key={key}>
               {value}
            </li>
          );
        }
        return null;
      });
    }
    return null;
  };
  

  return (
    <div>
      <h2>Liste des CVs</h2>
      <ul>
        {CVs.map((cv) => (
          <li key={cv._id}>
            

            <h2>Informations Personnelles</h2>
            <ul>
              {generateListItems(cv, "Personal Information")}
            </ul>

            <h2>Qualifications</h2>
            {cv["Qualifications"] && cv["Qualifications"].map((qualification, index) => (
              <ul key={index}>
                {generateListItems(qualification, "Qualification")}
              </ul>
            ))}

            <h2>Education</h2>
            {cv["Education"] && cv["Education"].map((education, index) => (
              <ul key={index}>
                {generateListItems(education, "Education")}
                <h3>Supervisors</h3>
                <ul>
                  {education["Supervisor"] && education["Supervisor"].map((supervisor, sIndex) => (
                    <ul key={sIndex}>
                      {generateListItems(supervisor, "Supervisor")}
                    </ul>
                  ))}
                </ul>
              </ul>
            ))}

            <h2>Experience</h2>
            {cv["Experience"] && cv["Experience"].map((experience, index) => (
              <ul key={index}>
                {generateListItems(experience, "Experience")}
              </ul>
            ))}

            <h2>Publications</h2>
            {cv["Publications"] && cv["Publications"].map((publication, index) => (
              <ul key={index}>
                {generateListItems(publication, "Publication")}
              </ul>
            ))}

            <h2>Professional Affiliations</h2>
            {cv["Professional Affiliations"] && cv["Professional Affiliations"].map((affiliation, index) => (
              <ul key={index}>
                {generateListItems(affiliation, "Professional Affiliation")}
              </ul>
            ))}

            <h2>Honors/Awards/Grants</h2>
            {cv["Honors/Awards/Grants"] && cv["Honors/Awards/Grants"].map((award, index) => (
              <ul key={index}>
                {generateListItems(award, "Award")}
              </ul>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
