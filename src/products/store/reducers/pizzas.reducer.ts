import * as fromPizzas from '../actions/pizzas.action';
import { Pizza } from '../../models/pizza.model';
import { toPayload } from '@ngrx/effects';

export interface PizzaState {
  data: Pizza[];
  loaded: boolean;
  loading: boolean;
};

export const initialState: PizzaState = {
  data: [],
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromPizzas.PizzasAction
): PizzaState {
  switch (action.type) {
    // called in component
    case fromPizzas.LOAD_PIZZAS: {
      return {
        ...state,
        loading: true
      };
    }
    // called via effect
    case fromPizzas.LOAD_PIZZAS_SUCCESS: {
      const data = action.payload;
      return  {
        ...state,
        loaded: true,
        loading: false,
        data
      };
    }
    case fromPizzas.LOAD_PIZZAS_FAIL: {
      return {
        ...state,
        loading: false
      };
    }
  }

  return state;
};

export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
export const getPizzas = (state: PizzaState) => state.data;
