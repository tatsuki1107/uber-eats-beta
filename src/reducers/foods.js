import { REQUEST_STATE } from "../content";

export const initialState = {
  fetchState: REQUEST_STATE.INITIAL,
  foodsList: [],
};

export const foodsActionTypes = {
  FETCHING: 'FETCHING',
  FETCHING_SUCCESS: 'FETCHING_SUCCESS'
}

export const foodsReducer = (state, action) => {
  switch (action.type) {
    case foodsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case foodsActionTypes.FETCHING_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        foodsList: action.payload.foods,
      };
    default:
      throw new Error();
  }
}
