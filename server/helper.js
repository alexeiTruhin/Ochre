'use strict';

module.exports = {
  toUrlEncoded: (object) => {
    return Object.entries(object)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
  }
};
