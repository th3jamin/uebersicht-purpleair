function getDatePart(dtField, parts) {
  for (let i=0; i<parts.length; ++i) {
    if (parts[i].type === dtField) {
      return parts[i].value;
    }
  }
}

export function formatAQIDate(dt) {
  let options = {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    timeZoneName: 'short',
    hour12: false
  };
  var parts = new Intl.DateTimeFormat('en-US', options).formatToParts(dt);
  return `On ${getDatePart('month', parts)} ${getDatePart('day', parts)}, ${getDatePart('year', parts)}, ${getDatePart('hour', parts)}:${getDatePart('minute', parts)}:${getDatePart('second', parts)} ${getDatePart('timeZoneName', parts)}`
}
