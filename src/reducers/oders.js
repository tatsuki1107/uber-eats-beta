import { REQUEST_STATE } from "../content";

export const initialstate = {
  fetchState: REQUEST_STATE.INITIAL,
  ordersList: [],
};

export const ordersActionTypes = {
  FETCHING: 'FETCHING',
  FETCHING_SUCCESS: 'FETCHING_SUCCESS'
}

export const ordersReducer = (state, action) => {
  switch (action.type) {
    case ordersActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case ordersActionTypes.FETCHING_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        ordersList: action.payload.orders,
      };
    default:
      throw new Error();
  }
}
