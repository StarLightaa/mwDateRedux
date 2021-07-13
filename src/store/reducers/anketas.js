import {GET_ANKETAS_SUCCESS, GET_ANKETAS_ERROR} from '../constants/actions';

export const initialState = {
  anketas: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ANKETAS_SUCCESS:
      return {
        ...state,
        anketas: action.payload.anketas,
      };

    case GET_ANKETAS_ERROR:
      return {
        ...state,
        anketas: null,
      };

    default:
      return state;
  }
};
