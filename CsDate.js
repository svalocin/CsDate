(function (main) {
    //#region fecha
    /**
     * Parse or format dates
     * @class fecha
     */
    var fecha = {};
    var token = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;
    var twoDigits = /\d\d?/;
    var threeDigits = /\d{3}/;
    var fourDigits = /\d{4}/;
    var word = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;
    var literal = /\[([^]*?)\]/gm;
    var noop = function () {
    };

    function shorten(arr, sLen) {
        var newArr = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            newArr.push(arr[i].substr(0, sLen));
        }
        return newArr;
    }

    function monthUpdate(arrName) {
        return function (d, v, i18n) {
            var index = i18n[arrName].indexOf(v.charAt(0).toUpperCase() + v.substr(1).toLowerCase());
            if (~index) {
                d.month = index;
            }
        };
    }

    function pad(val, len) {
        val = String(val);
        len = len || 2;
        while (val.length < len) {
            val = '0' + val;
        }
        return val;
    }

    var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var monthNamesShort = shorten(monthNames, 3);
    var dayNamesShort = shorten(dayNames, 3);
    fecha.i18n = {
        dayNamesShort: dayNamesShort,
        dayNames: dayNames,
        monthNamesShort: monthNamesShort,
        monthNames: monthNames,
        amPm: ['am', 'pm'],
        DoFn: function DoFn(D) {
            return D + ['th', 'st', 'nd', 'rd'][D % 10 > 3 ? 0 : (D - D % 10 !== 10) * D % 10];
        }
    };

    var formatFlags = {
        D: function (dateObj) {
            return dateObj.getDate();
        },
        DD: function (dateObj) {
            return pad(dateObj.getDate());
        },
        Do: function (dateObj, i18n) {
            return i18n.DoFn(dateObj.getDate());
        },
        d: function (dateObj) {
            return dateObj.getDay();
        },
        dd: function (dateObj) {
            return pad(dateObj.getDay());
        },
        ddd: function (dateObj, i18n) {
            return i18n.dayNamesShort[dateObj.getDay()];
        },
        dddd: function (dateObj, i18n) {
            return i18n.dayNames[dateObj.getDay()];
        },
        M: function (dateObj) {
            return dateObj.getMonth() + 1;
        },
        MM: function (dateObj) {
            return pad(dateObj.getMonth() + 1);
        },
        MMM: function (dateObj, i18n) {
            return i18n.monthNamesShort[dateObj.getMonth()];
        },
        MMMM: function (dateObj, i18n) {
            return i18n.monthNames[dateObj.getMonth()];
        },
        YY: function (dateObj) {
            return String(dateObj.getFullYear()).substr(2);
        },
        YYYY: function (dateObj) {
            return dateObj.getFullYear();
        },
        h: function (dateObj) {
            return dateObj.getHours() % 12 || 12;
        },
        hh: function (dateObj) {
            return pad(dateObj.getHours() % 12 || 12);
        },
        H: function (dateObj) {
            return dateObj.getHours();
        },
        HH: function (dateObj) {
            return pad(dateObj.getHours());
        },
        m: function (dateObj) {
            return dateObj.getMinutes();
        },
        mm: function (dateObj) {
            return pad(dateObj.getMinutes());
        },
        s: function (dateObj) {
            return dateObj.getSeconds();
        },
        ss: function (dateObj) {
            return pad(dateObj.getSeconds());
        },
        S: function (dateObj) {
            return Math.round(dateObj.getMilliseconds() / 100);
        },
        SS: function (dateObj) {
            return pad(Math.round(dateObj.getMilliseconds() / 10), 2);
        },
        SSS: function (dateObj) {
            return pad(dateObj.getMilliseconds(), 3);
        },
        a: function (dateObj, i18n) {
            return dateObj.getHours() < 12 ? i18n.amPm[0] : i18n.amPm[1];
        },
        A: function (dateObj, i18n) {
            return dateObj.getHours() < 12 ? i18n.amPm[0].toUpperCase() : i18n.amPm[1].toUpperCase();
        },
        ZZ: function (dateObj) {
            var o = dateObj.getTimezoneOffset();
            return (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4);
        }
    };

    var parseFlags = {
        D: [twoDigits, function (d, v) {
            d.day = v;
        }],
        Do: [new RegExp(twoDigits.source + word.source), function (d, v) {
            d.day = parseInt(v, 10);
        }],
        M: [twoDigits, function (d, v) {
            d.month = v - 1;
        }],
        YY: [twoDigits, function (d, v) {
            var da = new Date(), cent = +('' + da.getFullYear()).substr(0, 2);
            d.year = '' + (v > 68 ? cent - 1 : cent) + v;
        }],
        h: [twoDigits, function (d, v) {
            d.hour = v;
        }],
        m: [twoDigits, function (d, v) {
            d.minute = v;
        }],
        s: [twoDigits, function (d, v) {
            d.second = v;
        }],
        YYYY: [fourDigits, function (d, v) {
            d.year = v;
        }],
        S: [/\d/, function (d, v) {
            d.millisecond = v * 100;
        }],
        SS: [/\d{2}/, function (d, v) {
            d.millisecond = v * 10;
        }],
        SSS: [threeDigits, function (d, v) {
            d.millisecond = v;
        }],
        d: [twoDigits, noop],
        ddd: [word, noop],
        MMM: [word, monthUpdate('monthNamesShort')],
        MMMM: [word, monthUpdate('monthNames')],
        a: [word, function (d, v, i18n) {
            var val = v.toLowerCase();
            if (val === i18n.amPm[0]) {
                d.isPm = false;
            } else if (val === i18n.amPm[1]) {
                d.isPm = true;
            }
        }],
        ZZ: [/[\+\-]\d\d:?\d\d/, function (d, v) {
            var parts = (v + '').match(/([\+\-]|\d\d)/gi), minutes;

            if (parts) {
                minutes = +(parts[1] * 60) + parseInt(parts[2], 10);
                d.timezoneOffset = parts[0] === '+' ? minutes : -minutes;
            }
        }]
    };
    parseFlags.dd = parseFlags.d;
    parseFlags.dddd = parseFlags.ddd;
    parseFlags.DD = parseFlags.D;
    parseFlags.mm = parseFlags.m;
    parseFlags.hh = parseFlags.H = parseFlags.HH = parseFlags.h;
    parseFlags.MM = parseFlags.M;
    parseFlags.ss = parseFlags.s;
    parseFlags.A = parseFlags.a;

    // Some common format strings
    fecha.masks = {
        'default': 'ddd MMM DD YYYY HH:mm:ss',
        shortDate: 'M/D/YY',
        mediumDate: 'MMM D, YYYY',
        longDate: 'MMMM D, YYYY',
        fullDate: 'dddd, MMMM D, YYYY',
        shortTime: 'HH:mm',
        mediumTime: 'HH:mm:ss',
        longTime: 'HH:mm:ss.SSS'
    };

    /***
     * Format a date
     * @method format
     * @param {Date|number} dateObj
     * @param {string} mask Format of the date, i.e. 'mm-dd-yy' or 'shortDate'
     */
    fecha.format = function (dateObj, mask, i18nSettings) {
        var i18n = i18nSettings || fecha.i18n;

        if (typeof dateObj === 'number') {
            dateObj = new Date(dateObj);
        }

        if (Object.prototype.toString.call(dateObj) !== '[object Date]' || isNaN(dateObj.getTime())) {
            throw new Error('Invalid Date in fecha.format');
        }

        mask = fecha.masks[mask] || mask || fecha.masks['default'];

        var literals = [];

        // Make literals inactive by replacing them with ??
        mask = mask.replace(literal, function ($0, $1) {
            literals.push($1);
            return '??';
        });
        // Apply formatting rules
        mask = mask.replace(token, function ($0) {
            return $0 in formatFlags ? formatFlags[$0](dateObj, i18n) : $0.slice(1, $0.length - 1);
        });
        // Inline literal values back into the formatted value
        return mask.replace(/\?\?/g, function () {
            return literals.shift();
        });
    };

    /**
     * Parse a date string into an object, changes - into /
     * @method parse
     * @param {string} dateStr Date string
     * @param {string} format Date parse format
     * @returns {Date|boolean}
     */
    fecha.parse = function (dateStr, format, i18nSettings) {
        var i18n = i18nSettings || fecha.i18n;

        if (typeof format !== 'string') {
            throw new Error('Invalid format in fecha.parse');
        }

        format = fecha.masks[format] || format;

        // Avoid regular expression denial of service, fail early for really long strings
        // https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS
        if (dateStr.length > 1000) {
            return false;
        }

        var isValid = true;
        var dateInfo = {};
        format.replace(token, function ($0) {
            if (parseFlags[$0]) {
                var info = parseFlags[$0];
                var index = dateStr.search(info[0]);
                if (!~index) {
                    isValid = false;
                } else {
                    dateStr.replace(info[0], function (result) {
                        info[1](dateInfo, result, i18n);
                        dateStr = dateStr.substr(index + result.length);
                        return result;
                    });
                }
            }

            return parseFlags[$0] ? '' : $0.slice(1, $0.length - 1);
        });

        if (!isValid) {
            return false;
        }

        var today = new Date();
        if (dateInfo.isPm === true && dateInfo.hour != null && +dateInfo.hour !== 12) {
            dateInfo.hour = +dateInfo.hour + 12;
        } else if (dateInfo.isPm === false && +dateInfo.hour === 12) {
            dateInfo.hour = 0;
        }

        var date;
        if (dateInfo.timezoneOffset != null) {
            dateInfo.minute = +(dateInfo.minute || 0) - +dateInfo.timezoneOffset;
            date = new Date(Date.UTC(dateInfo.year || today.getFullYear(), dateInfo.month || 0, dateInfo.day || 1,
              dateInfo.hour || 0, dateInfo.minute || 0, dateInfo.second || 0, dateInfo.millisecond || 0));
        } else {
            date = new Date(dateInfo.year || today.getFullYear(), dateInfo.month || 0, dateInfo.day || 1,
              dateInfo.hour || 0, dateInfo.minute || 0, dateInfo.second || 0, dateInfo.millisecond || 0);
        }
        return date;
    };
    //#endregion

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

    var CsDate = {
        /*
         * 创建一个 CsDate 对象
         * @method createNew
         * 多种参数模式：
         * 1. 不传参，创建当前时间的对象
         * 2. js 的 Date 对象
         * 3. Unix Timestamp 数值
         * 4. 时间字符串和其时间格式字符串（如果没有默认为 YYYY-MM-DD HH:mm:ss ）
         * 5. 按 year, month, day, hour, minute, second, millisecond 的顺序传入对应的数字（注意：使用 24 小时制度，月份从 1 开始计数）
         */
        createNew: function () {
            {
                var pvt = {};
                // 创建 js 的 Date 对象
                // args: 参数数组
                pvt.createJsDate = function (args) {
                    var jd = null;

                    try {
                        if (args.length == 0) {
                            //模式1
                            jd = new Date();
                        }
                        else if (args.length == 1 && args[0] instanceof Date) {
                            //模式2
                            jd = args[0];
                        }
                        else if (args.length == 1 && typeof args[0] == "number") {
                            //模式3
                            jd = new Date(args[0]);
                        }
                        else if ((args.length == 1 && typeof args[0] == "string")
                            || (args.length == 2 && typeof args[0] == "string" && typeof args[1] == "string")) {
                            //模式4
                            var format = args.length == 2 ? args[1] : DefaultDateFormat;
                            jd = fecha.parse(args[0], format);
                        }
                        else {
                            //模式5
                            var year = args[0] != undefined ? parseInt(args[0]) : null;
                            var month = args[1] != undefined ? parseInt(args[1]) - 1 : null;
                            var day = args[2] != undefined ? parseInt(args[2]) : null;
                            var hour = args[3] != undefined ? parseInt(args[3]) : null;
                            var minute = args[4] != undefined ? parseInt(args[4]) : null;
                            var second = args[5] != undefined ? parseInt(args[5]) : null;
                            var millisecond = args[6] != undefined ? parseInt(args[6]) : null;
                            jd = new Date(year, month, day, hour, minute, second, millisecond);
                        }
                    }
                    catch (e) {
                        e.message = "创建 CsDate 对象发生异常，异常消息为: " + e.message;
                        throw e;
                    }

                    if (jd == null || jd == undefined || !(jd instanceof Date)) throw new Error("无法正确创建 CsDate 对象，请检查传入参数");
                    else return jd;
                },
                // js 的 Date 对象
                pvt.jsDate = pvt.createJsDate(arguments);
            }

            var obj = {
                date: function () { return CsDate.createNew(pvt.jsDate.getFullYear(), pvt.jsDate.getMonth() + 1, pvt.jsDate.getDate()); },
                year: function () { return pvt.jsDate.getFullYear(); },
                month: function () { return pvt.jsDate.getMonth() + 1; },
                day: function () { return pvt.jsDate.getDate(); },
                hour: function () { return pvt.jsDate.getHours(); },
                minute: function () { return pvt.jsDate.getMinutes(); },
                second: function () { return pvt.jsDate.getSeconds(); },

                utcYear: function () { return pvt.jsDate.getUTCFullYear(); },
                utcMonth: function () { return pvt.jsDate.getUTCMonth() + 1; },
                utcDay: function () { return pvt.jsDate.getUTCDate(); },
                utcHour: function () { return pvt.jsDate.getUTCHours(); },
                utcMinute: function () { return pvt.jsDate.getUTCMinutes(); },
                utcSecond: function () { return pvt.jsDate.getUTCSeconds(); },

                toString: function (format) {
                    if (format == undefined || format == null || typeof format != "string") {
                        format = DefaultDateFormat;
                    }
                    return fecha.format(pvt.jsDate, format);
                },
                toUtcString: function (format) {
                    var date = new Date(pvt.jsDate.getUTCFullYear(), pvt.jsDate.getUTCMonth(), pvt.jsDate.getUTCDate(),
                                pvt.jsDate.getUTCHours(), pvt.jsDate.getUTCMinutes(), pvt.jsDate.getUTCSeconds());

                    if (format == undefined || format == null || typeof format != "string") {
                        format = DefaultDateFormat;
                    }
                    return fecha.format(date, format);
                },

                addDays: function (n) { pvt.jsDate.setDate(pvt.jsDate.getDate() + n); },
                addHours: function (n) { pvt.jsDate.setHours(pvt.jsDate.getHours() + n); },
                addMinutes: function (n) { pvt.jsDate.setMinutes(pvt.jsDate.getMinutes() + n); },
                addMonths: function (n) { pvt.jsDate.setMonth(pvt.jsDate.getMonth() + n); },
                addSeconds: function (n) { pvt.jsDate.setSeconds(pvt.jsDate.getSeconds() + n); },
                addYears: function (n) { pvt.jsDate.setFullYear(pvt.jsDate.getFullYear() + n); },

                isEqual: function (csDate) { return obj.getUnixTimestamp() == csDate.getUnixTimestamp(); },
                isGreater: function (csDate) { return obj.getUnixTimestamp() > csDate.getUnixTimestamp(); },
                isLess: function (csDate) { return obj.getUnixTimestamp() < csDate.getUnixTimestamp(); },
                isGreaterOrEqual: function (csDate) { return obj.getUnixTimestamp() >= csDate.getUnixTimestamp(); },
                isLessOrEqual: function (csDate) { return obj.getUnixTimestamp() <= csDate.getUnixTimestamp(); },

                getUnixTimestamp: function () {
                    return pvt.jsDate.getTime();
                },
                getTimestamp: function () {
                    return 621355968000000000 + (pvt.jsDate.getTime() * 10000);
                },

                /*
                 * 与一个 CsDate 相减
                 * @method subtract
                 * @param {CsDate} CsDate
                 * @returns {CsTimeSpan}
                 */
                subtract: function (csDate) {
                    var n = obj.getTimestamp() - csDate.getTimestamp();
                    return CsTimeSpan.createNew(n);
                },

                /*
                 * 返回当前 CsDate 对象的拷贝
                 * @method copy
                 * @returns {CsDate}
                 */
                copy: function () {
                    return CsDate.createNew(obj.getUnixTimestamp());
                },
            }

            return obj;
        },

        /* 从 C# 的 /Date(1364214050747)/ 转换 */
        parseByCs: function (s) {
            var re = /-?\d+/;
            var m = re.exec(s);
            var n = Number(m[0]);
            return CsDate.createNew(n);
        }
    };

    var CsTimeSpan = {
        /*
         * 创建一个 CsTimeSpan 对象
         * @method createNew
         * @param {int} timespan
         * @returns {CsTimeSpan}
         */
        createNew: function (timespan) {
            var pvt = {
                timespan: parseInt(timespan),
            };

            var obj = {
                days: function () { return pvt.timespan / TicksPerDay; },
                hours: function () { return pvt.timespan / TicksPerHour; },
                minutes: function () { return pvt.timespan / TicksPerMinute; },
                seconds: function () { return pvt.timespan / TicksPerSecond; },
                milliseconds: function () { return pvt.timespan / TicksPerMillisecond; },
                //ticks: function () { return pvt.timespan; },

                toString: function () { pvt.timespan.toString(); }
            };

            return obj;
        }
    };

    main.CsDate = CsDate;
    main.CsTimeSpan = CsTimeSpan;
})(this);
