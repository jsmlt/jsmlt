module.exports = {
  entry: './distribution/index.js',
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
  node: {
    console: false,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}