import * as fromToppings from './toppings.action';

describe('Toppings Action', () => {
  describe('LoadToppings Actions', () => {

    describe('LoadToppings', () => {
      it('should create an action', () => {
        const action = new fromToppings.LoadToppings();
        // spread in all objects because action otherwise is of type LoadToppings instead of Object
        expect({ ...action }).toEqual({
          type: fromToppings.LOAD_TOPPINGS
        });
      });
    });

    describe('LoadToppingsFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Load Error' };
        const action = new fromToppings.LoadToppingsFail(payload);
        // spread in all objects because action otherwise is of type LoadToppings instead of Object
        expect({ ...action }).toEqual({
          type: fromToppings.LOAD_TOPPINGS_FAIL,
          payload
        });
      });
    });

    describe('LoadToppingsSuccess', () => {
      it('should create an action', () => {
        const payload = [
          {
            "id": 1,
            "name": "anchovy"
          },
          {
            "id": 2,
            "name": "bacon"
          },
        ];
        const action = new fromToppings.LoadToppingsSuccess(payload);
        // spread in all objects because action otherwise is of type LoadToppings instead of Object
        expect({ ...action }).toEqual({
          type: fromToppings.LOAD_TOPPINGS_SUCCESS,
          payload
        });
      });
    });

    describe('VisualizeToppings', () => {
      it('should create an action', () => {
        const payload = [1, 2, 3];
        const action = new fromToppings.VisualizeToppings(payload);
        expect({ ...action }).toEqual({
          type: fromToppings.VISUALIZE_TOPPINGS,
          payload
        });
      });
    });
  });
});
