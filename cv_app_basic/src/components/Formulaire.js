import React from "react";

export default function Formulaire({ item }) {

  return (
    <p>
      <p>
        <div>{item.name}</div>
        <div>{item.research.length} Articles</div>
      </p>
    </p>
  );
}
