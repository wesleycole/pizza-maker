export const getPizzas = store => store.pizzas;
export const getCurrentPizzaSize = store => store.currentSelectedSize;
export const getSelectedToppings = (store, size) =>
  store.pizzas[size] && store.pizzas[size].toppings;
