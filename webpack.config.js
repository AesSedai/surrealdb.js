import webpack from 'webpack';

export default [
	{
		target: 'web',
		entry: './index.js',
		output: {
			clean: true,
			filename: 'index.js',
			path: new URL('./dist/web', import.meta.url).pathname,
			library: {
				name: 'Surreal',
				type: 'umd',
				export: 'default',
				umdNamedDefine: true,
			},
		},
		devtool: false,
		plugins: [
			new webpack.NormalModuleReplacementPlugin(
				/..\/websocket\/index.js$/,
				'/src/websocket/index.web.js',
			)
		],
		module: {
			rules: [{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: [
							'@babel/plugin-proposal-class-properties',
							'@babel/plugin-proposal-private-methods',
						],
					}
				}
			}]
		},
        resolve: {
            fallback: {
              "crypto": false,
              "crypto-browserify": false,
              "fs": false,
              "http": false,
              "https": false,
              "net": false,
              "path": false,
              "stream": false,
              "tls": false,
              "url": false,
              "zlib": false
            }
          }
	},
	{
		target: 'node',
		entry: './index.js',
		output: {
			clean: true,
			filename: 'index.cjs',
			path: new URL('./dist/lib', import.meta.url).pathname,
			library: {
				name: 'Surreal',
				type: 'umd',
				export: 'default',
				umdNamedDefine: true,
			},
		},
		devtool: false,
		plugins: [
			new webpack.NormalModuleReplacementPlugin(
				/..\/websocket\/index.js$/,
				'/src/websocket/index.node.js',
			)
		],
		module: {
			rules: [{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: [
							'@babel/plugin-proposal-class-properties',
							'@babel/plugin-proposal-private-methods',
						],
					}
				}
			}]
		}
	},
];
