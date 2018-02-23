var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
    devServer: {
      historyApiFallback:true
    },
    context: path.join(__dirname),
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./src/js/root.js",
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015'],
                    plugins: ['react-html-attrs',
                        ['import', {
                        libraryName: 'antd',
                        style: 'css' // or true or css 这里必须是 css，否则样式不能加载
                    }]
                    ], //添加组件的插件配置
                }
            },
            //下面是使用 ant-design 的配置文件
            // { test: /\.css$/, loader: 'style-loader!css-loader' }
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            // {
            //     test: /\.less$/,
            //     loader: 'style!css!less'
            // }
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            // loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5  ]'
        ]
    },
    output: {
        path: __dirname,
        filename: "./src/bundle.js"
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
};
