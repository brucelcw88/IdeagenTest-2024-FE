const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0',    // Allows access from any network
    port: 8080,         // Ensure this matches the desired port
    allowedHosts: 'all', // Allow connections from any host
    hot: false,         // Disable Hot Module Replacement if not essential
  }
})
