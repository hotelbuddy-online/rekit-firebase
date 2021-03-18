import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  DATA_SAVE,
} from './constants';
import { firestore } from "../../../common/firebase";

export function save(props) {
  const { collection, doc, data } = props;
  firestore
    .collection(collection)
    .doc(doc)
    .set(data);
  return {
    type: DATA_SAVE,
    payload: data,
    doc: doc,
  };
}

export function useSave() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(save(...params)), [dispatch]);
  return { save: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case DATA_SAVE:
      return {
        ...state,
      };

    default:
      return state;
  }
}