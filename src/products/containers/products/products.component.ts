import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromStore from '../../store';
import { Pizza } from '../../models/pizza.model';

@Component({
  selector: 'products',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['products.component.scss'],
  template: `
    <div class="products">
      <div class="products-new">
        <a
          class="btn btn-ok"
          routerLink="./new">
          New Pizza
        </a>
      </div>
      <div class="products-list">
        <div *ngIf="!((pizzas$ | async)?.length)">
          No pizzas, add one to get started.
        </div>
        <pizza-item
          *ngFor="let pizza of (pizzas$ | async)"
          [pizza]="pizza">
        </pizza-item>
      </div>
    </div>
  `
})
export class ProductsComponent implements OnInit {
  pizzas$: Observable<Pizza[]>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    // access via state tree and subscribe
    // this.store.select<any>('products').subscribe(state => {
    //   console.log(state);
    // });

    // acces via selector and subscribe
    // this.store.select<Pizza[]>(fromStore.getAllPizzas).subscribe(state => {
    //   this.pizzas = state;
    //   console.log(this.pizzas);
    // });

    // access via selector and observable | async
    this.pizzas$ = this.store.select<Pizza[]>(fromStore.getAllPizzas);
  }
}
