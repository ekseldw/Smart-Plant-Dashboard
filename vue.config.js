var webpack = require("webpack");
module.exports = {
  publicPath: "",
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        zrender: "zrender",
        "windows.zrender": "zrender",
      }),
    ],
  },
  devServer: {
    proxy: {
      '/api' : {
        target: 'http://115.90.76.67:8281/',
        changeOrigin: true,
      },
      '/ws' : {
        target: 'http://115.90.76.67:8281/',
	      changeOrigin: true,
        ws: true,
      }
    },
    disableHostCheck: true,
    overlay: true,
  },

  lintOnSave: undefined,
};
