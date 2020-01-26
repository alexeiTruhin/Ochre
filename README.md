# Description 
Simple Demo of Ochre API.

The project contains a simple *express server*, because the Ochre endpoint doesn't support CORS policy.

It contains 2 pages: 
- **index**: a page that displays a list of songs retrieved from Ochre
- **auth**: a form page that requests an id and a secret used for Ochre Auth API, saves the returned token in cookies, and redirects to index page

# Usage
### Installation
```
npm install
```
### Start dev server for development
```
npm start
```
### Build
```
npm build
```

# Tools used
The project has been started from a boilerplate. The git page https://github.com/christianalfoni/webpack-express-boilerplate
