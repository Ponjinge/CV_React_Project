import React from "react";
import { createObjectId } from "../utils";

export function useDraftCVs() {
  const [drafts, setDrafts] = React.useState([]);

  const createDraftCV = () => {
    const draftCV = {
      _id: createObjectId(),
      name: "",
      isSelected: false,
    };
    setDrafts((d) => [...d, draftCV]);
  };

  const setDraftCVName = (draft, name) => {
    setDrafts((oldDrafts) => {
      const idx = oldDrafts.findIndex((d) => d._id === draft._id);
      return [
        ...oldDrafts.slice(0, idx),
        { ...oldDrafts[idx], name },
        ...oldDrafts.slice(idx + 1),
      ];
    });
  };

  const deleteDraftCV = (draft) => {
    setDrafts((oldDrafts) => {
      const idx = oldDrafts.findIndex((d) => d._id === draft._id);
      return [...oldDrafts.slice(0, idx), ...oldDrafts.slice(idx + 1)];
    });
  };

  return {
    draftCVs: drafts,
    createDraftCV,
    setDraftCVName,
    deleteDraftCV,
  };
}
