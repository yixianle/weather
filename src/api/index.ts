import { request } from 'umi';
import { weather } from "./mock";

export interface IWeather {
  current: ICurrentWeather;
  hourly: ICurrentWeather[];
  daily: ICurrentWeather[];
  [propName: string]: any;
}

// 当前天气
export interface ICurrentWeather {
  weather: IWeatherType[]; 
  temp: any;  // 温度
  humidity: number; // 湿度
  wind_speed: number; // 风速 米/秒
  rain?: any; // 降雨量
  [propName: string]: any;
}

export interface IWeatherType {
  id: number;
  description: string;
  [propName: string]: any;
}

export interface ICoordParams {
  lat: number;
  lon: number;
}

export const getWeatherBak = (
  params: ICoordParams,
): Promise<IWeather> => {
  if (navigator.geolocation){
    navigator.geolocation.watchPosition((data)=>{
      console.log(data, 111);
    });
  }
  return Promise.resolve(weather);
}

export const getWeather = (
  params: ICoordParams,
): Promise<IWeather> => {
  return request('https://api.openweathermap.org/data/2.5/onecall', {
    method: 'GET',
    params: {
      ...params,
      lang: 'zh_cn',
      appid: 'b48f4f15021c2a60774fa4a103ddfdb2',
      exclude: 'minutely,alerts',
      units: 'metric'
    }
  })
};
