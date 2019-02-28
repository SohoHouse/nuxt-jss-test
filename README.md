**jss-nuxt-test** _— Test nuxt app for integrating JSS_

## Components

- **`./nuxt-jss`** Designed to be a portable Nuxt module which should not contain any app-specific code and should probably be an external module.

- **`./client`** All non-sitecore related code, a.k.a. your average nuxt source directory.

- **`./sitecore`** Containing all sitecore related code which is specific to your application, including JSS components and component definitions, configuration, etc.

## Walkthrough

### Nuxt
This is a new [Nuxt](https://nuxtjs.org/) app created using `create-nuxt-app`. The standard Nuxt folders can be found in `/client`.

##### Configuration

As much configuration as possible has been added to the `jss` property in `nuxt.config.js`.

### nuxt-jss
The `/nuxt-jss` folder contains a WIP [Nuxt Module](https://nuxtjs.org/guide/modules/) which will be extracted into an NPM module eventually.

It contains all the generic javascript boilerplate that is not specific to an individual app, including:

##### `index.js`

The core Nuxt module. Contains logic to connect the various nuxt functionalities, including a server middleware for Disconnected Proxy, the Sitecore route, and registering the Vue plugin

##### `plugin.js`

A [Nuxt plugin](https://nuxtjs.org/guide/plugins/) which registers the Vuex store module for storing Sitecore route data and context. Lifted largely from the [sample Vue plugin](https://github.com/Sitecore/jss/blob/master/samples/vue/src/lib/SitecoreJssStorePlugin.js)

##### `route-handler.vue`

A Vue page component which handles the logic of updating the Sitecore context and routedata when the page loads, and rendering the root `jss-main` Placeholder. Refactored from the [sample route handler](https://github.com/Sitecore/jss/blob/master/samples/vue/src/RouteHandler.vue)

##### `sitecore-proxy.js`

Exports a small Express app to act as a proxy Sitecore Layout API when running in API mode. Unlike the sample implementation which runs a separate server, this is run as a [Nuxt Server Middleware](https://nuxtjs.org/api/configuration-servermiddleware/) when enabled.

##### `scripts`

Common scripts, lifted and refactored from [the sample scripts](https://github.com/Sitecore/jss/tree/master/samples/vue/scripts)
- `generate-component-factory` generate a component factory from your app's Sitecore components (configured in `nuxt.config.js`)
- `scaffold-component` creates a new Sitecore component and corresponding manifest definition

### Sitecore

Along with requiring the `nuxt-jss` module, your app will require some app-specific components and services, which by default lives in `./sitecore` (this is configurable in `nuxt.config.js`).

This largely follows the [Sitecore folder in the sample app](https://github.com/Sitecore/jss/tree/master/samples/vue/sitecore), but it also includes the Vue components you want to push to Sitecore as page components (it's likely that you'll want other components that don't become useable by CMS users; these live in the traditional Nuxt `client/components` place).

## Milestones

- [x] Build components and manifest
- [x] SSR working with Disconnected Sitecore Proxy server
- [x] Deploy & import app to Sitecore instance
- [ ] Integrated mode with SSR inside Sitecore
- [ ] Tooling & scripts to setup your nuxt app with required extra dir structure

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
