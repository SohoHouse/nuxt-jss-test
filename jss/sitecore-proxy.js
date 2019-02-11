/*
  When the app runs in disconnected mode, and Sitecore is not present, we need to give
  the app copies of the Sitecore APIs it depends on (layout service, dictionary service, content service)
  to talk to so that the app can run using the locally defined disconnected data.

  This is accomplished by spinning up a small Express server that mocks the APIs, and then
  telling the dev server to proxy requests to the API paths to this express instance.
*/

// these environment variables are necessary for Vue to allow us
// to process transpiled ES6 that Node can run
process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true;
process.env.VUE_CLI_BABEL_TARGET_NODE = true;

import fs from 'fs'
import path from 'path'
import { createDefaultDisconnectedServer } from '@sitecore-jss/sitecore-jss-dev-tools'
import { config as packageConfig } from '../package.json'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

const app = express()

app.use(morgan('> [PROXY] :method :url :status :res[content-length] - :response-time ms'))
app.use(cors({ credentials: true }))

// Need to customize something that the proxy options don't support?
// createDefaultDisconnectedServer() is a boilerplate that you can copy from
// and customize the middleware registrations within as you see fit.
// See https://github.com/Sitecore/jss/blob/master/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts
export default () => new Promise(resolve => {
  const proxyOptions = {
    server: app,
    appRoot: path.join(__dirname, '..'),
    appName: packageConfig.appName,
    watchPaths: ['./data'],
    language: packageConfig.language,
    compilers: ['@babel/register'],
    afterMiddlewareRegistered: app => resolve(app)
  }

  createDefaultDisconnectedServer(proxyOptions)
})
