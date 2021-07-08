import {
  GET_ANKETA,
  GET_ANKETA_SUCCESS,
  GET_ANKETA_ERROR,
  UPDATE_ANKETA,
  UPDATE_ANKETA_SUCCESS,
  UPDATE_ANKETA_ERROR,
} from '../constants/actions';

export const initialState = {
  isLoading: false,
  isEditing: false,
  fields: null,
};

export default (state = initialState, action) => {
  console.log('action', action);
  switch (action.type) {
    case GET_ANKETA:
      return {...state, isLoading: true};

    case GET_ANKETA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        fields: action.payload.anketa,
      };

    case GET_ANKETA_ERROR:
      return {
        ...state,
        isLoading: false,
        fields: null,
      };

    case UPDATE_ANKETA:
      return {...state, isEditing: true};

    case UPDATE_ANKETA_SUCCESS:
      return {
        ...state,
        isEditing: false,
        fields: action.payload.anketa,
      };

    case UPDATE_ANKETA_ERROR:
      return {
        ...state,
        isEditing: false,
        // fields: null,
      };

    default:
      return state;
  }
};
