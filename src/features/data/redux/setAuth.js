// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { DATA_SET_AUTH } from "./constants";
import { firestore, auth } from "../../../common/firebase";
// import { fetchTourOperatorData } from '../../tour-operators/redux/actions';

export function setAuth(params) {
  const { authResult } = params;
  return dispatch => {
    // console.log('set auth', params)

    if (authResult && authResult.uid) {
      // display user info to console
      auth.currentUser.getIdTokenResult(true).then(result => {
        // console.log('claims result', result)
        const { claims } = result;
        firestore
          .collection("users")
          .doc(authResult.uid)
          .set(
            {
              // profile: authResult.profile
              profile: {
                name: claims.name ? claims.name : null,
                email: claims.email ? claims.email : null,
                emailVerified: claims.email_verified
                  ? claims.email_verified
                  : null,
                // phoneNumber: authResult.phoneNumber,
                photoUrl: claims.picture ? claims.picture : null,
                language: claims.locale ? claims.locale : "en"
              }
            },
            { merge: true }
          );
      });
    }
    dispatch({
      type: DATA_SET_AUTH,
      payload: authResult
    });
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DATA_SET_AUTH:
      if (action.payload) {
        return {
          ...state,
          auth: action.payload
        };
      }

      return {
        ...state,
        auth: null
      };

    default:
      return state;
  }
}