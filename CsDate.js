"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fecha = require("fecha");

// 默认时间字符串格式
var DefaultDateFormat = "YYYY-MM-DD HH:mm:ss";
// 表示一天中的刻度数（常量）
var TicksPerDay = 864000000000;
// 表示 1 小时的刻度数（常量）
var TicksPerHour = 36000000000;
// 表示 1 毫秒的刻度数（常量）
var TicksPerMillisecond = 10000;
// 表示 1 分钟的刻度数（常量）
var TicksPerMinute = 600000000;
// 表示 1 秒的刻度数。
var TicksPerSecond = 10000000;

var CsDate = function () {
  _createClass(CsDate, null, [{
    key: "parseByCs",
    value: function parseByCs(s) {
      var re = /-?\d+/;
      var m = re.exec(s);
      var n = Number(m[0]);
      return new CsDate(n);
    }
  }]);

  function CsDate() {
    _classCallCheck(this, CsDate);

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
      } else if (arguments.length == 1 && typeof arguments[0] == "string" || arguments.length == 2 && typeof arguments[0] == "string" && typeof arguments[1] == "string") {
        //模式4
        var format = arguments.length == 2 ? arguments[1] : DefaultDateFormat;
        this.date = fecha.parse(arguments[0], format);
      } else {
        //模式5
        var year = arguments[0] != undefined ? parseInt(arguments[0]) : null;
        var month = arguments[1] != undefined ? parseInt(arguments[1]) - 1 : null;
        var day = arguments[2] != undefined ? parseInt(arguments[2]) : null;
        var hour = arguments[3] != undefined ? parseInt(arguments[3]) : null;
        var minute = arguments[4] != undefined ? parseInt(arguments[4]) : null;
        var second = arguments[5] != undefined ? parseInt(arguments[5]) : null;
        var millisecond = arguments[6] != undefined ? parseInt(arguments[6]) : null;
        this.date = new Date(year, month, day, hour, minute, second, millisecond);
      }
    } catch (e) {
      e.message = "create CsDate fail, error: " + e.message;
      throw e;
    }

    if (this.date == undefined || this.date == null || !(this.date instanceof Date)) {
      throw new Error("create CsDate fail");
    }

    console.log(this.date);
  }

  _createClass(CsDate, [{
    key: "date",
    value: function date() {
      return new CsDate(this.date.getFullYear(), this.date.getMonth() + 1, this.date.getDate());
    }
  }, {
    key: "year",
    value: function year() {
      return this.date.getFullYear();
    }
  }, {
    key: "month",
    value: function month() {
      return this.date.getMonth() + 1;
    }
  }, {
    key: "day",
    value: function day() {
      return this.date.getDate();
    }
  }, {
    key: "hour",
    value: function hour() {
      return this.date.getHours();
    }
  }, {
    key: "minute",
    value: function minute() {
      return this.date.getMinutes();
    }
  }, {
    key: "second",
    value: function second() {
      return this.date.getSeconds();
    }
  }, {
    key: "utcYear",
    value: function utcYear() {
      return this.date.getUTCFullYear();
    }
  }, {
    key: "utcMonth",
    value: function utcMonth() {
      return this.date.getUTCMonth() + 1;
    }
  }, {
    key: "utcDay",
    value: function utcDay() {
      return this.date.getUTCDate();
    }
  }, {
    key: "utcHour",
    value: function utcHour() {
      return this.date.getUTCHours();
    }
  }, {
    key: "utcMinute",
    value: function utcMinute() {
      return this.date.getUTCMinutes();
    }
  }, {
    key: "utcSecond",
    value: function utcSecond() {
      return this.date.getUTCSeconds();
    }
  }, {
    key: "toString",
    value: function toString(format) {
      if (format == undefined || format == null || typeof format != "string") {
        format = DefaultDateFormat;
      }
      return fecha.format(this.date, format);
    }
  }, {
    key: "toUtcString",
    value: function toUtcString(format) {
      var date = new Date(this.date.getUTCFullYear(), this.date.getUTCMonth(), this.date.getUTCDate(), this.date.getUTCHours(), this.date.getUTCMinutes(), this.date.getUTCSeconds());

      if (format == undefined || format == null || typeof format != "string") {
        format = DefaultDateFormat;
      }

      return fecha.format(date, format);
    }
  }, {
    key: "addDays",
    value: function addDays(n) {
      this.date.setDate(this.date.getDate() + n);
      return this;
    }
  }, {
    key: "addHours",
    value: function addHours(n) {
      this.date.setHours(this.date.getHours() + n);
      return this;
    }
  }, {
    key: "addMinutes",
    value: function addMinutes(n) {
      this.date.setMinutes(this.date.getMinutes() + n);
      return this;
    }
  }, {
    key: "addMonths",
    value: function addMonths(n) {
      this.date.setMonth(this.date.getMonth() + n);
      return this;
    }
  }, {
    key: "addSeconds",
    value: function addSeconds(n) {
      this.date.setSeconds(this.date.getSeconds() + n);
      return this;
    }
  }, {
    key: "addYears",
    value: function addYears(n) {
      this.date.setFullYear(this.date.getFullYear() + n);
      return this;
    }
  }, {
    key: "isEqual",
    value: function isEqual(csDate) {
      return this.getUnixTimestamp() == csDate.getUnixTimestamp();
    }
  }, {
    key: "isGreater",
    value: function isGreater(csDate) {
      return this.getUnixTimestamp() > csDate.getUnixTimestamp();
    }
  }, {
    key: "isLess",
    value: function isLess(csDate) {
      return this.getUnixTimestamp() < csDate.getUnixTimestamp();
    }
  }, {
    key: "isGreaterOrEqual",
    value: function isGreaterOrEqual(csDate) {
      return this.getUnixTimestamp() >= csDate.getUnixTimestamp();
    }
  }, {
    key: "isLessOrEqual",
    value: function isLessOrEqual(csDate) {
      return this.getUnixTimestamp() <= csDate.getUnixTimestamp();
    }
  }, {
    key: "getUnixTimestamp",
    value: function getUnixTimestamp() {
      return this.date.getTime();
    }
  }, {
    key: "getTimestamp",
    value: function getTimestamp() {
      return 621355968000000000 + this.date.getTime() * 10000;
    }
  }, {
    key: "subtract",
    value: function subtract(date) {
      if (!(date instanceof CsDate)) date = new CsDate(date);
      var n = this.getTimestamp() - date.getTimestamp();
      return new CsTimeSpan(n);
    }
  }, {
    key: "copy",
    value: function copy() {
      return new CsDate(this.getUnixTimestamp());
    }
  }]);

  return CsDate;
}();

var CsTimeSpan = function () {
  function CsTimeSpan(timespan) {
    _classCallCheck(this, CsTimeSpan);

    this.timespan = parseInt(timespan);
  }

  _createClass(CsTimeSpan, [{
    key: "days",
    value: function days() {
      return this.timespan / TicksPerDay;
    }
  }, {
    key: "hours",
    value: function hours() {
      return this.timespan / TicksPerHour;
    }
  }, {
    key: "minutes",
    value: function minutes() {
      return this.timespan / TicksPerMinute;
    }
  }, {
    key: "seconds",
    value: function seconds() {
      return this.timespan / TicksPerSecond;
    }
  }, {
    key: "milliseconds",
    value: function milliseconds() {
      return this.timespan / TicksPerMillisecond;
    }
  }, {
    key: "ticks",
    value: function ticks() {
      return this.timespan;
    }
  }, {
    key: "toString",
    value: function toString() {
      this.timespan.toString();
    }
  }]);

  return CsTimeSpan;
}();

if (typeof module !== "undefined" && module.exports) {
  module.exports = { CsDate: CsDate, CsTimeSpan: CsTimeSpan }; // const { CsDate, CsTimeSpan } = require('./people.js');
}
