import config from '../config.json';
import { AlertResponse } from '../model/alert';
import { getRandomDate } from '../utils/utility';


export const getForecastApi = async () => {
  const res = await fetch(config.api_url);
  if(!res.ok) {
    throw new Error("Something went wrong")
  }
  //return res.json();

  
  // this piece of code is to test the data with random dates since all the alerts are from today

  let data = await res.json() as AlertResponse;
  data = { ...data, features: data.features.map(el => ({ ...el, properties: { ...el.properties, effective: getRandomDate(new Date('2025-01-01'), new Date()).toISOString() } })) }
  return Promise.resolve(data);
  
}