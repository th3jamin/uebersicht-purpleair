import { css } from "uebersicht"; // emotion css - never played with it :(

// Bounding Rectangle for Sensor to Include
export const nwlat = '';
export const nwlng = '';
export const selat = '';
export const selng = '';

// Can request by emailing contact@purpleair.com 
export const APIKEYPURPLE = 'YOUR PURPLE AIR API KEY';

export const fields = ['sensor_index','name','pm2.5','pm2.5_10minute','pm2.5_30minute','pm2.5_60minute','pm2.5_6hour','pm2.5_24hour','pm2.5_1week']
export const readingFields = ['pm2.5','pm2.5_10minute','pm2.5_30minute','pm2.5_60minute','pm2.5_6hour','pm2.5_24hour','pm2.5_1week'];

export const className = {
  top: 20,
  left: '78%',
  color: '#fff',
  maxWidth: '240px',
  borderRadius: '10px',
  MozBorderRadius :'10px',
  WebkitBorderRadius: '10px',
  opacity: .8
}

export const fullwrapper = css`
  position: fixed;
  top: 20;
  left: 78%;
  border-radius:6px;
  -moz-border-radius:6px;
  -webkit-border-radius:6px;
  border:1px solid #383838;
  display:inline-block;
  background-color:#383838;
  -webkit-box-shadow: 1px 1px 1px 0 rgba(0,0,0,0.075);
  opacity: 0.7;
`
export const wrapper = css`
  width:180px;
  margin:8px;
  border:0px solid black;
  line-height:1.2;
  color:black;
`

export const aqivalue = css`
  font-size:28px;
  text-align: -webkit-center;
`

export const loadingwrapper = css`
  padding:5px 0px;
  background-color: #f0f0f0;
  color:#383838;
  border-radius:3px;
  -moz-border-radius:3px;
  -webkit-border-radius:3px;
`
function Linear(AQIhigh, AQIlow, Conchigh, Conclow, Concentration) {
  var linear;
  var Conc = parseFloat(Concentration);
  var a;
  a = ((Conc - Conclow) / (Conchigh - Conclow)) * (AQIhigh - AQIlow) + AQIlow;
  linear = Math.round(a);
  return linear;
}

