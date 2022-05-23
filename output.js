var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

// app.jsx
var import_express = __toESM(require("./node_modules/express/index.js"));
var import_preact2 = require("./node_modules/preact/dist/preact.mjs");
var import_preact_render_to_string2 = __toESM(require("./node_modules/preact-render-to-string/dist/index.mjs"));

// Main.jsx
var import_preact = require("./node_modules/preact/dist/preact.mjs");
var import_preact_render_to_string = __toESM(require("./node_modules/preact-render-to-string/dist/index.mjs"));
var Main_default = App;

// app.jsx
var app = (0, import_express.default)();
console.log((0, import_preact_render_to_string2.default)(Main_default));
