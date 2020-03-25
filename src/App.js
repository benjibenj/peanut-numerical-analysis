import React from "react";
import BigRouter from "./router/BigRouter";
import TopBar from "./components/TopBar.jsx";

import styled from "styled-components";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import {Colors} from "./rules";

library.add(fab, fas, far);

const App = () => {
  return (
    <Style>
      <TopBar />
      <BigRouter />
    </Style>
  );
};

const Style = styled("div")`
  a {
    color: ${Colors.primary.ocean.default};
  }
`;

export default App;