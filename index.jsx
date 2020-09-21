import { css } from "uebersicht"; // emotion css
import {AQIPM25, AQICategory} from "./src/aqi";
import {formatAQIDate} from "./src/date-fmt";

// Bounding Rectangle for Sensor to Include
export const nwlat = '';
export const nwlng = '';
export const selat = '';
export const selng = '';

// Can request by emailing contact@purpleair.com
export const APIKEYPURPLE = 'YOUR PURPLE AIR API KEY';

export const fields = ['sensor_index','name','pm2.5','pm2.5_10minute','pm2.5_30minute','pm2.5_60minute','pm2.5_6hour','pm2.5_24hour','pm2.5_1week']
export const readingFields = ['pm2.5','pm2.5_10minute','pm2.5_30minute','pm2.5_60minute','pm2.5_6hour','pm2.5_24hour','pm2.5_1week'];

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

function computeGradient(percent, color1, color2) {
  let resultRed = Math.round(color1.red + percent * (color2.red - color1.red));
  let resultGreen = Math.round(color1.green + percent * (color2.green - color1.green));
  let resultBlue = Math.round(color1.blue + percent * (color2.blue - color1.blue));
  return {red: resultRed, green: resultGreen, blue: resultBlue};
}

export const refreshFrequency = 600000; // 10 min

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

export const className = {
  top: 20,
  left: '73%',
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

export const render = state => {
  if (state) {
    const aqiReadings = computeAvgPm25ReadingFields(state.results.data, readingFields, fields);

    console.log(aqiReadings);

    const unix_timestamp = state.results.data_time_stamp;
    var readingDate = new Date(unix_timestamp * 1000);
    var dateStr = formatAQIDate(readingDate);

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
