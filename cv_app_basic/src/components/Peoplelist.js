
import React from 'react';
import PersonComponent from './PersonComponent'; 
import jsonData from '../test_data/jsonData.json';

export default function Peoplelist(){
  return (
    <div>
      <h1>People List</h1>
      {jsonData.people.map((person, index) => (
        <PersonComponent key={index} {...person} />
      ))}
    </div>
  );
}

