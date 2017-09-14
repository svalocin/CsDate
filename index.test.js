const expect = require("chai").expect;
const { CsDate, CsTimeSpan } = require("./index");

describe("test create CsDate", function() {
  function create(func) {
    try {
      func();
      return true;
    } catch (e) {
      return false;
    }
  }

  it("new CsDate()", function() {
    expect(
      create(function() {
        new CsDate();
      })
    ).to.be.ok;
  });

  it("new CsDate(new Date())", function() {
    expect(
      create(function() {
        new CsDate(new Date());
      })
    ).to.be.ok;
  });

  it("CsDate.parseByCs('/Date(1245398693390)/')", function() {
    expect(
      create(function() {
        CsDate.parseByCs("/Date(1245398693390)/");
      })
    ).to.be.ok;
  });

  it("copy", function() {
    expect(
      create(function() {
        var date = new CsDate();
        date.copy();
      })
    ).to.be.ok;
  });
});

describe("test CsDate", function() {
  var date = new CsDate(1505318400);

  it("year()", function() {
    expect(date.year()).to.be.equal(2017);
  });
  it("month()", function() {
    expect(date.month()).to.be.equal(9);
  });
  it("day()", function() {
    expect(date.day()).to.be.equal(14);
  });
  it("hour()", function() {
    expect(date.hour()).to.be.equal(0);
  });
  it("minute()", function() {
    expect(date.minute()).to.be.equal(0);
  });
  it("second()", function() {
    expect(date.second()).to.be.equal(0);
  });

  it("utcYear()", function() {
    expect(date.utcYear()).to.be.equal(2017);
  });
  it("utcMonth()", function() {
    expect(date.utcMonth()).to.be.equal(9);
  });
  it("utcDay()", function() {
    expect(date.utcDay()).to.be.equal(13);
  });
  it("utcHour()", function() {
    expect(date.utcHour()).to.be.equal(16);
  });
  it("utcMinute()", function() {
    expect(date.utcMinute()).to.be.equal(0);
  });
  it("utcSecond()", function() {
    expect(date.utcSecond()).to.be.equal(0);
  });

  it("toString()", function() {
    expect(date.toString("YYYY年MM月DD日 HH时mm分ss秒")).to.be.equal(
      "2017年09月14日 00时00分00秒"
    );
  });
  it("toUtcString()", function() {
    expect(date.toUtcString("YYYY年MM月DD日 HH时mm分ss秒")).to.be.equal(
      "2017年09月13日 16时00分00秒"
    );
  });

  it("addYears()", function() {
    expect(date.addYears(1).year()).to.be.equal(2018);
  });
  it("addMonths()", function() {
    expect(date.addMonths(1).month()).to.be.equal(10);
  });
  it("addDays()", function() {
    expect(date.addDays(1).day()).to.be.equal(15);
  });
  it("addHours()", function() {
    expect(date.addHours(1).hour()).to.be.equal(1);
  });
  it("addMinutes()", function() {
    expect(date.addMinutes(1).minute()).to.be.equal(1);
  });
  it("addSeconds()", function() {
    expect(date.addSeconds(1).second()).to.be.equal(1);
  });
});

describe("test CsTimeSpan", function() {
  var date1 = new CsDate(2017, 9, 14);
  var date2 = new CsDate("2017年09月15日 00时00分00秒", "YYYY年MM月DD日 HH时mm分ss秒");
  var t = date2.subtract(date1);

  it("days()", function() {
    expect(t.days()).to.be.equal(1);
  });
  it("hours()", function() {
    expect(t.hours()).to.be.equal(24);
  });
  it("minutes()", function() {
    expect(t.minutes()).to.be.equal(1440);
  });
  it("seconds()", function() {
    expect(t.seconds()).to.be.equal(86400);
  });
  it("milliseconds()", function() {
    expect(t.milliseconds()).to.be.equal(86400000);
  });
});
