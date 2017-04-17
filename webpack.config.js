module.exports = {
    entry: './src/main.js',
    output: {
        path: './lib',
        filename: 'bundle.js',
        library: 'jsml',
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