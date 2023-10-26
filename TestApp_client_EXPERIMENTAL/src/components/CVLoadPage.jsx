import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function CVLoadPage() {
  const [cvData, setCvData] = useState(null);
  const componentRef = useRef();

  const handlePrint = () => {
    if (componentRef.current) {
      const pdfWidth = 210;
      const pdfHeight = 297;
      html2canvas(componentRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("cv.pdf");
      });
    }
  };

  useEffect(() => {
    const fetchCVData = async () => {
      try {
        const response = await fetch("/exempleCV.json");
        const data = await response.json();
        setCvData(data);
      } catch (error) {
        console.error("Erreur de chargement du CV :", error);
      }
    };

    fetchCVData();
  }, []);

  return (
    <div>
      <button onClick={handlePrint}>Export PDF</button>
      <div ref={componentRef} style={{ width: "210mm", height: "297mm" }}>
      {cvData && (
        <div>
          <h1>CV</h1>
          <h2>Informations Personnelles</h2>
          <ul>
            <li>Nom : {cvData["Personal Information"]["name"]}</li>
            <li>Prénom : {cvData["Personal Information"]["surname"]}</li>
            <li>Date de Naissance : {cvData["Personal Information"]["dateBirth"]}</li>
            <li>Mail : {cvData["Personal Information"]["Mail"]}</li>
            <li>Téléphone : {cvData["Personal Information"]["Telephone"]}</li>
            <li>Adresse : {cvData["Personal Information"]["Adresse"]}</li>
            <li>Âge : {cvData["Personal Information"]["Age"]}</li>
            <li>Nationalité : {cvData["Personal Information"]["Nationality"]}</li>
          </ul>

          <h2>Qualifications</h2>
            <ul>
              {cvData["Qualifications"] &&
                cvData["Qualifications"].map((qualification, index) => (
                  <li key={index}>
                    Date: {qualification["Date"] || "N/A"}
                    {/* Le reste de vos éléments d'affichage pour les qualifications */}
                  </li>
                ))}
            </ul>

          <h2>Education</h2>
            <ul>
              {cvData["Education"] &&
                cvData["Education"].map((education, index) => (
                  <li key={index}>
                    Institution: {education["Institution"] || "N/A"}
                    Field: {education["Field"] || "N/A"}
                    Date: {education["Date"] || "N/A"}
                    Thesis: {education["Thesis"] || "N/A"}
                    <h3>Supervisors</h3>
                    <ul>
                      {education["Supervisor"] &&
                        education["Supervisor"].map((supervisor, index) => (
                          <li key={index}>
                            Name: {supervisor["Name"] || "N/A"}
                            Title: {supervisor["Title"] || "N/A"}
                          </li>
                        ))}
                    </ul>
                    Funding: {education["Funding"] || "N/A"}
                  </li>
                ))}
            </ul>

          <h2>Experience</h2>
            <ul>
              {cvData["Experience"] &&
                cvData["Experience"].map((experience, index) => (
                  <li key={index}>
                    {/* Affichez les détails de l'expérience ici */}
                  </li>
                ))}
            </ul>

          <h2>Publications</h2>
            <ul>
              {cvData["Publications"] &&
                cvData["Publications"].map((publication, index) => (
                  <li key={index}>
                    {/* Affichez les détails de la publication ici */}
                  </li>
                ))}
            </ul>

          <h2>Professional Affiliations</h2>
            <ul>
              {cvData["Professional Affiliations"] &&
                cvData["Professional Affiliations"].map((affiliation, index) => (
                  <li key={index}>
                    {/* Affichez les détails de l'affiliation ici */}
                  </li>
                ))}
            </ul>

          <h2>Honors/Awards/Grants</h2>
            <ul>
              {cvData["Honors/Awards/Grants"] &&
                cvData["Honors/Awards/Grants"].map((award, index) => (
                  <li key={index}>
                    {/* Affichez les détails de la récompense ici */}
                  </li>
                ))}
            </ul>
        </div>
      )}
    </div>
    </div>
  );
}
