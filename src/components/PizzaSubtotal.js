import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const PizzaSubtotal = ({ name, price, toppings }) => (
  <div>
    <PizzaSize>{`${name}: $${price}`}</PizzaSize>
    <ul>
      {toppings.map(topping => (
        <Topping key={topping.name}>{`${topping.name}: $${topping.price.toFixed(
          2
        )}`}</Topping>
      ))}
    </ul>
  </div>
);

const PizzaSize = styled.h4`
  text-align: right;
`;

const Topping = styled.li`
  list-style: none;
  text-align: right;
`;

PizzaSubtotal.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  toppings: PropTypes.array.isRequired
};

export default PizzaSubtotal;
