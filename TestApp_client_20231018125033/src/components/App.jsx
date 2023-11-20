import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { WelcomePage } from "./WelcomePage";
import { CVItemsPage } from "./CVItemsPage";
import { CVLoadPage } from "./CVLoadPage";
import { CVLoadPageTest } from "./CVLoadPageTest";
import { AppProvider, useApp } from "./RealmApp";
import { ThemeProvider } from "./Theme";
import { AppName } from "./AppName";
import atlasConfig from "../atlasConfig.json";
import "./App.css";
import { CVPresentation } from "./CVPresentation";
const { appId } = atlasConfig;

export default function ProvidedApp() {
  return (
    <ThemeProvider>
      <AppProvider appId={appId}>
        <App />
      </AppProvider>
    </ThemeProvider>
  );
}

function App() {
  const { currentUser, logOut } = useApp();
   const [page, setPage] = React.useState("CVItemsPage");
   const handlePageChange = () => {
     if (page === "CVItemsPage") {
       setPage("CVLoadPage");
     } else {
       setPage("CVItemsPage");
     }
   }
  return (
    <div className="App">
      
      {/* This is the app bar that will be displayed at the top of the page */}
      <AppBar position="sticky">
        <Toolbar>
          <AppName />
          {currentUser ? (
            
            <><Button
              variant="contained"
              color="secondary"
              onClick={async () => {
                handlePageChange();
              } }
            >
              <Typography variant="button">Switch Page</Typography>
            </Button><Button
              variant="contained"
              color="secondary"
              onClick={async () => {
                await logOut();
              } }
            >
                <Typography variant="button">Log Out</Typography>
              </Button></>


          ) : null}
        </Toolbar>
      </AppBar>
      {/* If a user is signed in, load the CV Item Page. Else load the sign up/log in page */}
      {/* We can add another conditional statement here to render the CV visualizer here*/}
      {/* or add a button on the CV Composition page  */}
      {currentUser ?(page === "CVItemsPage" ? <CVItemsPage /> : <CVPresentation/>) : <WelcomePage />}
    </div>
  );
}
