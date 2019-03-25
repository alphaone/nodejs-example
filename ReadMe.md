# A simple Node.js Example

It started as a Vanilla-JS implementation of 
[this tutorial](https://blog.consort-academy.de/blog/2019/03/22/how-to-create-a-microservice-with-node-js/).

## What does it do?

It queries a third-party JSON-API (iTunes music database) and shows the result on a simple HTML page. 

## Purpose

To learn the fundamental building blocks of a Node.js application.

## Modules used

* [Express](https://expressjs.com) 
  as a minimal web framework
* [Morgan](https://github.com/expressjs/morgan)
  for logging
* [Pug](https://github.com/pugjs/pug)
  as template engine
* [node-sass](https://github.com/sass/node-sass) 
  via [node-sass-middleware](https://github.com/sass/node-sass-middleware)
  to compile `.scss` files to `.css` files
* [Got](https://github.com/sindresorhus/got)
  as a HTTP client
* [dotenv]()
  to read `.env` files and get configuration from 
  environment variables

for Testing:

* [mocha](https://mochajs.org)
  as the testing framework
* [chai](https://github.com/chaijs/chai)
  as an assertion framework
* [chai-http](https://www.chaijs.com/plugins/chai-http/)
  a chai plugin for HTTP integration testing
* [nock](https://github.com/nock/nock)
  for HTTP server mocking
* [nyc](https://github.com/istanbuljs/nyc)
  for code coverage

for Development:

* [nodemon](https://nodemon.io)
  detects changes in the source and restarts the application automatically