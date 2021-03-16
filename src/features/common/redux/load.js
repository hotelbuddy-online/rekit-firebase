import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  COMMON_LOAD,
} from './constants';
import { firestore } from '../../../common/firebase';

export function load() {
  return dispatch=> {
// firestore
return {    type: COMMON_LOAD,}
  };
}

export function useLoad() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(load(...params)), [dispatch]);
  return { load: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_LOAD:
      return {
        ...state,
      };

    default:
      return state;
  }
}
