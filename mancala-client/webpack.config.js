const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {

    entry: {
      public: './src/client/public/index'
  },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    
    module: {
        rules: [

            // we use babel-loader to load our jsx and tsx files
          {
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            },
          },
    
          // css-loader to bundle all the css files into one file and style-loader to add all the styles  inside the style tag of the document
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
              {
                loader: 'file-loader?name=./images/[name].[ext]',
                options: {esModule: false}
              },
            ],
          },
        ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'public.html',
        template: './src/client/public/public.html',
        chunks: ['public']
      })
    ],

    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 8080,
      historyApiFallback: true,
      index: '/public.html'

    }
}