import { SELECT_PIZZA_SIZE, SELECT_TOPPING } from "./actionTypes";

export const selectPizzaSize = ({
  name,
  basePrice,
  maxToppings,
  toppings
}) => ({
  type: SELECT_PIZZA_SIZE,
  payload: {
    name,
    basePrice,
    maxToppings,
    toppings
  }
});

export const selectTopping = ({ name, topping }) => ({
  type: SELECT_TOPPING,
  payload: {
    name,
    topping
  }
});
