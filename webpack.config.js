module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname + '/lib',
        filename: 'bundle.js',
        library: 'jsmlt',
        libraryTarget: 'var'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
            },
        ],
    },
}