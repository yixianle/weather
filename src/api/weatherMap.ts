

export interface IWeatherPic {
  current: string;
  forecast: string;
  forecastNight: string;
}

// 天气图片
export const WeatherPic = {
  // 晴天
  sun: {
    current: 'https://m.hellobike.com/resource/helloyun/09834/3xw-i_Sun_cloud_corrent.png?x-oss-process=image/quality,q_80',
    forecast: 'https://m.hellobike.com/resource/helloyun/09834/MbRDZ_Sun.png?x-oss-process=image/quality,q_80',
    forecastNight: 'https://m.hellobike.com/resource/helloyun/09834/Y5UYY_Sun_night.png?x-oss-process=image/quality,q_80'
  },
  // 多云
  cloud: {
    current: 'https://m.hellobike.com/resource/helloyun/09834/3xw-i_Sun_cloud_corrent.png?x-oss-process=image/quality,q_80',
    forecast: 'https://m.hellobike.com/resource/helloyun/09834/AnOC7_Clouds.png?x-oss-process=image/quality,q_80',
    forecastNight: 'https://m.hellobike.com/resource/helloyun/09834/Mbpr8_Clouds_night.png?x-oss-process=image/quality,q_80'
  },
  // 大风
  wind: {
    current: 'https://m.hellobike.com/resource/helloyun/09834/3xw-i_Sun_cloud_corrent.png?x-oss-process=image/quality,q_80',
    forecast: 'https://m.hellobike.com/resource/helloyun/09834/AET3Z_Wind.png?x-oss-process=image/quality,q_80',
    forecastNight: 'https://m.hellobike.com/resource/helloyun/09834/U2EN2_Wind_night.png?x-oss-process=image/quality,q_80'
  },
  // 雨天
  rain: {
    current: 'https://m.hellobike.com/resource/helloyun/09834/sZTAN_Rain_current.png?x-oss-process=image/quality,q_80',
    forecast: 'https://m.hellobike.com/resource/helloyun/09834/yLfKU_Rain.png?x-oss-process=image/quality,q_80',
    forecastNight: 'https://m.hellobike.com/resource/helloyun/09834/wewY8_Rain_night.png?x-oss-process=image/quality,q_80'
  },
  // 雪天
  snow: {
    current: 'https://m.hellobike.com/resource/helloyun/09834/ob8aO_Snow_current.png?x-oss-process=image/quality,q_80',
    forecast: 'https://m.hellobike.com/resource/helloyun/09834/6OS8v_Snow.png?x-oss-process=image/quality,q_80',
    forecastNight: 'https://m.hellobike.com/resource/helloyun/09834/25wkB_Snow_night.png?x-oss-process=image/quality,q_80'
  },
  // 打雷
  storm: {
    current: 'https://m.hellobike.com/resource/helloyun/09834/YK4Pj_Storm_current.png?x-oss-process=image/quality,q_80',
    forecast: 'https://m.hellobike.com/resource/helloyun/09834/I6E_l_Storm.png?x-oss-process=image/quality,q_80',
    forecastNight: 'https://m.hellobike.com/resource/helloyun/09834/A5oxP_Storm_night.png?x-oss-process=image/quality,q_80'
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