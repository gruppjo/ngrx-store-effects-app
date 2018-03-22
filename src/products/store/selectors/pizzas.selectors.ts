import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromPizzas from '../reducers/pizzas.reducer';
import * as fromToppings from '../selectors/toppings.selectors';
import { Pizza } from '../../models/pizza.model';

// full state tree
// const state = {
//   products: {
//     pizzas: {
//       data: [],
//       loaded: false,
//       loading: false
//     }
//   }
// };

// pizza state selectors
export const getPizzasState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.pizzas
);
export const getPizzasEntities = createSelector(
  getPizzasState,
  fromPizzas.getPizzasEntities
);

// getSelectedPizza Selector with getPizzasEntities getRouterState selectors
export const getSelectedPizza = createSelector(
  getPizzasEntities,
  fromRoot.getRouterState,
  (entities, router): Pizza => {
    return router.state && entities[router.state.params.pizzaId];
  }
);

export const getPizzaVisualized = createSelector(
  getSelectedPizza,
  fromToppings.getToppingsEntities,
  fromToppings.getSelectedToppings,
  (pizza, toppingEntities, selectedToppings) => {
    const toppings = selectedToppings.map(id => toppingEntities[id]);
    return { ...pizza, toppings };
  }
);

export const getAllPizzas = createSelector(getPizzasEntities, entities => {
  return Object.keys(entities).map(id => {
    return entities[parseInt(id, 10)];
  });
});
export const getPizzasLoaded = createSelector(
  getPizzasState,
  fromPizzas.getPizzasLoaded
);
export const getPizzasLoading = createSelector(
  getPizzasState,
  fromPizzas.getPizzasLoading
);
