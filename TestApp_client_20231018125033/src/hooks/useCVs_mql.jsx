import React from "react";
import { useWatch } from "./useWatch";
import { useCollection } from "./useCollection";
import { useApp } from "../components/RealmApp";
import atlasConfig from "../atlasConfig.json";
import {
  addValueAtIndex,
  replaceValueAtIndex,
  updateValueAtIndex,
  removeValueAtIndex,
  getCVIndex,
} from "../utils";

const { dataSourceName } = atlasConfig;

export function useCVs() {
  // Set up a list of CVs in state
  const app = useApp();
  const [CVs, setCVs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Get a client object for the CV item collection
  const CVItemCollection = useCollection({
    cluster: dataSourceName,
    db: "CV",
    collection: "Item",
  });

  // Fetch all CV items on load and whenever our collection changes (e.g. if the current user changes)
  React.useEffect(() => {
    let shouldUpdate = true;
    const fetchCVs = CVItemCollection.find({})
    if (shouldUpdate) {
      fetchCVs.then((fetchedCVs) => {
        setCVs(fetchedCVs);
        setLoading(false);
      });
    }
    return () => {
      shouldUpdate = false;
    }
  }, [CVItemCollection]);

  // Use a MongoDB change stream to reactively update state when operations succeed
  useWatch(CVItemCollection, {
    onInsert: (change) => {
      setCVs((oldCVs) => {
        if (loading) {
          return oldCVs;
        }
        const idx =
          getCVIndex(oldCVs, change.fullDocument) ?? oldCVs.length;
        if (idx === oldCVs.length) {
          return addValueAtIndex(oldCVs, idx, change.fullDocument);
        } else {
          return oldCVs;
        }
      });
    },
    onUpdate: (change) => {
      setCVs((oldCVs) => {
        if (loading) {
          return oldCVs;
        }
        const idx = getCVIndex(oldCVs, change.fullDocument);
        return updateValueAtIndex(oldCVs, idx, () => {
          return change.fullDocument;
        });
      });
    },
    onReplace: (change) => {
      setCVs((oldCVs) => {
        if (loading) {
          return oldCVs;
        }
        const idx = getCVIndex(oldCVs, change.fullDocument);
        return replaceValueAtIndex(oldCVs, idx, change.fullDocument);
      });
    },
    onDelete: (change) => {
      setCVs((oldCVs) => {
        if (loading) {
          return oldCVs;
        }
        const idx = getCVIndex(oldCVs, { _id: change.documentKey._id });
        if (idx >= 0) {
          return removeValueAtIndex(oldCVs, idx);
        } else {
          return oldCVs;
        }
      });
    },
  });

  // Given a draft CV, format it and then insert it
  const saveCV = async (draftCV, CV_element) => {
    if (draftCV[CV_element]) {
      draftCV.owner_id = app.currentUser.id;
      try {
        await CVItemCollection.insertOne(draftCV);
      } catch (err) {
        if (err.error.match(/^Duplicate key error/)) {
          console.warn(
            `The following error means that this app tried to insert a CV multiple times (i.e. an existing CV has the same _id). In this app we just catch the error and move on. In your app, you might want to debounce the save input or implement an additional loading state to avoid sending the request in the first place.`
          );
        }
        console.error(err);
      }
    }
  };

  // Toggle whether or not a given CV is complete
  const toggleCV = async (CV) => {
    await CVItemCollection.updateOne(
      { _id: CV._id },
      { $set: { isComplete: !CV.isComplete } }
    );
  };

  // Delete a given CV
  const deleteCV = async (CV) => {
    await CVItemCollection.deleteOne({ _id: CV._id });
  };

  return {
    loading,
    CVs,
    saveCV,
    toggleCV,
    deleteCV,
  };
}




//Need to review this code, notably the save function which checks for Cv.name and is not applicable to every field

