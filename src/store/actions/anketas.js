import APIHelper from '../../helpers/APIHelper';
import APIFileHelper from '../../helpers/APIFileHelper';
import {showToast} from '../../helpers/ToastHelper';

import {GET_ANKETAS_SUCCESS, GET_ANKETAS_ERROR} from '../constants/actions';

export const getAnketas = () => async dispatch => {
    try {
      const response = await APIHelper.get('anketas');
      const {data} = response.data;
      let anketas = data;
      dispatch({type: GET_ANKETAS_SUCCESS, payload: {anketas}});
      return anketas;
    } catch (error) {
      console.log('anketas error', error);
      dispatch({type: GET_ANKETAS_ERROR, payload: error});
      return [];
    }
  };
  