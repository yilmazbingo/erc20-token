The request './app' failed to resolve only because it was resolved as fully specified
(probably because the origin is a '*.mjs' file or a '*.js' file where the package.json contains '"type": "module"').
The extension in the request is mandatory for it to be fully specified.
Add the extension to the request.

solution add this to webpack.config.js

```js
 {
        test: /\.m?js/,
        resolve: {
            fullySpecified: false
        }
    },
```

the reason was, webpack.config.ts instead of "js". SO i did not need it. 