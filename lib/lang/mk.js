function join_with_shared_prefix(a, b, joiner) {
  var m = a,
      i = 0,
      j;

  /* HACK: This gets around "today through on Tuesday" or cases like it, which
   * are incorrect in English. */
  if(m === "today" || m === "tomorrow")
    m = " " + m;

  while(i !== m.length &&
        i !== b.length &&
        m.charCodeAt(i) === b.charCodeAt(i))
    ++i;

  while(i && m.charCodeAt(i - 1) !== 32)
    --i;

  return a + joiner + b.slice(i);
}

function strip_prefix(period) {
  return period.slice(0, 9) === "overnight" ? period.slice(4) :
         period.slice(0, 7) ===   "in the " ? period.slice(7) :
                                              period;
}

module.exports = require("../template")({
  "clear":                             "ведро", 
  "no-precipitation":                  "без врнежи",
  "mixed-precipitation":               "мешани врнежи",
  "possible-very-light-precipitation": "можност за многу слаби врнежи",
  "very-light-precipitation":          "многу слаби врнежи",
  "possible-light-precipitation":      "можност за слаби врнежи",
  "light-precipitation":               "слаби врнежи",
  "medium-precipitation":              "врнежи",
  "heavy-precipitation":               "силни врнежи",
  "possible-very-light-rain":          "можност за многу слаб дожд",
  "very-light-rain":                   "многу слаб дожд",
  "possible-light-rain":               "можност за слаб дожд",
  "light-rain":                        "слаб дожд",
  "medium-rain":                       "дожд",
  "heavy-rain":                        "силен дожд",
  "possible-very-light-sleet":         "можност за појава на многу слаба лапавица",
  "very-light-sleet":                  "многу слаба лапавица",
  "possible-light-sleet":              "можност за појава на слаба лапавица",
  "light-sleet":                       "слаба лапавица",
  "medium-sleet":                      "лапавица",
  "heavy-sleet":                       "силна лапавица",
  "possible-very-light-snow":          "можност за многу слаб снег",
  "very-light-snow":                   "многу слаб снег",
  "possible-light-snow":               "можност за слаб снег",
  "light-snow":                        "слаб снег",
  "medium-snow":                       "снег",
  "heavy-snow":                        "снег",
  "possible-thunderstorm":             "можност за грмотевици",
  "thunderstorm":                      "грмотевици",
  "light-wind":                        "ветровито", 
  "medium-wind":                       "ветер",
  "heavy-wind":                        "силен ветер",
  "low-humidity":                      "суво",
  "high-humidity":                     "влажно",
  "fog":                               "магловито",
  "light-clouds":                      "на места облачно",
  "medium-clouds":                     "претежно облачно", 
  "heavy-clouds":                      "облачно",
  "today-morning":                     "ова утро",
  "later-today-morning":               "подоцна ова утро",
  "today-afternoon":                   "попладне",
  "later-today-afternoon":             "подоцна ова попладне",
  "today-evening":                     "вечерва",
  "later-today-evening":               "доцна навечер",
  "today-night":                       "ноќва",
  "later-today-night":                 "доцна ноќва",
  "tomorrow-morning":                  "утре наутро",
  "tomorrow-afternoon":                "утро попладне",
  "tomorrow-evening":                  "утре вечер",
  "tomorrow-night":                    "утре навечер",
  "morning":                           "утро",
  "afternoon":                         "попладне",
  "evening":                           "вечер",
  "night":                             "ноќ",  
  "today":                             "денес",
  "tomorrow":                          "утре",
  "monday":                            "понеделник",
  "tuesday":                           "вторник",
  "wednesday":                         "среда",
  "thursday":                          "четврток",
  "friday":                            "петок",
  "saturday":                          "сабота",
  "sunday":                            "недела",
  "next-monday":                       "нареден понеделник",
  "next-tuesday":                      "нареден вторник",
  "next-wednesday":                    "наредна среда",
  "next-thursday":                     "нареден четврток",
  "next-friday":                       "нареден петок",
  "next-saturday":                     "наредна сабота", 
  "next-sunday":                       "наредна недела",
  "minutes":                           "$1 минути",
  "fahrenheit":                        "$1\u00B0F",
  "celsius":                           "$1\u00B0C",
  "inches":                            "$1 инчи",
  "centimeters":                       "$1cm",
  "less-than":                         "помалку од $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a, //time_var(a, "u", this),
      b, //time_var(b, "u", this),
      " и " //get_prefix(b, this)
    );
  },
  "through": function(a, b) {
    return "од " + join_with_shared_prefix(
      a, //time_var(a, "od", this),
      b, //time_var(b, "do", this),
      " до "
    );
  },
  "with": "$1, со $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "$1 во овој час",
  "starting-in": "$1 почнува за $2",
  "stopping-in": "$1 престанува за $2",
  "starting-then-stopping-later": "$1 почнува за $2, а престанува за $3",
  "stopping-then-starting-later": "$1 престанува за $2, а почнува за $3",
  "for-day": "$1 во текот на целиот ден",
  "starting": function(condition, time) {
    return condition + " почнува " + time;
  },
  "until": function(condition, time) {
    return condition + " до " + time;
  },
  "until-starting-again": function(condition, until, again) {
    return condition + " до " + until + " и повторно почнува " + again;
  },
  "starting-continuing-until": function(condition, from, to) {
    //from = time_var(from,  "", this);
    //to   = time_var(  to, "u", this);
    return condition + " почнува од " + from +
      ", продолжува до " + to;
  },
  "during": function(condition, time) { //TODO
    //time = time_var(time, "u", this);

    return (this[1] === "and")?
      (time + " " + condition):
      (condition + " " + time);
  },
  "for-week": "$1 во текот на неделата",
  "over-weekend": "$1 за време на викендот",
  "temperatures-peaking": function(a, b) {
    return "температура највисока до " + a + " " + b;   //time_var(b, "u", this);
  },
  "temperatures-rising": function(a, b) {
    return "пораст на температурата до " + a + " " + b; //time_var(b, "u", this);
  },
  "temperatures-valleying": function(a, b) {
    return "температура најниска до " + a + " " + b;     //time_var(b, "u", this);
  },
  "temperatures-falling": function(a, b) {
    return "пад на температурата до " + a + " " + b;      //time_var(b, "u", this);
  },
  /* Capitalize the first letter of every word. */
  "title": function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  /* Capitalize the first word of the sentence and end with a period. */
  "sentence": function(str) {
    /* Capitalize. */
    str = str.charAt(0).toUpperCase() + str.slice(1);

    /* Add a period if there isn't already one. */
    if(str.charAt(str.length - 1) !== ".")
      str += ".";

    return str;
  }
});
