import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import PizzaTopping from "./PizzaTopping";

const PizzaSizes = {
  small: "SMALL",
  medium: "MEDIUM",
  large: "LARGE"
};

const PizzaToppings = ({ selectedPizzaSize }) => (
  <Query
    query={GET_PIZZA_SIZE}
    variables={{ name: PizzaSizes[selectedPizzaSize] }}
    skip={!selectedPizzaSize}
  >
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return `Error!: ${error}`;
      if (data) {
        const { pizzaSizeByName } = data;
        return (
          <ul>
            {pizzaSizeByName.toppings.map(({ topping, defaultSelected }) => (
              <PizzaTopping
                key={topping.name}
                name={pizzaSizeByName.name}
                topping={topping}
                selected={defaultSelected}
              />
            ))}
          </ul>
        );
      }

      return <p>Select a pizza size to customize your toppings.</p>;
    }}
  </Query>
);

const GET_PIZZA_SIZE = gql`
  query PizzaSizeByName($name: PizzaSizes!) {
    pizzaSizeByName(name: $name) {
      name
      toppings {
        defaultSelected
        topping {
          name
          price
        }
      }
      maxToppings
    }
  }
`;

PizzaToppings.propTypes = {
  selectedPizzaSize: PropTypes.string.isRequired
};

export default PizzaToppings;
