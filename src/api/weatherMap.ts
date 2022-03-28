

export interface IWeatherPic {
  current: string;
  forecast: string;
  forecastNight: string;
}

// 天气图片
export const WeatherPic = {
  // 晴天
  sun: {
    current: '/img/Sun_cloud_corrent.png',
    forecast: '/img/Sun.png',
    forecastNight: '/img/Sun_night.png'
  },
  // 多云
  cloud: {
    current: '/img/Sun_cloud_corrent.png',
    forecast: '/img/Clouds.png',
    forecastNight: '/img/Clouds_night.png'
  },
  // 大风
  wind: {
    current1: '/img/Sun_cloud_corrent.png',
    current: '/img/Sun_cloud_corrent.png',
    forecast: '/img/Wind.png',
    forecastNight: '/img/Wind_night.png'
  },
  // 雨天
  rain: {
    current: '/img/Rain_current.png',
    forecast: '/img/Rain.png',
    forecastNight: '/img/Rain_night.png'
  },
  // 雪天
  snow: {
    current: '/img/Snow_current.png',
    forecast: '/img/Snow.png',
    forecastNight: '/img/Snow_night.png'
  },
  // 打雷
  storm: {
    current: '/img/Storm_current.png',
    forecast: '/img/Storm.png',
    forecastNight: '/img/Storm_night.png'
  },
}

// 获取天气图片 by WeatherId
export const getWeatherPicById = (id: number):IWeatherPic =>{
  if(id === 800){
    return WeatherPic.sun;
  }
  else if(id >= 801 && id <= 804){
    return WeatherPic.cloud;
  }
  else if(id >= 701 && id <= 781){
    return WeatherPic.wind;
  }
  else if(id >= 300 && id <= 532){
    return WeatherPic.rain;
  }
  else if(id >= 600 && id <= 622){
    return WeatherPic.snow;
  }
  else if(id >= 200 && id <= 232){
    return WeatherPic.storm;
  }
  return WeatherPic.sun;
}