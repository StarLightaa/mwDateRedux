import APIHelper from '../../helpers/APIHelper';
import {showToast} from '../../helpers/ToastHelper';

import axios from 'axios';
import {TOMTOM_API_KEY} from '../../store/constants/url';

import {
  GET_ANKETA,
  GET_ANKETA_SUCCESS,
  GET_ANKETA_ERROR,
  UPDATE_ANKETA,
  UPDATE_ANKETA_SUCCESS,
  UPDATE_ANKETA_ERROR,
  GET_PHOTOS_SUCCESS,
  GET_PHOTOS_ERROR,
} from '../constants/actions';

export const getAnketa = () => async dispatch => {
  try {
    dispatch({type: GET_ANKETA});
    const response = await APIHelper.get('my-anketa');
    const {data} = response.data;

    let anketa = data;
    dispatch({type: GET_ANKETA_SUCCESS, payload: {anketa}});
    return true;
  } catch (error) {
    showToast({message: 'Ошибка получения анкеты ' + error.status});
    console.log('anketa error', error);
    dispatch({type: GET_ANKETA_ERROR, payload: error});
    return false;
  }
};

export const getAnketaTitles = () => async dispatch => {
  try {
    const response = await APIHelper.get('anketa-titles');
    const {data} = response.data;

    let anketa = data;
    return data;
  } catch (error) {
    console.log('anketa titles error', error);
    return [];
  }
};

export const getAnketaRadioValues = category => async dispatch => {
  try {
    const response = await APIHelper.get(`anketa-edit-list/${category}`);
    const {data} = response.data;
    return data;
  } catch (error) {
    console.log('getAnketaRadioValues error', error);
    return [];
  }
};

export const updateAnketa = credentials => async dispatch => {
  console.log('cred', credentials);
  try {
    dispatch({type: UPDATE_ANKETA});
    const response = await APIHelper.put(`my-anketa`, credentials);
    const {data} = response.data;

    let anketa = data;
    // showToast({message: 'user-update' + user.email});
    dispatch({type: UPDATE_ANKETA_SUCCESS, payload: {anketa}});
    return true;
  } catch (error) {
    // showToast({message: 'user-update Ошибка обновления' + error.status});
    dispatch({type: UPDATE_ANKETA_ERROR, payload: error});
    return false;
  }
};

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

export const getCity = (location) => async dispatch => {
  const {latitude, longitude} = location;
  try {
    const url = `https://api.tomtom.com/search/2/reverseGeocode/${latitude}%2C${longitude}.json?key=${TOMTOM_API_KEY}`;
    const response = await axios.get(url);
    console.log('tomtom response', response);
    const data = response.data;
    return data;
  } catch (error) {
    console.log('error', error);
    return null;
  }
};