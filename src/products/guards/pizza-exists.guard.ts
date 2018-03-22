import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, map, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from '../store';

@Injectable()
export class PizzaExistsGuard implements CanActivate {

  constructor (private store: Store<fromStore.ProductsState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const id = parseInt(route.params.pizzaId, 10);

    return this.hasPizza(id).pipe(
      switchMap(hasPizza => of(hasPizza)),
      catchError(() => of(false))
    );
  }

  hasPizza(id: number): Observable<boolean> {
    return this.store.select(fromStore.getPizzasEntities)
      .pipe(
        map(entities => !!entities[id])
      );
  }
}
