# CsDate
A date class of js, it inspired C# DateTime, format used [fecha](https://github.com/taylorhakes/fecha).

### 用法: 
- Create CsDate
```
  var date1 = new CsDate(); // now
  var date2 = new CsDate(new Date());
  var date2 = new CsDate(1473144953938); // Unix Timestamp
  var date3 = new CsDate("2016年09月06日 12时36分49秒", "YYYY年MM月DD日 HH时mm分ss秒");
  var date4 = new CsDate(2016, 1, 1, 12, 0, 0, 0);
  var date5 = CsDate.parseByCs('\/Date(1245398693390)\/'); // parse C#'s DateTime string
  var date6 = date5.copy();
```
  
- CsDate 的方法
```
  //Default Date Format: YYYY-MM-DD HH:mm:ss
  
  date1.date(); // get date, example: 2017/09/14 15:00:00 -> 2017/09/14 00:00:00
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
  
  date1.toString("YYYY年MM月DD日 HH时mm分ss秒");
  date1.toUtcString("YYYY年MM月DD日 HH时mm分ss秒");
  
  date1.addDays(1);
  date1.addHours(1);
  date1.addMinutes(1);
  date1.addMonths(1);
  date1.addSeconds(1);
  date1.addYears(1);
  
  date1.isEqual(date2);             // 是否等于
  date1.isGreater(date2);           // 是否大于
  date1.isLess(date2);              // 是否小于
  date1.isGreaterOrEqual(date2);    // 是否大于等于
  date1.isLessOrEqual(date2);       // 是否小于等于
  
  date1.getTimestamp();
  date1.getUnixTimestamp();
  
  var t = date1.subtract(date2); //date1 - date2, return CsTimeSpan
```

- CsTimeSpan 
```
  var t = new CsTimeSpan(123);
  t.days();
  t.hours();
  t.minutes();
  t.seconds();
  t.milliseconds();
```
