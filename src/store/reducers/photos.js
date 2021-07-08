import {
  GET_PHOTOS_SUCCESS,
  GET_PHOTOS_ERROR,
  ADD_PHOTO_SUCCESS,
  ADD_PHOTO_ERROR,
} from '../constants/actions';

export const initialState = {
  photos: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PHOTOS_SUCCESS:
        console.log('action.payload.photos', action.payload.photos);
      return {
        ...state,
        photos: action.payload.photos,
      };

    case GET_PHOTOS_ERROR:
      return {
        ...state,
        photos: null,
      };

    case ADD_PHOTO_SUCCESS:
      return {
        ...state,
        photos: action.payload.photos,
      };

    case ADD_PHOTO_ERROR:
      return {
        ...state,
        // photos: null,
      };

    default:
      return state;
  }
};
