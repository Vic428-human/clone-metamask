function getTimestampOneSecondAgo(date, seconds) {
  return new Date(Date.parse(date) - seconds * 1000);
}

exports.modules = { getTimestampOneSecondAgo };
