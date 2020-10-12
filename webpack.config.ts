import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from 'copy-webpack-plugin'
import path from "path";
import webpack from "webpack";

export const assets = path.resolve(__dirname, 'public')
export const docs = path.resolve(__dirname, "docs")

const config: webpack.Configuration = {
  entry: "./src/index.ts",
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
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.join(assets, 'index.html') }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.join(assets, 'images'), to: path.join(docs, 'images') },
      ]
    }),
  ],
  devtool: 'source-map',
  output: {
    path: docs,
    filename: "fixed-map-geolonia-plugin.min.js",
  },
  devServer: {
    contentBase: docs,
    compress: true,
    port: 3000,
    open: true
  }
};

export default config
