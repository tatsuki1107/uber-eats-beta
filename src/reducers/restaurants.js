import { REQUEST_STATE } from "../content";

export const initialState = {
  fetchState: REQUEST_STATE.INITIAL,
  restaurantsList: []
}

export const restaurantsActionTypes = {
  FETCHING: 'FETCHING',
  FETCHING_SUCCESS: 'FETCH_SUCCESS'
}

export const restaurantsReducer = (state, action) => {
  switch (action.type) {
    case restaurantsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case restaurantsActionTypes.FETCHING_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        restaurantsList: action.payload.restaurants,
      };
    default:
      throw new Error();
  }
}
