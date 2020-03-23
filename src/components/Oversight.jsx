import React from "react";
import styled from "styled-components";
import BigContainer from "../containers/BigContainer";

import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const Oversight = ({user, signOut, signInWithGoogle}) => {
  return (
    <BigContainer>
      <LogIn>
        {
          user
            ? <p>Hello, {user.displayName}</p>
            : <p>Please sign in.</p>
        }
        {
          user
            ? <button onClick={signOut}>Sign out</button>
            : <button onClick={signInWithGoogle}>Sign in with Google</button>
        }
      </LogIn>
      <Assignements>
        {user && (
          <p>Assignements in construction</p>
        )}
      </Assignements>
    </BigContainer>
  );
};

const LogIn = styled("div")`
  
`;


const Assignements = styled("div")``;


export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(Oversight);
