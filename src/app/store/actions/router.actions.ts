import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

// router action consts
export const GO = '[Router] Go';
export const BACK = '[Router] BACK';
export const FORWARD = '[Router] FORWARD';

// router action creators
export class Go implements Action {
  readonly type = GO;
  constructor(
    public payload: {
      path: any[];
      query?: object;
      extras?: NavigationExtras;
    }
  ) {}
}

export class Back implements Action {
  readonly type = BACK;
}

export class Forward implements Action {
  readonly type = FORWARD;
}

export type RouterAction = Go | Back | Forward;
