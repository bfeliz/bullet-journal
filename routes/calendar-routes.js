var Calendar = require("moment-calendar");

var calendar = new Calendar({
  // name of the property in event objects containing the start date
  eventStartDate: "start",
  // name of the property in event objects containing the end date
  eventEndDate: "end",
  // locale
  locale: "en"
});

var event = {
  start: new Date(), // begins now
  end: new Date().getTime() + 1000 * 60 * 60 * 24 // ends in one day
};

// calendar is an array like object
calendar.push(event);

// returns new calendar containing events within the year
var eventsInYear = calendar.findInYear('?');

// events are always sorted by theire start date

var events = calendar
  .findInYear(year)
  .findInMonth(month)
  .findInDate(date);

// you can also query ranges, a new calendar is returned
var eventsInRange = calendar.findInRange("000-01-01", "0000-12-31");

// returns a list of months, the list items are calendar instances too
var months = calendar.months();

months.forEach(function(month, i) {
  // list of weeks within the month
  var weeks = month.weeks();

  weeks.forEach(function(week, i) {
    // list of days within the month
    var days = week.days();

    days.forEach(function(day, i) {
      // list of hours within the day
      var hours = day.hours();

      hours.forEach(function(hour, i) {
        // list of activities within the hour
        var activities = day.events();
      });
    });
  });
});
