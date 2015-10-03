System.config({
  baseURL: ".",
  defaultJSExtensions: true,
  transpiler: "typescript",
  typescriptOptions: {
    "noImplicitAny": true,
    "typeCheck": true,
    "resolveAmbientRefs": true
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  map: {
    "babel": "npm:babel-core@5.8.25",
    "babel-runtime": "npm:babel-runtime@5.8.25",
    "core-js": "npm:core-js@1.2.1",
    "opsuite/webef": "github:opsuite/webef@master",
    "ts": "github:frankwallis/plugin-typescript@2.0.17",
    "typescript": "npm:typescript@1.6.2",
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "github:opsuite/webef@master": {
      "google/lovefield": "github:google/lovefield@master"
    },
    "npm:babel-runtime@5.8.25": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@1.2.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    }
  }
});
