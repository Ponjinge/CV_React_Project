import React from "react";
import PeopleList from "./components/Peoplelist";
import Formulaire from "./components/Formulaire";
import jsonData from "./test_data/jsonData.json";
import Form from "./components/Form";
import MongoForm from "./components/MongoForm";
import "./App.css";

function App() {
  return (
    <div className="App">
      <p>App</p>
      <div>
        <PeopleList />
      </div>
      <div>
        <Formulaire item={jsonData.people[1]} />
      </div>
      <div>
      <h1>React Form</h1>
      <MongoForm />
      </div>
    </div>
  );
}

export default App;
