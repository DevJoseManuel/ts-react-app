// https://www.carlrippon.com/creating-react-and-typescript-apps-with-webpack/
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/27570
// https://www.carlrippon.com/using-css-react-typescript-with-webpack5/

import path from 'path'
import { Configuration as WebpackConfiguration } from 'webpack'
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration
}

const config: Configuration = {
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ]
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: 4000
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: './src/**/*'
      }
    })
  ]
}

export default config
