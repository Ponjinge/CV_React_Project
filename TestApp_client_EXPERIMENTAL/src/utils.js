import * as Realm from "realm-web";
export const toggleBoolean = (prev) => !prev;

const isValidArrayIndex = (arr, idx) => {
  return !(idx < 0 || idx >= arr.length);
};

export function addValueAtIndex(arr, idx, value) {
  if (!isValidArrayIndex(arr, idx) && idx !== arr.length) {
    throw new Error(`Cannot add value. Array index out of bounds.`);
  }
  return [...arr.slice(0, idx), value, ...arr.slice(idx)];
}

export function replaceValueAtIndex(arr, idx, newValue) {
  if (!isValidArrayIndex(arr, idx)) {
    throw new Error(`Cannot replace value. Array index out of bounds.`);
  }
  return [...arr.slice(0, idx), newValue, ...arr.slice(idx + 1)];
}

export function updateValueAtIndex(arr, idx, updater) {
  if (!isValidArrayIndex(arr, idx)) {
    throw new Error(`Cannot update value. Array index out of bounds.`);
  }
  return [...arr.slice(0, idx), updater(arr[idx]), ...arr.slice(idx + 1)];
}

export function removeValueAtIndex(arr, idx) {
  if (!isValidArrayIndex(arr, idx)) {
    throw new Error(`Cannot remove value. Array index out of bounds.`);
  }
  return [...arr.slice(0, idx), ...arr.slice(idx + 1)];
}

export const createObjectId = () => {
  return new Realm.BSON.ObjectId()
};

export const getCVId = (cv) => {
  if (cv._id instanceof Realm.BSON.ObjectId) {
    return cv._id.toHexString();
  }
  return cv._id
};

export const isSameCV = (cv1, cv2) =>
  getCVId(cv1) === getCVId(cv2);

export const getCVIndex = (cvs, cv) => {
  const idx = cvs.findIndex((t) => isSameCV(t, cv));
  return idx >= 0 ? idx : null;
}
