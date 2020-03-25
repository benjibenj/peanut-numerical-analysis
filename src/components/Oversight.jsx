import React from "react";
import styled from "styled-components";
import BigContainer from "../containers/BigContainer";
import CommentContainer from "../containers/CommentContainer";
import Disqus from "disqus-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import firebaseConfig from "../firebaseConfig";
import { BorderRadius, Colors, Spacing, Typography } from "../rules";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const Oversight = ({ user, signOut, signInWithGoogle }) => {
  const authorizedUsers = ["benjamin.vaysse@gmail.com", "", ""];
  const disqusShortname = "peanut-1"; // found in your Disqus.com dashboard
  const disqusConfig = {
    url: "http://localhost:3000", //this.props.pageUrl
    identifier: "oversight-page", //this.props.uniqueId
    title: "Oversight", //this.props.title
  };

  return (
    <React.Fragment>
      <Title>Project Oversight</Title>
      <BigContainer>
        {!user && (
          <React.Fragment>
            <p>
              You must be logged-in and authorized to have access to this page.
            </p>
            <Button onClick={signInWithGoogle}>
              Sign in with Google
              <FontAwesomeIcon icon={["fab", "google"]} />
            </Button>
          </React.Fragment>
        )}
        {user && !authorizedUsers.includes(user.email) && (
          <React.Fragment>
            <p>You don't have permission to view this page</p>
            <p>
              If you wish to view this page, send an email with a valid reason{" "}
              <a href={"mailto:benjamin.vaysse@gmail.com"}>here</a>{" "}
            </p>
          </React.Fragment>
        )}
        <Assignements>
          {user && authorizedUsers.includes(user.email) && (
            <a
              href={
                "https://drive.google.com/drive/folders/1rLZAqN2O43AShqTViEpLd-FTJTcw_swr?usp=sharing"
              }
            >
              See assignements
            </a>
          )}
        </Assignements>
      </BigContainer>
      <CommentContainer>
        <Disqus.DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        />
      </CommentContainer>
      {user && (
        <User>
          <p>Signed-in as {user.displayName}.</p>
          <Button onClick={signOut}>
            Sign out
            <FontAwesomeIcon icon={["fas", "sign-out-alt"]} />
          </Button>
        </User>
      )}
    </React.Fragment>
  );
};

const Button = styled("button")`
  padding: ${Spacing.sm} ${Spacing.lg};
  border: 1px solid ${Colors.primary.tan.default};
  border-radius: ${BorderRadius.lg};
  cursor: pointer;
  svg {
    margin-left: ${Spacing.sm};
    margin-right: -${Spacing.xs};
  }
`;

const Title = styled("div")`
  font-size: ${Typography.title.fontSize};
  margin: ${Spacing.xl} ${Spacing.xxl} ${Spacing.xl};
`;

const User = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${Spacing.xl} ${Spacing.xxl} ${Spacing.xl};
`;

const Assignements = styled("div")``;

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(Oversight);
