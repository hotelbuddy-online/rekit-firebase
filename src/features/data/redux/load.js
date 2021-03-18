import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { DATA_LOAD } from "./constants";
import {
  firestore,
  // getData,
  // query2arr,
  query2obj
} from "../../../common/firebase";

export function load(props) {
  const { collection, docId, collection2, docId2, live } = props;
  return dispatch => {
    if (docId) {
      var docRef = firestore.collection(collection).doc(docId);
      if (collection2) docRef = docRef.collection(collection2);
      if (docId2) docRef = docRef.doc(docId2);
      if (live)
        docRef.onSnapshot(doc => {
          dispatch({
            type: DATA_LOAD,
            collection: collection2 ? collection2 : collection,
            docId: docId2 ? docId2 : docId,
            payload: doc.data()
          });
        });
      else
        docRef.get().then(doc => {
          dispatch({
            type: DATA_LOAD,
            collection: collection2 ? collection2 : collection,
            docId: docId2 ? docId2 : docId,
            payload: doc.data()
          });
        });
    } else
      firestore
        .collection(collection)
        .get()
        .then(query => {
          // var doc = getData(query);
          dispatch({
            type: DATA_LOAD,
            collection: collection,
            // docId: docId,
            payload: query2obj(query)
          });
        });
  };
}

export function useLoad() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(load(...params)), [
    dispatch
  ]);
  return { load: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case DATA_LOAD:
      return action.docId
        ? {
            ...state,
            [action.collection]: {
              ...state[action.collection],
              [action.docId]: action.payload
            }
          }
        : {
            ...state,
            [action.collection]: {
              ...state[action.collection],
              ...action.payload
            }
          };

    default:
      return state;
  }
}