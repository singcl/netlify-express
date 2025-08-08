// Timezone utility for East 8 timezone (UTC+8)

/**
 * Get current time in East 8 timezone
 */
const getCurrentTime = () => {
  const now = new Date();
  return new Date(now.getTime() + (8 * 60 * 60 * 1000)); // UTC+8
};

/**
 * Format date to ISO string in East 8 timezone
 */
const toISOString = (date = new Date()) => {
  const east8Date = new Date(date.getTime() + (8 * 60 * 60 * 1000));
  return east8Date.toISOString();
};

/**
 * Format date to local string in East 8 timezone
 */
const toLocalString = (date = new Date()) => {
  const east8Date = new Date(date.getTime() + (8 * 60 * 60 * 1000));
  return east8Date.toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
};

/**
 * Format date to date string in East 8 timezone
 */
const toDateString = (date = new Date()) => {
  const east8Date = new Date(date.getTime() + (8 * 60 * 60 * 1000));
  return east8Date.toLocaleDateString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

/**
 * Format date to time string in East 8 timezone
 */
const toTimeString = (date = new Date()) => {
  const east8Date = new Date(date.getTime() + (8 * 60 * 60 * 1000));
  return east8Date.toLocaleTimeString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
};

/**
 * Get formatted timestamp for East 8 timezone
 */
const getTimestamp = (date = new Date()) => {
  const east8Date = new Date(date.getTime() + (8 * 60 * 60 * 1000));
  return {
    iso: east8Date.toISOString(),
    local: east8Date.toLocaleString('zh-CN', {
      timeZone: 'Asia/Shanghai',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }),
    date: east8Date.toLocaleDateString('zh-CN', {
      timeZone: 'Asia/Shanghai',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }),
    time: east8Date.toLocaleTimeString('zh-CN', {
      timeZone: 'Asia/Shanghai',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }),
    unix: Math.floor(east8Date.getTime() / 1000)
  };
};

/**
 * Format duration in milliseconds to human readable string
 */
const formatDuration = (milliseconds) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `${days}天 ${hours % 24}小时 ${minutes % 60}分钟`;
  } else if (hours > 0) {
    return `${hours}小时 ${minutes % 60}分钟`;
  } else if (minutes > 0) {
    return `${minutes}分钟 ${seconds % 60}秒`;
  } else {
    return `${seconds}秒`;
  }
};

/**
 * Get timezone info
 */
const getTimezoneInfo = () => {
  return {
    zone: 'Asia/Shanghai',
    offset: '+08:00',
    locale: 'zh-CN',
    description: '中国标准时间 (CST)'
  };
};

module.exports = {
  getCurrentTime,
  toISOString,
  toLocalString,
  toDateString,
  toTimeString,
  getTimestamp,
  formatDuration,
  getTimezoneInfo
}; 