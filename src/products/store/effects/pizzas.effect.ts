import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as fromRoot from '../../../app/store';
import * as pizzaActions from '../actions/pizzas.action';
import * as fromServices from '../../services';

@Injectable()
export class PizzasEffects {
  constructor(
    private actions$: Actions,
    private pizzaService: fromServices.PizzasService
  ) {}

  // loadPizzas$
  @Effect(/* {dispatch: true} */)
  // listen for action
  loadPizzas$ = this.actions$.ofType(pizzaActions.LOAD_PIZZAS).pipe(
    switchMap(() => {
      return this.pizzaService.getPizzas().pipe(
        // dispatch new actions based on result
        map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)),
        catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
      );
    })
  );

  @Effect()
  createPizza$ = this.actions$.ofType(pizzaActions.CREATE_PIZZA).pipe(
    map((action: pizzaActions.CreatePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzaService
        .createPizza(pizza)
        .pipe(
          map(pizza => new pizzaActions.CreatePizzaSuccess(pizza)),
          catchError(error => of(new pizzaActions.CreatePizzaFail(error)))
        );
    })
  );
  // side effect
  @Effect()
  createPizzaSuccess$ = this.actions$.ofType(pizzaActions.CREATE_PIZZA_SUCCESS).pipe(
    map((action: pizzaActions.CreatePizzaSuccess) => action.payload),
    map(
      pizza =>
        new fromRoot.Go({
          path: ['/products', pizza.id]
        })
    )
  );

  @Effect()
  updatePizza$ = this.actions$.ofType(pizzaActions.UPDATE_PIZZA).pipe(
    map((action: pizzaActions.UpdatePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzaService
        .updatePizza(pizza)
        .pipe(
          map(pizza => new pizzaActions.UpdatePizzaSuccess(pizza)),
          catchError(error => of(new pizzaActions.UpdatePizzaFail(error)))
        );
    })
  );

  @Effect()
  removePizza$ = this.actions$.ofType(pizzaActions.REMOVE_PIZZA).pipe(
    map((action: pizzaActions.RemovePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzaService.removePizza(pizza).pipe(
        // use pizza from action since API doesn't return a pizza
        map(() => new pizzaActions.RemovePizzaSuccess(pizza)),
        catchError(error => of(new pizzaActions.RemovePizzaFail(error)))
      );
    })
  );

  @Effect()
  handlePizzaSuccess$ = this.actions$
    .ofType(
      pizzaActions.UPDATE_PIZZA_SUCCESS, pizzaActions.REMOVE_PIZZA_SUCCESS
    )
    .pipe(
      map(pizza => {
        return new fromRoot.Go({
          path: ['/products']
        });
      })
    );
}
