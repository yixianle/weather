import { history } from 'umi';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { getWeather, IWeather, ICurrentWeather } from "@/api/index";
import { getWeatherPicById, IWeatherPic } from "@/api/weatherMap";
import moment from "moment";
import useFetch from '@/hooks/useFetch';
import styles from './index.less';
import logo from "@/img/logo.png";

export default function IndexPage() {
  const [weatherInfo, setWeatherInfo] = useState<IWeather|undefined>()
  useEffect(()=>{
    getWeather({lat: 30.2937, lon: 120.1614}).then((res)=>{
      setWeatherInfo(res);
    })
  },[])
  // useEffect(()=>{
  //   getWeather({lat: 30.2937, lon: 120.1614}).then((res)=>{
  //     setWeatherInfo(res);
  //   })
  // },[])
  const current = weatherInfo && weatherInfo.current;
  // const description = current?.weather?.[0]?.description
  const list = current?.weather?.[0]?.description?.split('，');
  
  moment.locale('zh-cn');
  const dddd = moment().format('dddd')
  moment.locale('en');
  const ha = moment().format('h a')
  
  const weatherId =current?.weather?.[0]?.id;
  const weatherPic = weatherId && getWeatherPicById(weatherId);
  
  const weatherDom = list?.map((item,index)=>{
    return <p key={index}><span>{item}</span></p>;
  })
  
  return (
    <div className={styles.pageIndex}>
      <div className={styles.body}>
        <img className={styles.logo} src={logo} alt="logo" />
        <div className={styles.container}>
          <div className={styles.box}>
            <img className={styles.weatherPic} src={(weatherPic as IWeatherPic)?.current} />
            <div className={styles.city}>杭州市, 浙江省</div>
            <div className={styles.info}>
              <div className={styles.left}>
                <div className={styles.temp}>{Math.floor(current?.temp)}</div>
                <div className={styles.time}>{dddd}, {ha}</div>
              </div>
              <div className={styles.right}>
              {weatherDom}
              </div>
            </div>
          </div>
          <div onClick={()=>history.push('/detail')} className={styles.detail}>详情</div>
        </div>
        <div className={styles.clear}></div>
        <div className={styles.footer}>
        {(current?.rain)?<p className={styles.rain}>
            <span>降水量</span>
            <span>{current.rain['1h']}</span>
          </p> :''}
          <p className={styles.humidity}>
            <span>湿度</span>
            <span>{current?.humidity}</span>
          </p>
          <p className={styles.wind_speed}>
            <span>风速</span>
            <span>{current?.wind_speed}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
