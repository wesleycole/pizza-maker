import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { selectPizzaSize } from "../actions";

const PizzaSize = ({
  name,
  basePrice,
  maxToppings,
  toppings,
  selectPizzaSize
}) => {
  return (
    <button
      type="button"
      onClick={() =>
        selectPizzaSize({
          name,
          basePrice,
          maxToppings,
          toppings
        })
      }
    >{`${name}: $${basePrice}`}</button>
  );
};

PizzaSize.propTypes = {
  name: PropTypes.string.isRequired,
  basePrice: PropTypes.number.isRequired
};

export default connect(
  null,
  { selectPizzaSize }
)(PizzaSize);
