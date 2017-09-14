var fecha = require("fecha");

// 默认时间字符串格式
const DefaultDateFormat = "YYYY-MM-DD HH:mm:ss";
// 表示一天中的刻度数（常量）
const TicksPerDay = 864000000000;
// 表示 1 小时的刻度数（常量）
const TicksPerHour = 36000000000;
// 表示 1 毫秒的刻度数（常量）
const TicksPerMillisecond = 10000;
// 表示 1 分钟的刻度数（常量）
const TicksPerMinute = 600000000;
// 表示 1 秒的刻度数。
const TicksPerSecond = 10000000;

class CsDate {
  static parseByCs(s) {
    var re = /-?\d+/;
    var m = re.exec(s);
    var n = Number(m[0]);
    return new CsDate(n);
  }

  constructor() {
    this.date = null;

    try {
      if (arguments.length == 0) {
        //模式1
        this.date = new Date();
      } else if (arguments.length == 1 && arguments[0] instanceof Date) {
        //模式2
        this.date = arguments[0];
      } else if (arguments.length == 1 && typeof arguments[0] == "number") {
        //模式3
        this.date = new Date(arguments[0] * 1000);
      } else if (
        (arguments.length == 1 && typeof arguments[0] == "string") ||
        (arguments.length == 2 &&
          typeof arguments[0] == "string" &&
          typeof arguments[1] == "string")
      ) {
        //模式4
        var format = arguments.length == 2 ? arguments[1] : DefaultDateFormat;
        this.date = fecha.parse(arguments[0], format);
      } else {
        //模式5
        var year = arguments[0] != undefined ? parseInt(arguments[0]) : null;
        var month =
          arguments[1] != undefined ? parseInt(arguments[1]) - 1 : null;
        var day = arguments[2] != undefined ? parseInt(arguments[2]) : null;
        var hour = arguments[3] != undefined ? parseInt(arguments[3]) : null;
        var minute = arguments[4] != undefined ? parseInt(arguments[4]) : null;
        var second = arguments[5] != undefined ? parseInt(arguments[5]) : null;
        var millisecond =
          arguments[6] != undefined ? parseInt(arguments[6]) : null;
        this.date = new Date(
          year,
          month,
          day,
          hour,
          minute,
          second,
          millisecond
        );
      }
    } catch (e) {
      e.message = "create CsDate fail, error: " + e.message;
      throw e;
    }

    if (
      this.date == undefined ||
      this.date == null ||
      !(this.date instanceof Date)
    ) {
      throw new Error("create CsDate fail");
    }

    console.log(this.date);
  }

  date() {
    return new CsDate(
      this.date.getFullYear(),
      this.date.getMonth() + 1,
      this.date.getDate()
    );
  }
  year() {
    return this.date.getFullYear();
  }
  month() {
    return this.date.getMonth() + 1;
  }
  day() {
    return this.date.getDate();
  }
  hour() {
    return this.date.getHours();
  }
  minute() {
    return this.date.getMinutes();
  }
  second() {
    return this.date.getSeconds();
  }

  utcYear() {
    return this.date.getUTCFullYear();
  }
  utcMonth() {
    return this.date.getUTCMonth() + 1;
  }
  utcDay() {
    return this.date.getUTCDate();
  }
  utcHour() {
    return this.date.getUTCHours();
  }
  utcMinute() {
    return this.date.getUTCMinutes();
  }
  utcSecond() {
    return this.date.getUTCSeconds();
  }

  toString(format) {
    if (format == undefined || format == null || typeof format != "string") {
      format = DefaultDateFormat;
    }
    return fecha.format(this.date, format);
  }
  toUtcString(format) {
    var date = new Date(
      this.date.getUTCFullYear(),
      this.date.getUTCMonth(),
      this.date.getUTCDate(),
      this.date.getUTCHours(),
      this.date.getUTCMinutes(),
      this.date.getUTCSeconds()
    );

    if (format == undefined || format == null || typeof format != "string") {
      format = DefaultDateFormat;
    }

    return fecha.format(date, format);
  }

  addDays(n) {
    this.date.setDate(this.date.getDate() + n);
    return this;
  }
  addHours(n) {
    this.date.setHours(this.date.getHours() + n);
    return this;
  }
  addMinutes(n) {
    this.date.setMinutes(this.date.getMinutes() + n);
    return this;
  }
  addMonths(n) {
    this.date.setMonth(this.date.getMonth() + n);
    return this;
  }
  addSeconds(n) {
    this.date.setSeconds(this.date.getSeconds() + n);
    return this;
  }
  addYears(n) {
    this.date.setFullYear(this.date.getFullYear() + n);
    return this;
  }

  isEqual(csDate) {
    return this.getUnixTimestamp() == csDate.getUnixTimestamp();
  }
  isGreater(csDate) {
    return this.getUnixTimestamp() > csDate.getUnixTimestamp();
  }
  isLess(csDate) {
    return this.getUnixTimestamp() < csDate.getUnixTimestamp();
  }
  isGreaterOrEqual(csDate) {
    return this.getUnixTimestamp() >= csDate.getUnixTimestamp();
  }
  isLessOrEqual(csDate) {
    return this.getUnixTimestamp() <= csDate.getUnixTimestamp();
  }

  getUnixTimestamp() {
    return this.date.getTime();
  }
  getTimestamp() {
    return 621355968000000000 + this.date.getTime() * 10000;
  }

  subtract(date) {
    if (!(date instanceof CsDate)) date = new CsDate(date);
    var n = this.getTimestamp() - date.getTimestamp();
    return new CsTimeSpan(n);
  }

  copy() {
    return new CsDate(this.getUnixTimestamp());
  }
}

class CsTimeSpan {
  constructor(timespan) {
    this.timespan = parseInt(timespan);
  }

  days() {
    return this.timespan / TicksPerDay;
  }
  hours() {
    return this.timespan / TicksPerHour;
  }
  minutes() {
    return this.timespan / TicksPerMinute;
  }
  seconds() {
    return this.timespan / TicksPerSecond;
  }
  milliseconds() {
    return this.timespan / TicksPerMillisecond;
  }
  ticks() {
    return this.timespan;
  }

  toString() {
    this.timespan.toString();
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { CsDate, CsTimeSpan }; // const { CsDate, CsTimeSpan } = require('./people.js');
}
