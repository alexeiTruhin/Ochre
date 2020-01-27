/* eslint no-console: 0 */
'use strict';

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
const ochre = new (require('./ochre'));
const fetch = require('node-fetch');

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  app.get('/auth', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../dist/auth.html')));
    res.end();
  });

  app.get('/', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '../dist'));
  app.get('/auth', function response(req, res) {
    res.sendFile(path.join(__dirname, '../dist/auth.html'));
  });
  app.get('/', function response(req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.post('/auth', function (req, res) {
  ochre.auth(req.body.client_id, req.body.client_secret)
    .then((response) => {
      return response.json()
    })
    .then( token => {
      res.send(JSON.stringify(token))
    })
    .catch( error => {
      console.error('Error on Ochre Auth: ', error);
      res.status(400);
      res.send('Ivalid credentials');
    })
});

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.error(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
