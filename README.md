# meteor-double-build-bug
When using static assets, a second build might be necessary for a working bundle.

# Recipe for reproduction

## Project initialization

```
git clone https://github.com/qnipp/meteor-double-build-bug.git
cd meteor-double-build-bug
meteor npm install
```

**Don't run meteor**, just continue to build the application.

## First build

```
TARGET=/tmp/firstBuild
meteor build $TARGET --directory
pushd $TARGET/bundle
( cd programs/server/ ; npm install )
PORT=4001 ROOT_URL=http://localhost:$PORT node main.js
popd
```

Now, open http://localhost:4001 and see the following error in the JavaScript console: 

**Uncaught Error: Cannot find module 'famfamfam-flags/dist/png/at.png'**

## Second build

Do the above again (maybe in a second terminal):

```
TARGET=/tmp/secondBuild
meteor build $TARGET --directory
pushd $TARGET/bundle
( cd programs/server/ ; npm install )
PORT=4002 ROOT_URL=http://localhost:$PORT node main.js
popd
```

Now, open http://localhost:4002. There are no errors. Everything works as expected.

## Affected Meteor versions

A second build helps on Meteor 1.8.1.

On Meteor 1.8.2 and 1.9-beta.3, static assets work only in development mode (running `meteor`), even when an error message is shown during at the start:

```
=> Started proxy.                             
W20191115-18:25:51.557(1)? (STDERR) /tmp/meteor-double-build/node_modules/famfamfam-flags/dist/png/at.png:1
W20191115-18:25:51.579(1)? (STDERR) �PNG
W20191115-18:25:51.579(1)? (STDERR) 
W20191115-18:25:51.579(1)? (STDERR) 
W20191115-18:25:51.579(1)? (STDERR) SyntaxError: Invalid or unexpected token
W20191115-18:25:51.580(1)? (STDERR)     at Module._compile (internal/modules/cjs/loader.js:892:18)
W20191115-18:25:51.580(1)? (STDERR)     at Module.Mp._compile (/tmp/meteor-double-build/.meteor/local/build/programs/server/runtime.js:50:23)
W20191115-18:25:51.580(1)? (STDERR)     at Object.Module._extensions..js (internal/modules/cjs/loader.js:973:10)
W20191115-18:25:51.580(1)? (STDERR)     at Module.load (internal/modules/cjs/loader.js:812:32)
W20191115-18:25:51.580(1)? (STDERR)     at Module.Mp.load (/tmp/meteor-double-build/.meteor/local/build/programs/server/runtime.js:15:31)
W20191115-18:25:51.580(1)? (STDERR)     at Function.Module._load (internal/modules/cjs/loader.js:724:14)
W20191115-18:25:51.580(1)? (STDERR)     at Module.require (internal/modules/cjs/loader.js:849:19)
W20191115-18:25:51.581(1)? (STDERR)     at require (internal/modules/cjs/helpers.js:74:18)
W20191115-18:25:51.581(1)? (STDERR)     at npmRequire (/tmp/meteor-double-build/.meteor/local/build/programs/server/npm-require.js:133:12)
W20191115-18:25:51.581(1)? (STDERR)     at Module.useNode (packages/modules-runtime.js:664:18)
W20191115-18:25:51.581(1)? (STDERR)     at module (packages/modules.js:180:8)
W20191115-18:25:51.581(1)? (STDERR)     at fileEvaluate (packages/modules-runtime.js:336:7)
W20191115-18:25:51.581(1)? (STDERR)     at Module.require (packages/modules-runtime.js:238:14)
W20191115-18:25:51.581(1)? (STDERR)     at Module.moduleLink [as link] (/home/knipp/.meteor/packages/modules/.0.15.0-beta190.3.rlrcvo.e0qel++os+web.browser+web.browser.legacy+web.cordova/npm/node_modules/reify/lib/runtime/index.js:52:22)
W20191115-18:25:51.582(1)? (STDERR)     at server/main.js:1:175
W20191115-18:25:51.582(1)? (STDERR)     at module (server/main.js:12:1)
W20191115-18:25:51.582(1)? (STDERR)     at fileEvaluate (packages/modules-runtime.js:336:7)
W20191115-18:25:51.582(1)? (STDERR)     at Module.require (packages/modules-runtime.js:238:14)
W20191115-18:25:51.582(1)? (STDERR)     at require (packages/modules-runtime.js:258:21)
W20191115-18:25:51.582(1)? (STDERR)     at server/main.js:12:1
W20191115-18:25:51.582(1)? (STDERR)     at /tmp/meteor-double-build/.meteor/local/build/programs/server/boot.js:398:38
W20191115-18:25:51.582(1)? (STDERR)     at Array.forEach (<anonymous>)
=> Exited with code: 1
```

Use the respective branches and `git clone -b 1.8.2 https://github.com/qnipp/meteor-double-build-bug.git` and `git clone -b 1.9-beta.3 https://github.com/qnipp/meteor-double-build-bug.git` for cloning this repo.
