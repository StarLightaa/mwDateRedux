import APIHelper from '../../helpers/APIHelper';
import APIFileHelper from '../../helpers/APIFileHelper';
import {showToast} from '../../helpers/ToastHelper';

import {GET_MATCHES_SUCCESS, GET_MATCHES_ERROR} from '../constants/actions';

export const getMatches = () => async dispatch => {
  try {
    const response = await APIHelper.get('search');
    const {data} = response.data;
    let matches = data;
    dispatch({type: GET_MATCHES_SUCCESS, payload: {matches}});
    return matches;
  } catch (error) {
    console.log('matches error', error);
    dispatch({type: GET_MATCHES_ERROR, payload: error});
    return [];
  }
};
