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

On Meteor 1.8.2 and 1.9-beta.3, static assets don't work in the generated bundles at all, only during development using **meteor run**
