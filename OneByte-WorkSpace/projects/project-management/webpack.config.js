const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "projectManagement",
    publicPath: "http://localhost:4201/",
    scriptType: "text/javascript"
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
        //library: { type: "module" },

        // For remotes (please adjust)
        name: "projectManagement",
        filename: "remoteEntry.js",
        exposes: {
            './ProjectDashboardModule': './projects/project-management/src/app/project-dashboard/project-dashboard.module.ts',
        },

        // For hosts (please adjust)
        // remotes: {
        //     "oneByte": "http://localhost:4200/remoteEntry.js",
        //     "employeeManagement": "http://localhost:4300/remoteEntry.js",

        // },

        shared: share({
          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@ngrx/store": { singleton: true, strictVersion: true, requiredVersion: '15.4.0' },
          "@ngrx/effects": { singleton: true, strictVersion: true, requiredVersion: '15.4.0' },
          "@ngrx/store-devtools": { singleton: true, strictVersion: true, requiredVersion: '15.4.0' },
          "@tailwindcss": { singleton: true, strictVersion: true, requiredVersion:  "3.4.4"},
          "@primeng": { singleton: true, strictVersion: true, requiredVersion:  "15.0.0"},

          ...sharedMappings.getDescriptors()
        })

    }),
    sharedMappings.getPlugin()
  ],
};
