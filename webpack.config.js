var webpack = require("webpack");

module.exports = {
    entry: {
        'polyfills': './app/polyfills.ts',
        'vendor': './app/vendor.ts',
        'app': './app/boot.ts'
    },

    output: {
        path: __dirname,
        filename: "./prod/[name].js"
    },

    resolve: {
        extensions: ['', '.ts', '.js']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['ts-loader']
            }
        ]
    },
    /*
	devServer: {
		proxy: {
			"/api": {
				target: "http://deepblue.mpi-inf.mpg.de/",
				changeOrigin: true
            }
        }
    },
    */

	devServer: {
		port: 1234,
		proxy: {
			"/api": {
				target: "http://localhost:5000/",
				changeOrigin: true,
                pathRewrite: {
					"^/api": ""
				}
            }
        }
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        })/*,
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {screw_ie8: true, keep_fnames: true},
            compress: {screw_ie8: true},
            comments: false
        })*/
    ]
};
