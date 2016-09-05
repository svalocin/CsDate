# CsDate ( power by fecha )
A date class of js, it  inspired C# DateTime. 

## 中文简介
这是一个 js 的 Date 类，模仿 C# 的 DateTime，时间与字符串的相互转换使用的是 [fecha](https://github.com/taylorhakes/fecha)。

### 用法：
- 创建 CsDate
```
  var date1 = CsDate.createNew(); //当前时间
  var date2 = CsDate.createNew(new Date());
  var date2 = CsDate.createNew(1473144953938); //Unix Timestamp
  var date3 = CsDate.createNew("2016年09月06日 12时36分49秒", "YYYY年MM月DD日 HH时mm分ss秒");
  var date4 = CsDate.createNew(2016, 1, 1, 12, 0, 0, 0);
  var date5 = CsDate.parseByCs('\/Date(1245398693390)\/'); //从 C# 的 DateTime 序列化字符串转换
  var date6 = date5.copy(); //从当前的对象复制
```
  
- CsDate 的方法
```
  //默认时间格式：YYYY-MM-DD HH:mm:ss
  
  date1.date(); //获取日期部分，时间为 00:00:00
  date1.year();
  date1.month();
  date1.day();
  date1.hour();
  date1.minute();
  date1.second();
  
  date1.utcYear();
  date1.utcMonth();
  date1.utcDay();
  date1.utcHour();
  date1.utcMinute();
  date1.utcSecond();
  
  date1.toString("YYYY年MM月DD日 HH时mm分ss秒"); //转为字符串
  date1.toUtcString("YYYY年MM月DD日 HH时mm分ss秒"); //转为 UTC 时间字符串
  
  date1.addDays(1);
  date1.addHours(1);
  date1.addMinutes(1);
  date1.addMonths(1);
  date1.addSeconds(1);
  date1.addYears(1);
  
  date1.isEqual(date2); //是否等于
  date1.isGreater(date2); //是否大于
  date1.isLess(date2); //是否小于
  date1.isGreaterOrEqual(date2); //是否大于等于
  date1.isLessOrEqual(date2); //是否小于等于
  
  date1.getTimestamp();
  date1.getUnixTimestamp();
  
  var t = date1.subtract(date2); //date1 - date2，返回 CsTimeSpan
```

- CsTimeSpan 
```
  var t = CsTimeSpan.createNew(123);
  t.days();
  t.hours();
  t.minutes();
  t.seconds();
  t.milliseconds();
```
