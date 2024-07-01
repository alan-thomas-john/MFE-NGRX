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
    uniqueName: "employeeManagement",
    publicPath: "auto",
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
      // library: {
      //   type: "module"
      // },
         name: "employeeManagement",
        filename: "remoteEntry.js",
        exposes: {
            './EmployeeDashboardModule': './projects/employee-management/src/employee-dashboard/employee-dashboard.module.ts',
            //'./Component': './projects/employee-management/src/app/registration/registration.component.ts'
            // './routes':'./projects/employee-management/src/app/employee-dashboard/'
        },

        // For hosts (please adjust)
        // remotes: {
        //     "oneByte": "oneByte@http://localhost:4200/remoteEntry.js",
        //     "projectManagement": "projectManagement@http://localhost:4200/remoteEntry.js",

        // },

        shared: share({
          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@ngrx/store-devtools": { singleton: true, strictVersion: true, requiredVersion: '15.4.0' },


          ...sharedMappings.getDescriptors()
        })

    }),
    sharedMappings.getPlugin()
  ],
};
