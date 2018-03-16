import InstanceAxios from './instance';

const axios = InstanceAxios();

// eslint-disable-next-line import/prefer-default-export
export default function getDataAirCraft(data) {
  return axios.get(
    'https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json',
  );
}
