# Express + Flow Boilerplate
Basic Template for Developing Express Application with Flow and Babel integration.

## Features
- Babel (+ Sourcemap Support for Node)
- Flow
- Gulp
- co
- Body Parser + Cookie Parser
- Session
- Extended HTTP Error Exception classes
- Base Authentication Routes (Without authentication)
- Some other utils to save your logic
- Production Builds
- And others...


## Run
### Build
```bash
$ npm run build
```

### Serve
```bash
$ npm run serve
```

### Build and Serve
```bash
$ npm start
```

### Flow
```bash
$ flow
```

I heavily recommend to use VSCode with Flow extension. This will show you errors in your editor realtime.


## Authentication
To get auth

```bash
POST /auth
```

To delete auth

```bash
DELETE /auth
```

By default, there is no authentication logic inside, and simply set the session.
If session has "auth" key, it's authenticated. There is also middleware for that, in "libs/middlewars.js".


## Production Build
Go config/app.json and change environment value to "production" and build.
