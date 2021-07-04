import {
  GET_TRANSLATE,
  GET_TRANSLATE_SUCCESS,
  GET_TRANSLATE_ERROR,
} from '../constants/actions';

export const initialState = {
  isLoading: false,
};

export default (state = initialState, action) => {
  console.log('action', action);
  switch (action.type) {
    // case RESET_LOADERS:
    //   return {
    //     ...state,
    //     isLoading: false,
    //   };

    case GET_TRANSLATE:
      return {...state, isLoading: true};

    case GET_TRANSLATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case GET_TRANSLATE_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
