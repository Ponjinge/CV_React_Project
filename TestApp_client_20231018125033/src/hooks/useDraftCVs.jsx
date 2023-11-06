import React from "react";
import { createObjectId } from "../utils";

export function useDraftCVs() {
  const [drafts, setDrafts] = React.useState([]);


  //Add elements here to add more possible fields to the CV form
  const createDraftCV = () => {
    const draftCV = {
      _id: createObjectId(),
      first_name: "",
      last_name: "",
      nationality: "",
      date_of_birth: "",
      email : "",
      phone_number : "",
      address : "",
      isSelected: false,
    };  
    setDrafts((d) => [...d, draftCV]);
  };
//These functions are called in DraftCVItem.jsx and have been made generic to support adding more fields to the CV form
  const setDraftCVElement = (draft, name, value) => {
    setDrafts((oldDrafts) => {
      const idx = oldDrafts.findIndex((d) => d._id === draft._id);
      return [
        ...oldDrafts.slice(0, idx),
        { ...oldDrafts[idx], [name]:value },
        ...oldDrafts.slice(idx + 1),
      ];
    });
  };

// This function may need to be modified to support adding more fields to the CV form 
  const deleteDraftCVElement = (draft) => {
    setDrafts((oldDrafts) => {
      const idx = oldDrafts.findIndex((d) => d._id === draft._id);
      return [...oldDrafts.slice(0, idx), ...oldDrafts.slice(idx + 1)];
    });
  };

  return {
    draftCVs: drafts,
    createDraftCV,
    setDraftCVElement,
    deleteDraftCVElement,
  };
}
