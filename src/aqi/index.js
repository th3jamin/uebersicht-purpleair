export function Linear(AQIhigh, AQIlow, Conchigh, Conclow, Concentration) {
  var linear;
  var Conc = parseFloat(Concentration);
  var a;
  a = ((Conc - Conclow) / (Conchigh - Conclow)) * (AQIhigh - AQIlow) + AQIlow;
  linear = Math.round(a);
  return linear;
}

export function AQIPM25(Concentration) {
  if (Concentration < 0) {
    return -1;
  }

  var Conc = parseFloat(Concentration);
  var c;
  var AQI;
  c = (Math.floor(10 * Conc)) / 10;
  if (c >= 0 && c < 12.1) {
    AQI = Linear(50, 0, 12, 0, c);
  } else if (c >= 12.1 && c < 35.5) {
    AQI = Linear(100, 51, 35.4, 12.1, c);
  } else if (c >= 35.5 && c < 55.5) {
    AQI = Linear(150, 101, 55.4, 35.5, c);
  } else if (c >= 55.5 && c < 150.5) {
    AQI = Linear(200, 151, 150.4, 55.5, c);
  } else if (c >= 150.5 && c < 250.5) {
    AQI = Linear(300, 201, 250.4, 150.5, c);
  } else if (c >= 250.5 && c < 350.5) {
    AQI = Linear(400, 301, 350.4, 250.5, c);
  } else if (c >= 350.5 && c < 500.5) {
    AQI = Linear(500, 401, 500.4, 350.5, c);
  } else {
    AQI = 500;
  }
  return AQI;
}
//line63
export function AQIPM10(Concentration) {
  var Conc = parseFloat(Concentration);
  var c;
  var AQI;
  c = Math.floor(Conc);
  if (c >= 0 && c < 55) {
    AQI = Linear(50, 0, 54, 0, c);
  } else if (c >= 55 && c < 155) {
    AQI = Linear(100, 51, 154, 55, c);
  } else if (c >= 155 && c < 255) {
    AQI = Linear(150, 101, 254, 155, c);
  } else if (c >= 255 && c < 355) {
    AQI = Linear(200, 151, 354, 255, c);
  } else if (c >= 355 && c < 425) {
    AQI = Linear(300, 201, 424, 355, c);
  } else if (c >= 425 && c < 505) {
    AQI = Linear(400, 301, 504, 425, c);
  } else if (c >= 505 && c < 605) {
    AQI = Linear(500, 401, 604, 505, c);
  } else {
    AQI = "PM10message";
  }
  return AQI;
}
//line104
export function AQICO(Concentration) {
  var Conc = parseFloat(Concentration);
  var c;
  var AQI;
  c = (Math.floor(10 * Conc)) / 10;
  if (c >= 0 && c < 4.5) {
    AQI = Linear(50, 0, 4.4, 0, c);
  } else if (c >= 4.5 && c < 9.5) {
    AQI = Linear(100, 51, 9.4, 4.5, c);
  } else if (c >= 9.5 && c < 12.5) {
    AQI = Linear(150, 101, 12.4, 9.5, c);
  } else if (c >= 12.5 && c < 15.5) {
    AQI = Linear(200, 151, 15.4, 12.5, c);
  } else if (c >= 15.5 && c < 30.5) {
    AQI = Linear(300, 201, 30.4, 15.5, c);
  } else if (c >= 30.5 && c < 40.5) {
    AQI = Linear(400, 301, 40.4, 30.5, c);
  } else if (c >= 40.5 && c < 50.5) {
    AQI = Linear(500, 401, 50.4, 40.5, c);
  } else {
    AQI = "Out of Range";
  }
  return AQI;
}
//line145
export function AQISO21hr(Concentration) {
  var Conc = parseFloat(Concentration);
  var c;
  var AQI;
  c = Math.floor(Conc);
  if (c >= 0 && c < 36) {
    AQI = Linear(50, 0, 35, 0, c);
  } else if (c >= 36 && c < 76) {
    AQI = Linear(100, 51, 75, 36, c);
  } else if (c >= 76 && c < 186) {
    AQI = Linear(150, 101, 185, 76, c);
  } else if (c >= 186 && c <= 304) {
    AQI = Linear(200, 151, 304, 186, c);
  } else if (c >= 304 && c <= 604) {
    AQI = "SO21hrmessage";
  } else {
    AQI = "Out of Range";
  }
  return AQI;
}

