import { history } from 'umi';
import {useEffect, useState} from 'react';
import moment from "moment";
import { getWeather, IWeather, ICurrentWeather } from "@/api/index";
import { getWeatherPicById, IWeatherPic } from "@/api/weatherMap";
import Canvas from '@antv/f2-react';
import { Chart, Axis, Area, Line } from '@antv/f2';
import styles from './index.less';

export default function IndexPage() {
  const [weatherInfo, setWeatherInfo] = useState<IWeather|undefined>()
  useEffect(()=>{
    getWeather({lat: 30.2937, lon: 120.1614}).then((res)=>{
      setWeatherInfo(res);
    })
  },[])
  const current = weatherInfo && weatherInfo.current;
  const hourly = weatherInfo && weatherInfo.hourly;
  const daily = weatherInfo && weatherInfo.daily;

  const hourList = hourly?.map((item, index)=>{
    return {
      // time: moment.unix(item.dt).utc().format('YYYY-MM-DD hh:mm:ss'),
      hour: moment.unix(item.dt).utc().format('h a'),
      time: moment.unix(item.dt).utc().format('hh'),
      tem: Math.floor(item.temp)
    }
  })
  const chartData = hourList?.splice(0, 12);
  const hourDom = hourList?.splice(0,24).map(item=>{
    return <div className={styles.hurtItem}>
      <div className={styles.hourTemp}>{item.tem}</div>
      <div className={styles.time}>{item.hour}</div>
    </div>
  })
  
  moment.locale('zh-cn');
  const dayDom = daily?.map(item=>{
    return <div className={styles.dayItem}>
      <div>{moment.unix(item.dt).utc().format('dddd')}</div>
      <div><img src={ getWeatherPicById(item.weather[0].id).forecast } /></div>
      <div>
        <span className={styles.max}>{Math.floor(item.temp.max)}</span> 
        <span className={styles.min}>{Math.floor(item.temp.min)}</span>
      </div>
    </div>
  })

  const weatherId =current?.weather?.[0]?.id;
  const weatherPic = weatherId && getWeatherPicById(weatherId);
  return (
    <div className={styles.pageDetail}>
      <div className={styles.current}>
        <div className={styles.top}>
          <div className={styles.left}>
            <div className={styles.back} onClick={()=> history.goBack()}>
              <img src="https://m.hellobike.com/resource/helloyun/09834/bLftP_Vector.png?x-oss-process=image/quality,q_80" alt="返回" />
            </div>
            <div className={styles.city}>杭州市，<br/>浙江省</div>
            <div className={styles.temp}>{ Math.floor(current?.temp) }</div>
          </div>
          <div className={styles.right} >
            <img src={(weatherPic as IWeatherPic)?.current} />
          </div>
        </div>
        <div className={styles.other}>
          {(current?.rain)?<div className={styles.rain}>{current.rain['1h']} %</div>:''}
          <div className={styles.humidity}>{current?.humidity} %</div>
          <div className={styles.wind_speed}>{current?.wind_speed} m/s</div>
        </div>
      </div>
      <div className={styles.today}>
        <div className={styles.font}>Today</div>
        <div className={styles.chart}>
        <Canvas pixelRatio={window.devicePixelRatio} height="120" >
          <Chart
            data={chartData}
            scale={{
              time: {
                type: 'linear',
                tickCount: 12,
                // mask: 'HH'
              },
              tem: {
                min: 0,
              }
            }}
          >
            <Axis
              field="time"
              style={{
                label: { align: 'between' },
              }}
            />
            <Area x="time" y="tem" color="#E9C939" shape="smooth" />
            <Line x="time" y="tem" color="#E9C939" shape="smooth" />
          </Chart>
        </Canvas>
        </div>
        <div className={styles.hourList}>
          {hourDom}
        </div>
      </div>
      <div className={styles.day}>
        {dayDom}
      </div>
    </div>
  );
}
