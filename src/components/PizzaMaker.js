import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { connect } from "react-redux";

import { getCurrentPizzaSize } from "../selectors";
import PizzaSize from "./PizzaSize";
import PizzaToppings from "./PizzaToppings";

const PizzaMaker = ({ currentPizzaSize }) => (
  <Query query={PizzaQuery}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error)
        return (
          <p>
            Error...{" "}
            <span role="img" aria-label="sad, no pizza">
              😞🚫🍕
            </span>
          </p>
        );

      return (
        <div>
          <h3>
            <span role="img" aria-label="Pizza">
              🍕
            </span>{" "}
            size:
          </h3>
          {data.pizzaSizes.map(({ name, basePrice, toppings, maxToppings }) => (
            <PizzaSize
              key={name}
              name={name}
              basePrice={basePrice}
              maxToppings={maxToppings}
              toppings={toppings}
            />
          ))}
          <PizzaToppings selectedPizzaSize={currentPizzaSize} />
        </div>
      );
    }}
  </Query>
);

const PizzaQuery = gql`
  {
    pizzaSizes {
      name
      basePrice
      maxToppings
      toppings {
        defaultSelected
        topping {
          name
          price
        }
      }
    }
  }
`;

const mapStateToProps = state => {
  const currentPizzaSize = getCurrentPizzaSize(state);
  return { currentPizzaSize };
};

PizzaMaker.propTypes = {
  currentPizzaSize: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(PizzaMaker);
