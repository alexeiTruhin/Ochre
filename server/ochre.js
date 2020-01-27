'use strict';

const { toUrlEncoded } = require('./helper');

const fetch = require('node-fetch');

module.exports = class Ochre {
  constructor () {

  }

  auth (id, secret) {
    let data = {
      'client_id': id,
      'client_secret': secret,
      'grant_type': 'client_credentials'
    };

    return fetch('https://auth.ochre.io/oauth2/token', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: toUrlEncoded(data)
    });
  }
}