export function AQISO224hr(Concentration) {
  var Conc = parseFloat(Concentration);
  var c;
  var AQI;
  c = Math.floor(Conc);
  if (c >= 0 && c <= 304) {
    AQI = "SO224hrmessage";
  } else if (c >= 304 && c < 605) {
    AQI = Linear(300, 201, 604, 305, c);
  } else if (c >= 605 && c < 805) {
    AQI = Linear(400, 301, 804, 605, c);
  } else if (c >= 805 && c <= 1004) {
    AQI = Linear(500, 401, 1004, 805, c);
  } else {
    AQI = "Out of Range";
  }
  return AQI;
}
//line186
export function AQIOzone8hr(Concentration) {
  var Conc = parseFloat(Concentration);
  var c;
  var AQI;
  c = (Math.floor(Conc)) / 1000;

  if (c >= 0 && c < .055) {
    AQI = Linear(50, 0, 0.054, 0, c);
  } else if (c >= .055 && c < .071) {
    AQI = Linear(100, 51, .070, .055, c);
  } else if (c >= .071 && c < .086) {
    AQI = Linear(150, 101, .085, .071, c);
  } else if (c >= .086 && c < .106) {
    AQI = Linear(200, 151, .105, .086, c);
  } else if (c >= .106 && c < .201) {
    AQI = Linear(300, 201, .200, .106, c);
  } else if (c >= .201 && c < .605) {
    AQI = "O3message";
  } else {
    AQI = "Out of Range";
  }
  return AQI;
}
//line219


export function AQIOzone1hr(Concentration) {
  var Conc = parseFloat(Concentration);
  var c;
  var AQI;
  c = (Math.floor(Conc)) / 1000;
  if (c >= 0 && c <= .124) {
    AQI = "O31hrmessage";
  } else if (c >= .125 && c < .165) {
    AQI = Linear(150, 101, .164, .125, c);
  } else if (c >= .165 && c < .205) {
    AQI = Linear(200, 151, .204, .165, c);
  } else if (c >= .205 && c < .405) {
    AQI = Linear(300, 201, .404, .205, c);
  } else if (c >= .405 && c < .505) {
    AQI = Linear(400, 301, .504, .405, c);
  } else if (c >= .505 && c < .605) {


    AQI = Linear(500, 401, .604, .505, c);
  } else {
    AQI = "Out of Range";
  }
  return AQI;
}

export function AQINO2(Concentration) {
  var Conc = parseFloat(Concentration);
  var c;
  var AQI;
  c = (Math.floor(Conc)) / 1000;
  if (c >= 0 && c < .054) {
    AQI = Linear(50, 0, .053, 0, c);
  } else if (c >= .054 && c < .101) {
    AQI = Linear(100, 51, .100, .054, c);
  } else if (c >= .101 && c < .361) {
    AQI = Linear(150, 101, .360, .101, c);
  } else if (c >= .361 && c < .650) {
    AQI = Linear(200, 151, .649, .361, c);
  } else if (c >= .650 && c < 1.250) {
    AQI = Linear(300, 201, 1.249, .650, c);
  } else if (c >= 1.250 && c < 1.650) {
    AQI = Linear(400, 301, 1.649, 1.250, c);
  } else if (c >= 1.650 && c <= 2.049) {
    AQI = Linear(500, 401, 2.049, 1.650, c);
  } else {
    AQI = "Out of Range";
  }
  return AQI;
}

export function AQICategory(AQIndex) {
  var AQI = parseFloat(AQIndex)
  var AQICategory;
  if (AQI < 0) {
    AQICategory = "Loading"
  } else if (AQI <= 50) {
    AQICategory = "0-50: Air quality is considered satisfactory, and air pollution poses little or no risk.";
  } else if (AQI > 50 && AQI <= 100) {
    AQICategory = "51-100: Air quality is acceptable; however, if they are exposed for 24 hours there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.";
  } else if (AQI > 100 && AQI <= 150) {
    AQICategory = "101-150: Members of sensitive groups may experience health effects if they are exposed for 24 hours. The general public is not likely to be affected.";
  } else if (AQI > 150 && AQI <= 200) {
    AQICategory = "151-200: Everyone may begin to experience health effects if they are exposed for 24 hours; members of sensitive groups may experience more serious health effects.";
  } else if (AQI > 200 && AQI <= 300) {
    AQICategory = "201-300: Health alert: everyone may experience more serious health effects if they are exposed for 24 hours.";
  } else if (AQI > 300 && AQI <= 400) {
    AQICategory = "301-400: Health warnings of emergency conditions if they are exposed for 24 hours. The entire population is more likely to be affected.";
  } else if (AQI > 400 && AQI <= 500) {
    AQICategory = ">401: Health warnings of emergency conditions if they are exposed for 24 hours. The entire population is more likely to be affected.";
  } else {
    AQICategory = "Out of Range";
  }
  return AQICategory;
}
