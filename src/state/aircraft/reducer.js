import {
  REQUEST_GET_DATA_AIRCRAFT,
  REQUEST_GET_DATA_AIRCRAFT_SUCCESS,
  REQUEST_GET_DATA_AIRCRAFT_FAILED,
} from './const';

const initialState = {
  dataAircraft: [],
  loading: false,
};

export default function aircraftApp(state = initialState, action) {
  switch (action.type) {
    case REQUEST_GET_DATA_AIRCRAFT: {
      return {
        ...state,
        loading: true,
      };
    }
    case REQUEST_GET_DATA_AIRCRAFT_SUCCESS: {
      return {
        ...state,
        dataAircraft: action.dataAircraft,
        loading: false,
      };
    }
    case REQUEST_GET_DATA_AIRCRAFT_FAILED: {
      return {
        ...state,
        dataAircraft: [],
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
}
