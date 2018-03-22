import {
  REQUEST_GET_DATA_AIRCRAFT,
  REQUEST_GET_DATA_AIRCRAFT_SUCCESS,
  REQUEST_GET_DATA_AIRCRAFT_FAILED,
} from './const';
import setMessage from '../generic/action';
import getDataAirCraft from '../../api/aircraft';

function getDataAirCraftProgress() {
  return {
    type: REQUEST_GET_DATA_AIRCRAFT,
  };
}

function getDataAirCraftSuccess(dataAircraft) {
  return {
    type: REQUEST_GET_DATA_AIRCRAFT_SUCCESS,
    dataAircraft,
  };
}

function getDataAirCraftFailed(dataAircraft) {
  return {
    type: REQUEST_GET_DATA_AIRCRAFT_FAILED,
    dataAircraft,
  };
}

export default function requestGetDataAirCraft() {
  return dispatch => {
    dispatch(getDataAirCraftProgress());
    getDataAirCraft()
      .then(response => {
        if (response.status === 200) {
          console.log(response.data.acList);
          dispatch(getDataAirCraftSuccess(response.data.acList));
        } else {
          dispatch(
            setMessage(
              'Ha ocurrido un error mientras se consultaba la información',
              'error',
            ),
          );
        }
      })
      .catch(error => {
        console.log(error.response);
        dispatch(
          setMessage(
            error.stack,
            'error',
            'Error consultando la información de la Api.',
            'Modal',
          ),
        );
        dispatch(getDataAirCraftFailed());
      });
  };
}
