import React, { useState, useEffect } from "react";
import { useCVs } from "../hooks/useCVs";
import Papa from "papaparse";

export function CVLoadPageTest() {
  const { CVs } = useCVs();
  const [publicationsData, setPublicationsData] = useState([]);
  const [showPublications, setShowPublications] = useState(false);

  useEffect(() => {
    readCSV();
  }, []);

  const isNotEmpty = (value) => {
    return value !== null && value !== undefined && value !== "";
  };

  const renderListItem = (cv, category, isSelected = true) => {
    if (isSelected) {
      return (
        <>
          <h2>{category}</h2>
          {generateListItems(cv, category)}
        </>
      );
    }
    return null;
  };
  
  /*
  const renderListItem = (cv, category) => {
  const isSelected = cv[category][0]["isSelected"];

  if (isSelected) {
    return (
      <>
        <h2>{category}</h2>
        {generateListItems(cv, category)}
      </>
    );
  }
  return null;
};
*/

  const generateListItems = (cv, category) => {
    if (cv[category]) {
      if (Array.isArray(cv[category])) {
        const filteredList = cv[category].filter((item) => {
          if (typeof item === 'object' && !Array.isArray(item)) {
            return Object.values(item).some((value) => isNotEmpty(value));
          }
          return isNotEmpty(item);
        });

        return (
          <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
            {filteredList.map((item, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                {Object.entries(item).map(([key, value]) => (
                  <div key={key}>
                    {`${key}: ${typeof value === 'object' ? JSON.stringify(value) : value}`}
                  </div>
                ))}
              </li>
            ))}
          </ul>
        );
      } else if (typeof cv[category] === 'object') {
        const filteredObject = Object.fromEntries(
          Object.entries(cv[category]).filter(([key, value]) => isNotEmpty(value))
        );

        return (
          <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
            {Object.keys(filteredObject).map((key) => (
              <li key={key} style={{ marginBottom: '10px' }}>
                {filteredObject[key]}
              </li>
            ))}
          </ul>
        );
      }
    }
    return null;
  };

  const readCSV = () => {
    Papa.parse("/citations.csv", {
      download: true,
      header: true,
      complete: (result) => {
        setPublicationsData(result.data);
      },
      dynamicTyping: true,
    });
  };

  return (
    <div>
      {CVs.map((cv) => (
        <div key={cv._id}>
          <h2>{`${cv["Personal Information"]["name"]} ${cv["Personal Information"]["surname"]}`}</h2>

          {renderListItem(cv, "Personal Information", cv["Personal Information"]["isSelected"])}

          {renderListItem(cv, "Qualifications", cv["Qualifications"][0]["isSelected"])}

          {renderListItem(cv, "Education", cv["Education"][0]["isSelected"])}

          {renderListItem(cv, "Experience", cv["Experience"][0]["isSelected"])}

          {renderListItem(cv, "Publications", cv["Publications"][0]["isSelected"]) && (
            <div>
              <h2>Publications</h2>
              {publicationsData.length > 0 && (
                <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ width: "10%" }}>Auteurs</th>
                    <th style={{ width: "10%" }}>Titre</th>
                    <th style={{ width: "10%" }}>Publication</th>
                    <th style={{ width: "10%" }}>Volume</th>
                    <th style={{ width: "10%" }}>Nombre</th>
                    <th style={{ width: "10%" }}>Page</th>
                    <th style={{ width: "10%" }}>Année</th>
                    <th style={{ width: "20%" }}>Editeur</th>
                  </tr>
                </thead>
                  <tbody>
                  {publicationsData.map((publication, index) => (
                    <tr key={index}>
                      <td>{isNotEmpty(publication["Authors"]) && publication["Authors"]}</td>
                      <td>{isNotEmpty(publication["Title"]) && publication["Title"]}</td>
                      <td>{isNotEmpty(publication["Publication"]) && publication["Publication"]}</td>
                      <td>{isNotEmpty(publication["Volume"]) ? publication["Volume"] : ""}</td>
                      <td>{isNotEmpty(publication["Number"]) ? publication["Number"] : ""}</td>
                      <td>{isNotEmpty(publication["Pages"]) ? publication["Pages"] : ""}</td>
                      <td>{isNotEmpty(publication["Year"]) ? publication["Year"] : ""}</td>
                      <td>{isNotEmpty(publication["Publisher"]) ? publication["Publisher"] : ""}</td>
                    </tr>
                  ))}


                  </tbody>
                </table>
              )}
            </div>
          )}

          {renderListItem(cv, "Professional Affiliations", cv["Professional Affiliations"][0]["isSelected"])}

          {renderListItem(cv, "Honors/Awards/Grants", cv["Honors/Awards/Grants"][0]["isSelected"])}
        </div>
      ))}
    </div>
  );
}
