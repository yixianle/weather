import { request } from 'umi';
import { weather } from "./mock";

export interface IWeather {
  location: ILocation;
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

export interface ILocation {
  lat: number;
  lon: number;
  province: string;
  city: string;
}

export const getWeatherBak = (
  params: ICoordParams,
): Promise<IWeather> => {
  if (navigator.geolocation){
    
  }
  return Promise.resolve(weather);
}

// 使用h5 api 获取经纬度信息
const getCoord = () => new Promise<ILocation>((resolve, reject) => {
  // 默认城市信息
  const location = {
    lat: 30.2937,
    lon: 120.1614,
    province: '浙江省',
    city: '杭州市'
  }
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position)=>{
      console.log(position); 
      const coords:ICoordParams = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      }
      location.lat = position.coords.latitude;
      location.lon = position.coords.longitude;
      resolve(location);
    },(error)=>{
      resolve(location);
    });
  }else{
    resolve(location);
  }
})

// 获取城市信息
const getLocation = (): Promise<ILocation> => {
  return request('https://restapi.amap.com/v3/ip', {
    method: 'GET',
    params: {
      // ip: '114.247.50.2',  // 测试ip
      key: '378374d410d86b2692c61fd42d0380b2'
    }
  }).then(async res=>{
    let {rectangle,province,city} = res;
    let lat=0,lon=0;
    if(typeof rectangle ==='string' && rectangle.length >0){
      const coords = rectangle.split(';').map((item:string): string[] =>{
        return item.split(',');
      });
      // 经纬度取城市范围中间值
      lat = (Number(coords[0][1])+Number(coords[1][1]))/2;
      lon = (Number(coords[0][0])-0+Number(coords[1][0]))/2;
    }else{
      const location = await getCoord();
      localStorage.setItem('location', JSON.stringify(location));
      return location;
    }
    console.log(lat,lon,province,city, 3333);
    localStorage.setItem('location', JSON.stringify({lat,lon,province,city}));
    return {lat,lon,province,city};
  }).catch(function(error) {
    // 处理 getJSON 和 前一个回调函数运行时发生的错误
    console.log('发生错误！', error);
    var local = localStorage.getItem("location");
    return local && JSON.parse(local);
  });
};

// 获取天气信息
export const getWeather = async(): Promise<IWeather> => {
  const location = await getLocation();
  const res = await request('https://api.openweathermap.org/data/2.5/onecall', {
    method: 'GET',
    params: {
      lat: location.lat,
      lon: location.lon,
      lang: 'zh_cn',
      appid: 'b48f4f15021c2a60774fa4a103ddfdb2',
      exclude: 'minutely,alerts',
      units: 'metric'
    }
  }).catch(function(error) {
    // 处理 getJSON 和 前一个回调函数运行时发生的错误
    console.log('发生错误！', error);
    var weather = localStorage.getItem("weather");
    return weather && JSON.parse(weather);
  });
  console.log(res, location, 999);
  
  res.location = location;
  localStorage.setItem('weather', JSON.stringify(res));
  return res;
};
