
import React from 'react';
import PersonComponent from './PersonComponent'; 
import jsonData from '../test_data/jsonData.json';

const Peoplelist = () => {
  return (
    <div>
      <h1>People List</h1>
      {jsonData.people.map((person, index) => (
        <PersonComponent key={index} {...person} />
      ))}
    </div>
  );
};

export default Peoplelist;
