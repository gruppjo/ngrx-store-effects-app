import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, catchError, switchMap } from 'rxjs/operators';

import * as toppingsActions from '../actions/toppings.action';
import * as fromServices from '../../services/toppings.service';

@Injectable()
export class ToppingsEffects {
  constructor(
    private actions$: Actions,
    private toppingsService: fromServices.ToppingsService
  ) {}

  @Effect(/* {dispatch: true} */)
  // listen for action
  loadToppings$ = this.actions$.ofType(toppingsActions.LOAD_TOPPINGS).pipe(
    switchMap(() => {
      return this.toppingsService.getToppings().pipe(
        // dispatch new actions based on result
        map(toppings => new toppingsActions.LoadToppingsSuccess(toppings)),
        catchError(error => of(new toppingsActions.LoadToppingsFail(error)))
      );
    })
  );
}
