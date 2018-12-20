import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { selectTopping } from "../actions";
import { getPizzas } from "../selectors";

const PizzaTopping = ({ name, topping, selectedPizzas, selectTopping }) => {
  const pizza = Object.keys(selectedPizzas)
    .map(name => selectedPizzas[name])
    .find(pizza => pizza.name === name);
  const toppingIsSelected =
    pizza && pizza.toppingsByName[topping.name].selected;
  return (
    <li>
      <label htmlFor={`topping-${topping.name}`}>
        <input
          id={`topping-${topping.name}`}
          type="checkbox"
          checked={toppingIsSelected}
          onChange={() => selectTopping({ name, topping })}
        />
        {`${topping.name}: $${topping.price.toFixed(2)}`}
      </label>
    </li>
  );
};

const mapStateToProps = state => {
  const selectedPizzas = getPizzas(state);
  return { selectedPizzas };
};

PizzaTopping.propTypes = {
  name: PropTypes.string.isRequired,
  topping: PropTypes.object.isRequired,
  selectTopping: PropTypes.func.isRequired,
  selectedPizzas: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { selectTopping }
)(PizzaTopping);
