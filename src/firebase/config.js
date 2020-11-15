import firebase, { firestore } from "firebase";
import "firebase/auth";
import "firebase/firestore";

const {
  REACT_APP_FIREBASE_KEY,
  REACT_APP_FIREBASE_DOMAIN,
  REACT_APP_FIREBASE_DATABSE_URL,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
} = process.env;

const config = {
  apiKey: REACT_APP_FIREBASE_KEY,
  authDomain: REACT_APP_FIREBASE_DOMAIN,
  databaseURL: REACT_APP_FIREBASE_DATABSE_URL,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export const createDoc = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userDoc = firestore().doc(`students/${userAuth.uid}`);
  const snapshot = await userDoc.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userDoc.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
      await userDoc.collection("profileDetails").doc("details").set({});
      await userDoc.collection("profileDetails").doc("documents").set({});
      console.log("DONE");
    } catch (e) {
      console.log(e);
    }
  }
  return userDoc;
};
export const createAgent = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userDoc = firestore().doc(`Agents/${userAuth.uid}`);
  const snapshot = await userDoc.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userDoc.set({
        email,
        createdAt,
        agent: true,
        displayName: displayName || additionalData,
      });
      console.log("DONE");
    } catch (e) {
      console.log(e);
    }
  }
  return userDoc;
};

export const signIn_Google = () => {
  auth.signInWithPopup(provider);
};

export const agent_signIn_Google = () => {
  return auth
    .signInWithPopup(provider)
    .then((u) => {
      console.log(u);
      createAgent(u.user);
    })
    .catch((e) => {
      return e;
    });
};

export default firebase;
