import React from "react";
import styled from "styled-components";

import PizzaMaker from "./components/PizzaMaker";
import PizzaTotal from "./components/PizzaTotal";

const App = () => (
  <div>
    <div>
      <h1>
        <span role="img" aria-label="Hi">
          👋
        </span>{" "}
        Welcome to PizzaMaker!
      </h1>
      <p>
        To get started making your own{" "}
        <span role="img" aria-label="pizza">
          🍕
        </span>
        , select a size below:
      </p>
    </div>
    <Container>
      <PizzaMaker />
      <PizzaTotal />
    </Container>
  </div>
);

const Container = styled.div`
  align-items: flex-start;
  display: flex;
`;

export default App;
