import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Papa from "papaparse";
import './CVLoadPage.css';
import realmConfig from "../atlasConfig.json";
import { App, Credentials } from "realm-web";


export function CVLoadPageTest() {
  const [cvData, setCvData] = useState(null);
  const [publicationsData, setPublicationsData] = useState(null);
  const [showPublications, setShowPublications] = useState(false);
  const componentRef = useRef();
  const csvLinkRef = useRef();

  const handlePrint = () => {
    if (componentRef.current) {
      const pdfWidth = 210;
      const pdfHeight = 297;
      componentRef.current.classList.add("pdf-small-text");
      html2canvas(componentRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        componentRef.current.classList.remove("pdf-small-text");
        pdf.save(`CV_${cvData["Personal Information"]["name"]}.pdf`);
        document.querySelector(".hide-in-pdf").classList.remove("hidden");
      });
      document.querySelector(".hide-in-pdf").classList.add("hidden");
    }
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

  useEffect(() => {
    const fetchDataFromDatabase = async () => {
      const app = new App(realmConfig.appId);

      try {
        // Connexion avec les informations d'identification appropriées (par exemple, e-mail/mot de passe)
        const credentials = Credentials.emailPassword("tristan.rebeyrol@gmail.com", "oui123");
        const user = await app.logIn(credentials);

        // Obtention de l'ID de l'utilisateur connecté
        const userId = user.id;

        // Connexion à la base de données MongoDB avec le client Mongo
        const mongodb = app.currentUser.mongoClient("mongodb-atlas");
        const cvDataCollection = mongodb.db("cvdb").collection("CVs");

        // Requête pour récupérer les données
        const data = await cvDataCollection.find({}).toArray();
        setCvData(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchDataFromDatabase();
    readCSV();
  }, []);

  const togglePublications = () => {
    setShowPublications(!showPublications);
  };

  //console.log(cvData);
  return (
    <div>
      <button onClick={handlePrint}>Télécharger</button>
      <div ref={componentRef} style={{ width: "210mm", height: "297mm" }}>
        {cvData && (
          <div>
            <h1>CV {cvData["Personal Information"]["surname"]}</h1>
            <h2>Informations Personnelles</h2>
            <ul>
              <li>Nom : {cvData["Personal Information"]["name"]}</li>
              <li>Prénom : {cvData["Personal Information"][""]}</li>
              <li>Date de Naissance : {cvData["Personal Information"]["dateBirth"]}</li>
              <li>Mail : {cvData["Personal Information"]["Mail"]}</li>
              <li>Téléphone : {cvData["Personal Information"]["Telephone"]}</li>
              <li>Adresse : {cvData["Personal Information"]["Adresse"]}</li>
              <li>Âge : {cvData["Personal Information"]["Age"]}</li>
              <li>Nationalité : {cvData["Personal Information"]["Nationality"]}</li>
            </ul>

            <h2>Qualifications</h2>
            {cvData["Qualifications"] && cvData["Qualifications"].map((qualification, index) => (
              qualification["Date"] && (
                <ul key={index}>
                  <li>Date: {qualification["Date"]}</li>

                </ul>
              )
            ))}

            <h2>Education</h2>
            {cvData["Education"] && cvData["Education"].map((education, index) => (
              education["Institution"] && (
                <ul key={index}>
                  <li>Institution: {education["Institution"]}</li>
                  <li>Field: {education["Field"]}</li>
                  <li>Date: {education["Date"]}</li>
                  <li>Thesis: {education["Thesis"]}</li>
                  <h3>Supervisors</h3>
                  <ul>
                    {education["Supervisor"] && education["Supervisor"].map((supervisor, sIndex) => (
                      supervisor["Name"] && (
                        <li key={sIndex}>
                          Name: {supervisor["Name"]}
                          Title: {supervisor["Title"]}
                        </li>
                      )
                    ))}
                  </ul>
                  <li>Funding: {education["Funding"]}</li>
                </ul>
              )
            ))}

            <h2>Experience</h2>
            {cvData["Experience"] && cvData["Experience"].map((experience, index) => (
              experience["Details"] && (
                <ul key={index}>
                </ul>
              )
            ))}

            <h2>Publications</h2>
            {publicationsData && (
              <table>
                <thead>
                  <tr>
                    <th>Auteurs</th>
                    <th>Titre</th>
                    <th>Publication</th>
                    <th>Volume</th>
                    <th>Nombre</th>
                    <th>Page</th>
                    <th>Année</th>
                    <th>Editeur</th>
                  </tr>
                </thead>
                <tbody>
                  {publicationsData.slice(0, showPublications ? publicationsData.length : 2).map((publication, index) => (
                    <tr key={index}>
                      <td>{publication["Authors"] || ""}</td>
                      <td>{publication["Title"] || ""}</td>
                      <td>{publication["Publication"] || ""}</td>
                      <td>{publication["Volume"] || ""}</td>
                      <td>{publication["Number"] || ""}</td>
                      <td>{publication["Pages"] || ""}</td>
                      <td>{publication["Year"] || ""}</td>
                      <td>{publication["Publisher"] || ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {publicationsData && publicationsData.length > 2 && (
              <button onClick={togglePublications}>
                {showPublications ? "Masquer Publications" : "Afficher toutes les publications"}
              </button>
            )}
            <a
              ref={csvLinkRef}
              className="hide-in-pdf"
              style={{ display: "none" }}
              href="/citations.csv"
              download={`CV_${cvData["Personal Information"]["surname"]}.csv`}
            ></a>
          </div>
        )}

        <h2>Professional Affiliations</h2>
        {cvData && cvData["Professional Affiliations"] && cvData["Professional Affiliations"].map((affiliation, index) => (
          affiliation["Details"] && (
            <ul key={index}>
            </ul>
          )
        ))}

        <h2>Honors/Awards/Grants</h2>
        {cvData && cvData["Honors/Awards/Grants"] && cvData["Honors/Awards/Grants"].map((award, index) => (
          award["Details"] && (
            <ul key={index}>
            </ul>
          )
        ))}
      </div>
    </div>
  );
}
