import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/messaging'; 
import 'firebase/storage';
var config = require('../config/firestore_config.js').default;
 
try {
  firebase.initializeApp(config);
} catch (error) {
  console.warn('already initialized firebase');
  // just calling from many different action creators
  // console.error('error starting firebase:', error)
}

export default firebase;

//storage
// Get a reference to the storage service, which is used to create references in your storage bucket
var myStorage = firebase.storage();
export const storage = myStorage;

// Create a storage reference from our storage service
var storageRef = myStorage.ref();
// Create a child reference
var myMusicRef = storageRef.child('music');
export const musicRef = myMusicRef;

//firestore
var myFirestore = firebase.firestore();
myFirestore.enablePersistence().catch(function(err) {
  if (err.code === 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
    console.error('Multiple tabs open, persistence can only be enabled in one tab at a a time.');
  } else if (err.code === 'unimplemented') {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
    console.error(
      'The current browser does not support all of the features required to enable persistence',
    );
  }
});

export const firestore = myFirestore;
export const messaging = firebase.messaging;

// Subsequent queries will use persistence, if it was enabled successfully

export function requestNotifications(actions, props) {
  var myMessaging;
  if (firebase.messaging.isSupported()) {
    myMessaging = firebase.messaging();
    myMessaging
      .requestPermission()
      .then(() => {
        console.log('have notification permission');
        return myMessaging.getToken();
      })
      .then(token => {
        console.log('token', token);
        actions.setNotifications({
          ...props,
          token: token,
        });
        return token;
      })
      .catch(err => {
        console.error('error in messaging', err);
        return null;
      });

    myMessaging.onMessage(payload => {
      console.log('onMessage', payload);
    });
  }
}

// export const requestNofications = requestNofications;
export const auth = firebase.auth();

// export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const obj2arr = obj => {
  return (obj ? Object.keys(obj) : []).map(key => {
    //converts object into array and sets $key to the lost key
    let item = obj[key];
    item.$key = key;
    return item;
  });
};

export const query2arr = querySnapshot => {
  let out = [];
  querySnapshot.forEach(function(doc) {
    let item = doc.data();
    item.$key = doc.id;
    out.push(item);
  });
  return out;
};

// async getMarker() {
//   const snapshot = await firebase.firestore().collection('events').get()
//   return snapshot.docs.map(doc => doc.data());
// }

export const query2obj = querySnapshot => {
  let out = {};
  querySnapshot.forEach(function(doc) {
    let item = doc.data();
    out[doc.id] = item;
  });
  return out;
};

export const getData = doc => {
  let item = doc.data();
  if (item) item.$key = doc.id;
  return item;
};

// function sendTokenToServer(token) {
//   console.log('sending token to server:', token)
// }

// function updateUIForPushEnabled(token) {
//   console.log('updateUIForPushEnabled:', token)
// }

// function updateUIForPushPermissionRequired(token) {
//   console.log('updateUIForPushPermissionRequired:', token)
// }

// function setTokenSentToServer(token) {
//   console.log('setTokenSentToServer:', token)
// }

// function showToken(token) {
//   console.log('showToken:', token)
// }