function AQIPM25(Concentration) {
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
function AQIPM10(Concentration) {
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
function AQICO(Concentration) {
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
function AQISO21hr(Concentration) {
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

function AQISO224hr(Concentration) {
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
function AQIOzone8hr(Concentration) {
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


function AQIOzone1hr(Concentration) {
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

function AQINO2(Concentration) {
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

function AQICategory(AQIndex) {
  var AQI = parseFloat(AQIndex)
  var AQICategory;
  if (AQI <= 50) {
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

function AQICategoryCSS(AQIndex) {
  var AQI = parseFloat(AQIndex)

  const color0 = {red: 110, green: 226, blue: 68}
  const color50 = {red: 255, green: 255, blue: 85}
  const color100 = {red: 239, green: 133, blue: 51}
  const color150 = {red: 234, green: 51, blue: 36}
  const color200 = {red: 140, green: 26, blue: 75}
  const color300 = {red: 115, green: 20, blue: 37}
  const color400 = {red: 115, green: 20, blue: 37}
  const color500 = {red: 115, green: 20, blue: 37}

  var AQICategoryCSS;
  if (AQI <= 50) {
    const percent = ((AQI - 0)/50);
    const color = computeGradient(percent, color0, color50);
    AQICategoryCSS = `background-color: rgba(${color.red}, ${color.green}, ${color.blue}, 1);color: black`;
  } else if (AQI > 50 && AQI <= 100) {
    const percent = ((AQI - 50)/50);
    const color = computeGradient(percent, color50, color100);
    AQICategoryCSS = `background-color: rgba(${color.red}, ${color.green}, ${color.blue}, 1);color: black`;
  } else if (AQI > 100 && AQI <= 150) {
    const percent = ((AQI - 100)/50);
    const color = computeGradient(percent, color100, color150);
    AQICategoryCSS = `background-color: rgba(${color.red}, ${color.green}, ${color.blue}, 1);color: black`;
  } else if (AQI > 150 && AQI <= 200) {
    const percent = ((AQI - 150)/50);
    const color = computeGradient(percent, color150, color200);
    AQICategoryCSS = `background-color: rgba(${color.red}, ${color.green}, ${color.blue}, 1);color: #f0f0f0`;
  } else if (AQI > 200 && AQI <= 300) {
    const percent = ((AQI - 200)/100);
    const color = computeGradient(percent, color200, color300);
    AQICategoryCSS = `background-color: rgba(${color.red}, ${color.green}, ${color.blue}, 1);color: #f0f0f0`;
  } else if (AQI > 300 && AQI <= 400) {
    const percent = ((AQI - 300)/100);
    const color = computeGradient(percent, color300, color400);
    AQICategoryCSS = `background-color: rgba(${color.red}, ${color.green}, ${color.blue}, 1);color: #f0f0f0`;
  } else if (AQI > 400 && AQI <= 500) {
    const percent = ((AQI - 400)/100);
    const color = computeGradient(percent, color400, color500);
    AQICategoryCSS = `background-color: rgba(${color.red}, ${color.green}, ${color.blue}, 1);color: #f0f0f0`;
  } else {
    AQICategoryCSS = "Out of Range";
  }
  return AQICategoryCSS;
}

export const command = dispatch => {
  fetch(`https://api.purpleair.com/v1/sensors?location_type=0&nwlat=${nwlat}&nwlng=${nwlng}&selat=${selat}&selng=${selng}&api_key=${APIKEYPURPLE}&fields=${fields.join(',')}`)
    .then(res => {
      res.json().then(data => {
        dispatch({ type: "FETCH_SUCCEDED", data: data });
      });
    })
    .catch(error => {
      dispatch({ type: "FETCH_FAILED", error: error });
    });
};

function computeAvgPm25ReadingFields(data, readingsList, fieldList) {
  var avgs = {};
  for (var i=0; i<readingsList.length; ++i) {
    var totalPM25 = 0;
    var readingLoc = fieldList.indexOf(readingsList[i]);

    for (var j=0; j<data.length; ++j) {
      const pm25 = data[j][readingLoc];
      const aqiPM25 = AQIPM25(data[j][readingLoc]);
      totalPM25 += aqiPM25;
    }

    const aqius = Math.round(totalPM25 / data.length);
    avgs[readingsList[i]] = aqius;
  }

  return avgs;
}

function getDatePart(dtField, parts) {
  for (let i=0; i<parts.length; ++i) {
    if (parts[i].type === dtField) {
      return parts[i].value;
    }
  }
}

function computeGradient(percent, color1, color2) {
  let resultRed = Math.round(color1.red + percent * (color2.red - color1.red));
  let resultGreen = Math.round(color1.green + percent * (color2.green - color1.green));
  let resultBlue = Math.round(color1.blue + percent * (color2.blue - color1.blue));
  return {red: resultRed, green: resultGreen, blue: resultBlue};
}

export const refreshFrequency = 600000; // ms
export const render = state => {
  if (state) {
    const aqiReadings = computeAvgPm25ReadingFields(state.results.data, readingFields, fields);
    console.log(aqiReadings);

    const unix_timestamp = state.results.data_time_stamp;
    var readindDate = new Date(unix_timestamp * 1000);
    let options = {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      timeZoneName: 'short',
      hour12: false
    };
    var parts = new Intl.DateTimeFormat('en-US', options).formatToParts(readindDate);
    var dateStr = `On ${getDatePart('month', parts)} ${getDatePart('day', parts)}, ${getDatePart('year', parts)}, ${getDatePart('hour', parts)}:${getDatePart('minute', parts)}:${getDatePart('second', parts)} ${getDatePart('timeZoneName', parts)}`

    const pm25 = aqiReadings['pm2.5'];
    const pm25_10m = aqiReadings['pm2.5_10minute'];
    const pm25_30m = aqiReadings['pm2.5_30minute'];
    const pm25_60m = aqiReadings['pm2.5_60minute'];
    const pm25_6h = aqiReadings['pm2.5_6hour'];
    const pm25_24h = aqiReadings['pm2.5_24hour'];
    const pm25_1wk = aqiReadings['pm2.5_1week'];

    const aqiMessage = AQICategory(pm25_10m);

    return (
      <div>
      <style> {`
    .current-conditions {
      width: 220px;
      margin: 5px;
      padding: 10px;
      border-width: 3px;
      border-color: black;
      border-style: solid;
      border-radius: 10px;
      height: 250px;
      ${AQICategoryCSS(pm25_10m)}
    }
    .pm25style {
      ${AQICategoryCSS(pm25)}
    }
    .pm25_10mstyle {
      ${AQICategoryCSS(pm25_10m)}
    }
    .pm25_30mstyle {
      ${AQICategoryCSS(pm25_30m)}
    }
    .pm25_60mstyle {
      ${AQICategoryCSS(pm25_60m)}
    }
    .pm25_6hstyle {
      ${AQICategoryCSS(pm25_6h)}
    }
    .pm25_24hstyle {
      ${AQICategoryCSS(pm25_24h)}
    }
    .pm25_1wkstyle {
      ${AQICategoryCSS(pm25_1wk)}
    }
    .popup-time-stamp {
      padding: 3px 0 3px;
      white-space: nowrap;
      font: 12px/20px 'Helvetica Neue',Arial,Helvetica,sans-serif;
      /* color: black; */
      box-sizing: border-box;
    }
    .popup-conditions {
      font: 12px/20px 'Helvetica Neue',Arial,Helvetica,sans-serif;
      -webkit-tap-highlight-color: transparent;
      font-size: 16px;
      font-weight: 700;
      width: 48%;
    }
    .popup-large {
      font-size: 68px;
    }
    .popup-aqi {
      text-align: center;
      font-weight: 700;
      line-height: 1em;
      width: 48%;
      text-align: center;
      margin: 0;
    }
    .legend-tooltip-popup {
      position: relative;
      display: inline-block;
      margin-bottom: 10px;
      bottom: 0px;
    }
    .xxst {
      font-size: 8px;
      height: 20px;
      width: 30px;
    }
    .legend-tooltiptext div {
      visibility: hidden;
    }
    .small-reading {
      width: 14.18%;
      text-align: center;
    }
    .message {
      padding:10px 0 10px 0;
      font-size: 13px;
      height: 80px;
    }
    .flex-container {
      /* We first create a flex layout context */
      display: flex;

      /* Then we define the flow direction
         and if we allow the items to wrap
       * Remember this is the same as:
       * flex-direction: row;
       * flex-wrap: wrap;
       */
      flex-flow: row nowrap;

      /* Then we define how is distributed the remaining space */
      justify-content: flex-start;

      padding: 0;
      margin: 0;
      list-style: none;
    }
    `}
  </style>
  <div id="currentConditions" className="current-conditions">
      <div className="fit popup-time-stamp" id="popup-time-stamp">{dateStr}</div>
      <ul className="flex-container">
        <li className="popup-conditions">10 Minute Average US EPA PM2.5 AQI is now</li>
        <li className="popup-large popup-aqi">{pm25_10m}</li>
      </ul>
      <div className="message">{aqiMessage}</div>
      <span className="legend-tooltip-popup small-reading pm25style">
        <div className="xxst">Now</div>
        {pm25}
      </span>
      <span className="legend-tooltip-popup small-reading pm25_10mstyle">
        <div className="xxst">10 Min</div>
        {pm25_10m}
      </span>
      <span className="legend-tooltip-popup small-reading pm25_30mstyle">
        <div className="xxst">30 Min</div>
        {pm25_30m}
      </span>
      <span className="legend-tooltip-popup small-reading pm25_60mstyle">
        <div className="xxst">1 hr</div>
        {pm25_60m}
      </span>
      <span className="legend-tooltip-popup small-reading pm25_6hstyle">
        <div className="xxst">6 hr</div>
        {pm25_6h}
      </span>
      <span className="legend-tooltip-popup small-reading pm25_24hstyle">
        <div className="xxst">1 Day</div>
        {pm25_24h}
      </span>
      <span className="legend-tooltip-popup small-reading pm25_1wkstyle">
        <div className="xxst">Week</div>
        {pm25_1wk}
      </span>
      </div>
    </div>
    );

  } else {
    return (
      <div className={fullwrapper}>
        <div className={wrapper}>
          <div className={loadingwrapper}>
            <div className={aqivalue}>Loading...</div>
          </div>
        </div>
      </div>
    );
  }
}

export const initialState = {
  state: {},
  loading: <div className={fullwrapper}>
    <div className={wrapper}>
      <div className={loadingwrapper}>
        <div className={aqivalue}>Loading...</div>
      </div>
    </div>
  </div>
};

export const updateState = (event, previousState) => {
  if (event.data && !('error' in event.data)) {
    return {
      results: event.data
    }
  }
};
