const path = require("path");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = (env) => ({
  mode: env.production ? "production" : "development",
  entry: "./index.ts",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {},
    plugins: [],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "umd",
    filename: "index.js",
  },
  externals: [],
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: env.production ? "disabled" : "static",
      openAnalyzer: false,
      reportFilename: "analyzer.html",
    }),
  ],
});
