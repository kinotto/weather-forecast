import config from '../config.json';


export const getForecastApi = async () => {
  const res = await fetch(config.api_url);
  if(!res.ok) {
    throw new Error("Something went wrong")
  }
  return res.json();
}