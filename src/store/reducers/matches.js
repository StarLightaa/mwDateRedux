import {GET_MATCHES_SUCCESS, GET_MATCHES_ERROR} from '../constants/actions';

export const initialState = {
  matches: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MATCHES_SUCCESS:
      return {
        ...state,
        matches: action.payload.matches,
      };

    case GET_MATCHES_ERROR:
      return {
        ...state,
        matches: null,
      };

    default:
      return state;
  }
};