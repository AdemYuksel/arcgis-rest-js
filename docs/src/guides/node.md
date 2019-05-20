---
title: Using ArcGIS REST JS in Node.js
navTitle: Node.js
description: Learn how to integrate the ArcGIS REST JS library into a Node.js app.
order: 50
group: 1-get-started
---

# Get Started with Node.js

Make sure you have polyfills for [`fetch`](https://github.com/bitinn/node-fetch) and [`FormData`](https://github.com/form-data/isomorphic-form-data) installed before using any ArcGIS REST JS library. You can find `npm install` commands for all packages in the [API reference](/arcgis-rest-js/api).

```bash
npm install @esri/arcgis-rest-request @esri/arcgis-rest-auth node-fetch isomorphic-form-data
```

Require `node-fetch` and `isomorphic-form-data` before using any of the ArcGIS REST JS methods.
```js
const fetch = require("node-fetch");
require("isomorphic-form-data");

const { request, setDefaultRequestOptions } = require("@esri/arcgis-rest-request");

// use node-fetch for each request instead of relying on a global
setDefaultRequestOptions({ fetch })

request("https://www.arcgis.com/sharing/rest/info")
  .then(response);
```

#### Demo - [Express](https://github.com/Esri/arcgis-rest-js/tree/master/demos/express)

## Authentication

To access premium content and services without asking for user credentials, using a [Proxy Service](https://developers.arcgis.com/documentation/core-concepts/security-and-authentication/working-with-proxies/) or [App Login](https://developers.arcgis.com/documentation/core-concepts/security-and-authentication/accessing-arcgis-online-services/) is typically the best approach.

Proxy Service
```js
// no auth required
request(`https://utility.arcgis.com/usrsvcs/appservices/{unique}/rest/services/World/Route/NAServer/Route_World/solve`)
```
App Login
```js
const { ApplicationSession } = require("@esri/arcgis-rest-auth");

const authentication = new ApplicationSession({
  clientId: "public",
  clientSecret: "secret"
})

// url not accessible to anonymous users
const url = `https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World`

// token will be appended by rest-js
request(url, {
  authentication
})
```

#### Demo - [batch geocoding](https://github.com/Esri/arcgis-rest-js/tree/master/demos/batch-geocoder-node)

Applications cannot [create, share, access or modify items](https://developers.arcgis.com/documentation/core-concepts/security-and-authentication/limitations-of-application-authentication/) in ArcGIS Online or ArcGIS Enterprise. For this, a [`UserSession`](/arcgis-rest-js/api/auth/UserSession/) is more appropriate.

```js
const { UserSession } = require("@esri/arcgis-rest-auth");

// hardcoded username / password
const authentication = new UserSession({
  username: "jsmith",
  password: "123456"
})
```
See the [Browser Authentication](../browser-authentication/) for more information about implementing OAuth 2.0.

## Isomorphic/Universal Applications

If your JavaScript codebase needs to run in both a browser _and_ Node.js, something like [`cross-fetch`](https://github.com/lquixada/cross-fetch) might be useful.


