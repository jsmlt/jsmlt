module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /src/,
        loader: [
          'babel-loader',
          'eslint-loader',
        ],
      },
    ],
  },
}