import {
  GET_TRANSLATE,
  GET_TRANSLATE_SUCCESS,
  GET_TRANSLATE_ERROR,
} from '../constants/actions';

import APIHelper from '../../helpers/APIHelper';
import {showToast} from '../../helpers/ToastHelper';

export const getCategoryTranslate = category => async dispatch => {
  console.log('category', category);
  try {
    dispatch({type: GET_TRANSLATE});
    const response = await APIHelper.post('translate', {category});

    const {data} = response.data;
    console.log('category translates', data);
    dispatch({type: GET_TRANSLATE_SUCCESS});
    return data;
  } catch (error) {
    console.log('category translates', error);
    dispatch({type: GET_TRANSLATE_ERROR});
    return false;
  }
};

export const getAnketaData = () => async dispatch => {
  try {
    dispatch({type: GET_TRANSLATE});
    const response = await APIHelper.get('anketa');

    const {data} = response.data;
    console.log('anketa', data);
    dispatch({type: GET_TRANSLATE_SUCCESS});
    return data;
  } catch (error) {
    console.log('anketa error', error);
    dispatch({type: GET_TRANSLATE_ERROR});
    return false;
  }
};
