import { REQUEST_STATE } from "../content";

export const initialstate = {
  fetchState: REQUEST_STATE.INITIAL,
  historysList: [],
};

export const historysActionTypes = {
  FETCHING: 'FETCHING',
  FETCHING_SUCCESS: 'FETCHING_SUCCESS'
}

export const historysReducer = (state, action) => {
  switch (action.type) {
    case historysActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case historysActionTypes.FETCHING_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        historysList: action.payload.historys,
      };
    default:
      throw new Error();
  }
}
