import React from "react";
import { createObjectId } from "../utils";

export function useDraftTodos() {
  const [drafts, setDrafts] = React.useState([]);

  const createDraftTodo = () => {
    const draftTodo = {
      _id: createObjectId(),
      name: "",
      isSelected: false,
    };
    setDrafts((d) => [...d, draftTodo]);
  };

  const setDraftTodoName = (draft, name) => {
    setDrafts((oldDrafts) => {
      const idx = oldDrafts.findIndex((d) => d._id === draft._id);
      return [
        ...oldDrafts.slice(0, idx),
        { ...oldDrafts[idx], name },
        ...oldDrafts.slice(idx + 1),
      ];
    });
  };

  const deleteDraftTodo = (draft) => {
    setDrafts((oldDrafts) => {
      const idx = oldDrafts.findIndex((d) => d._id === draft._id);
      return [...oldDrafts.slice(0, idx), ...oldDrafts.slice(idx + 1)];
    });
  };

  return {
    draftTodos: drafts,
    createDraftTodo,
    setDraftTodoName,
    deleteDraftTodo,
  };
}
