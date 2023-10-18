

import React from 'react';

export default function PersonComponent({ name, title, research }){
  return (
    <div>
      <h2>{name}</h2>
      <p>Title: {title}</p>
      <h3>Research Pieces:</h3>
      <ul>
        {research.map((item, index) => (
          <li key={index}>
            <strong>{item.title}</strong> ({item.year})
          </li>
        ))}
      </ul>
    </div>
  );
}


