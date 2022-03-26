# weather

天气APP

## 天气查询接口 - openWeather
> openWeather 的天气查询接口与目标UI比较契合，国内的天气查询接口普遍只能查询近3天的预报

[天气查询接口API](https://openweathermap.org/api/one-call-api)： 能够查询当前和预报的天气

### 天气状态对应表 - 未来天气
|  天气状况ID   | 对应类型  |
|  ----  | ----  |
| [800]  | 晴天 |
|  [801-804] | 多云 |
| [701-781]  | 大风 |
| [300-321,500-531]  | 雨天 |
| [600-622]  | 雪天 |
| [200-232]  | 打雷 |

### 天气状态对应表 - 当前天气
|  天气状况ID   | 对应类型  |
|  ----  | ----  |
| [800-804,701-781]  | 晴转多云 |
| [300-321,500-531]  | 雨天 |
| [600-622]  | 雪天 |
| [200-232]  | 打雷 |


## 获取用户定位经纬度信息 
- 使用 navigator.geolocation h5提供的定位api，需要用户授权
- 兜底方案使用 ip 地址查询所属地理位置 [高德IP定位](https://lbs.amap.com/api/webservice/guide/api/ipconfig)
- 默认是杭州市  {"lat": 30.2937, "lon": 120.1614}

https://api.openweathermap.org/data/2.5/onecall?lat=30.2937&lon=120.1614&lang=zh_cn&appid=a45828584b6b6dcc94f0f43280b9aadd

## 温度显示曲线图
使用蚂蚁的 antV - F2  https://antv-f2.gitee.io/zh



