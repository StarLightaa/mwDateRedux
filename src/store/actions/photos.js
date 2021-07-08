import APIHelper from '../../helpers/APIHelper';
import APIFileHelper from '../../helpers/APIFileHelper';
import {showToast} from '../../helpers/ToastHelper';

import {
  GET_PHOTOS_SUCCESS,
  GET_PHOTOS_ERROR,
  ADD_PHOTO_SUCCESS,
  ADD_PHOTO_ERROR,
} from '../constants/actions';

export const getPhotos = () => async dispatch => {
  try {
    const response = await APIHelper.get('photos');
    const {data} = response.data;
    let photos = data;
    dispatch({type: GET_PHOTOS_SUCCESS, payload: {photos}});
    return photos;
  } catch (error) {
    showToast({message: 'Ошибка получения фотографий' + error.status});
    console.log('photo error', error);
    dispatch({type: GET_PHOTOS_ERROR, payload: error});
    return [];
  }
};

export const addPhoto = credentials => async dispatch => {
  let formData = new FormData();
  let photo = {
    uri: credentials.path,
    type: credentials.mime,
    size: credentials.size,
    name: credentials.modificationDate,
  };
  formData.append('photo', photo);
  try {
    const response = await APIFileHelper.post('photos', formData);
    const {data} = response.data;
    let photos = data;
    dispatch({type: ADD_PHOTO_SUCCESS, payload: {photos}});
    return photos;
  } catch (error) {
    showToast({message: 'Ошибка получения фотографий' + error.status});
    console.log('photo error', error);
    dispatch({type: ADD_PHOTO_ERROR, payload: error});
    return [];
  }
};
