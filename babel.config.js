const TARGETS_NODE = "12.13.0";
const CORE_JS_VERSION = "3.6";

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: { node: TARGETS_NODE },
        useBuiltIns: "usage",
        corejs: {
          version: CORE_JS_VERSION,
          proposals: true,
        },
      },
    ],
  ],
  plugins: [
    [
      "babel-plugin-module-resolver",
      {
        alias: {
          src: "./src",
          test: "./src/test/",
          app: "./src/app",
          infra: "./src/infra/",
          helpers: "./src/helpers/",
          config: "./src/config/",
          domain: "./src/domain/",
          interfaces: "./src/interfaces/",
          routes: "./src/interfaces/http/routes",
          controllers: "./src/interfaces/http/controllers",
          middleware: "./src/interfaces/http/middleware",
        },
      },
    ],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    [
      "@babel/plugin-transform-runtime",
      {
        corejs: { version: 3, proposals: true },
        version: "^7.8.3",
      },
    ],
    ["@babel/plugin-proposal-private-methods", { loose: true }],
    ["@babel/plugin-proposal-private-property-in-object", { loose: true }]
  ],
};
