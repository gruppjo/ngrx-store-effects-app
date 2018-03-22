import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromPizzas from './pizzas.reducer';
import * as fromToppings from './toppings.reducer';
import { ActionReducer } from '@ngrx/store/src/models';

export interface ProductsState {
  pizzas: fromPizzas.PizzasState;
  toppings: fromToppings.ToppingsState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzas.reducer,
  toppings: fromToppings.reducer
};

// ProductsState
export const getProductsState = createFeatureSelector<ProductsState>('products');
