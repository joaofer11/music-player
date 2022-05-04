const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, 'src/js', 'index.js'),
    output: {
        path: path.resolve(__dirname, './'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.(jpg|jpeg|png)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[name].[hash][ext][query]'
                }
            },
            {
                test: /\.mp3$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/sounds/[name].[hash][ext][query]'
                }
            }
        ]
    },
    resolve: {
        modules: ['node_modules', path.resolve(__dirname, 'src')],
        extensions: ['.js']
    }
}