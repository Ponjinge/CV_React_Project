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
  // Set up a list of cvs in state
  const app = useApp();
  const [cvs, setCVs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Get a client object for the cv item collection
  const cvItemCollection = useCollection({
    cluster: dataSourceName,
    db: "CV",
    collection: "Item",
  });

  // Fetch all cvs on load and whenever our collection changes (e.g. if the current user changes)
  React.useEffect(() => {
    let shouldUpdate = true;
    const fetchCVs = cvItemCollection.find({})
    if (shouldUpdate) {
      fetchCVs.then((fetchedCVs) => {
        setCVs(fetchedCVs);
        setLoading(false);
      });
    }
    return () => {
      shouldUpdate = false;
    }
  }, [cvItemCollection]);

  // Use a MongoDB change stream to reactively update state when operations succeed
  useWatch(cvItemCollection, {
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

  // Given a draft cv, format it and then insert it
  const saveCV = async (draftCV) => {
    if (draftCV.name) {
      draftCV.owner_id = app.currentUser.id;
      try {
        await cvItemCollection.insertOne(draftCV);
      } catch (err) {
        if (err.error.match(/^Duplicate key error/)) {
          console.warn(
            `The following error means that this app tried to insert a cv multiple times (i.e. an existing cv has the same _id). In this app we just catch the error and move on. In your app, you might want to debounce the save input or implement an additional loading state to avoid sending the request in the first place.`
          );
        }
        console.error(err);
      }
    }
  };

  // Toggle whether or not a given cv is Selected
  const toggleCV = async (cv) => {
    await cvItemCollection.updateOne(
      { _id: cv._id },
      { $set: { isSelected: !cv.isSelected } }
    );
  };

  // Delete a given cv
  const deleteCV = async (cv) => {
    await cvItemCollection.deleteOne({ _id: cv._id });
  };

  return {
    loading,
    cvs,
    saveCV,
    toggleCV,
    deleteCV,
  };
}
