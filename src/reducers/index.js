import { SELECT_PIZZA_SIZE, SELECT_TOPPING } from "../actions/actionTypes";

const initialState = {
  pizzas: {},
  currentSelectedSize: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SELECT_PIZZA_SIZE: {
      const { name, toppings } = action.payload;

      return {
        ...state,
        pizzas: {
          ...state.pizzas,
          [name]: {
            ...action.payload,
            toppingsByName: {
              ...toppings.reduce((acc, { defaultSelected, topping }) => {
                return {
                  ...acc,
                  [topping.name]: {
                    ...topping,
                    selected: defaultSelected || false
                  }
                };
              }, {})
            }
          }
        },
        currentSelectedSize: action.payload.name
      };
    }

    case SELECT_TOPPING: {
      const { name, topping } = action.payload;
      const { maxToppings, toppingsByName } = state.pizzas[name];
      const numberOfToppings = Object.keys(state.pizzas[name].toppingsByName)
        .map(topping => toppingsByName[topping])
        .filter(topping => topping.selected).length;

      if (numberOfToppings === maxToppings) {
        return {
          ...state
        };
      }

      return {
        ...state,
        pizzas: {
          ...state.pizzas,
          [name]: {
            ...state.pizzas[name],
            toppingsByName: {
              ...state.pizzas[name].toppingsByName,
              [topping.name]: {
                ...state.pizzas[name].toppingsByName[topping.name],
                selected: !state.pizzas[name].toppingsByName[topping.name]
                  .selected
              }
            }
          }
        }
      };
    }

    default:
      return state;
  }
}
