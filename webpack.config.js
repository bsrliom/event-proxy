const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'event-proxy.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'eventProxy',
        libraryTarget: 'umd'
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: path.resolve(__dirname, "src"),
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/transform-runtime']
            }
        }]
    }
}