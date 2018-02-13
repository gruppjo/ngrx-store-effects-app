import { Injectable } from '@angular/core';

import * as pizzaActions from '../actions/pizzas.action';
import * as fromServices from '../../services';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class PizzasEffects {
  constructor(
    private actions$: Actions,
    private pizzaService: fromServices.PizzasService
  ) {}

  @Effect(/* { dispatch: true } by default */)
  loadPizzas$ = this.actions$.ofType(pizzaActions.LOAD_PIZZAS)
    .pipe(
      switchMap(() => this.pizzaService.getPizzas().pipe(
        // map returns the dispatched action of this effect
        map((pizzas) => new pizzaActions.LoadPizzasSuccess(pizzas)),
        catchError(error => of(new pizzaActions.LoadPizzasFail(error))),
      ))
    );
}
