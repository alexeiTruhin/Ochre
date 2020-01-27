'use strict';

const authForm = document.getElementById('auth_form');
const auth_id = document.getElementById('auth_id');
const auth_secret = document.getElementById('auth_secret');
const auth_submit = document.getElementById('auth_submit');

auth_submit.addEventListener('click', (event) => {
  event.preventDefault();
  let data = {
    'client_id': auth_id.value,
    'client_secret': auth_secret.value,
    'grant_type': 'client_credentials'
  };
  fetch('/auth', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    }
  })
  .then((response) => {
    if (!response.ok) throw Error('Invalid Credentials');

    return response.json();
  })
  .then((data) => console.log(data))
  .catch(error => console.error(error))
});