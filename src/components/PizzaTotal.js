import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";

import { getPizzas } from "../selectors";
import PizzaSubTotal from "./PizzaSubtotal";

const PizzaTotal = ({ pizzas }) => {
  const selectedPizzas = Object.keys(pizzas).map((pizza, i) => {
    const { name, basePrice, toppingsByName } = pizzas[pizza];
    return (
      <PizzaSubTotal
        key={i}
        name={name}
        price={basePrice}
        toppings={Object.keys(toppingsByName)
          .map(topping => ({
            ...toppingsByName[topping]
          }))
          .filter(topping => topping.selected)}
      />
    );
  });

  return (
    <Container>
      <h3>
        <span role="img" aria-label="Total">
          💰
        </span>{" "}
        Your Total
      </h3>
      <ul>{selectedPizzas}</ul>
      <h3>TOTAL: ${getTotal(pizzas)}</h3>
    </Container>
  );
};

const getTotal = pizzas =>
  Object.keys(pizzas)
    .reduce((acc, pizza) => {
      const { toppingsByName } = pizzas[pizza];
      const toppingsPrice = Object.keys(toppingsByName)
        .map(topping => ({ ...toppingsByName[topping] }))
        .filter(topping => topping.selected)
        .reduce((acc, topping) => acc + topping.price, 0);

      return acc + pizzas[pizza].basePrice + toppingsPrice;
    }, 0)
    .toFixed(2);

const mapStateToProps = state => {
  const pizzas = getPizzas(state);
  return { pizzas };
};

const Container = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-left: auto;
`;

PizzaTotal.propTypes = {
  pizzas: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(PizzaTotal);
