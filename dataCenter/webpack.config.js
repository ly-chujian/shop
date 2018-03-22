const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const commonCss = new ExtractTextPlugin({
    filename: (getPath) => {
        return getPath('css/common.css').replace('css/js', 'css');
    },
    allChunks: true
});
const styleCss = new ExtractTextPlugin({
    filename: (getPath) => {
        return getPath('css/style.css').replace('css/js', 'css');
    },
    allChunks: true
});
module.exports = (evn = {}) => {
    evn.Generative = evn.Generative == "true"
    console.log(`------------------- ${evn.Generative?'生产':'开发'}环境 -------------------`);
    let plugins = [
        //全局变量
        // new webpack.ProvidePlugin({
        // }),
        // new CleanWebpackPlugin(['build']),
        commonCss,
        styleCss,
        //第三方依赖
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: function (module) {
                // This prevents stylesheet resources with the .css or .scss extension
                // from being moved from their original chunk to the vendor chunk
                if (module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
                    return false;
                }
                return module.context && module.context.includes("node_modules");
            }
        }),
        // 把生成的文件插入到 启动页中
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CopyWebpackPlugin([{
            from: './src/static',
            to: 'static'
        }]),
    ];
    // 生产环境添加压缩插件
    if (evn.Generative) {
        plugins = [
            // 清理目录
            new CleanWebpackPlugin(['dist']),
            // 压缩
            new UglifyJSPlugin({
                // warning: false,
                // mangle: true,
                // compress: {
                //     warnings: false,
                //     drop_debugger: true,
                //     drop_console: true
                // }
            }),
            ...plugins
        ]
    }
    return {
        entry: {
            'app': './src/app.jsx' //应用程序
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            publicPath: evn.Generative ? './' : '/',
            // publicPath: './',
            filename: 'js/[name].js',
            chunkFilename: 'js/[name].chunk.js'
        },
        // 启动 dev-server 的服务配置
        devServer: {
            inline: true, //检测文件变化，实时构建并刷新浏览器
            port: "8000",
            proxy: {
                '/api': {
                    target: 'http://127.0.0.1:3008/',
                    pathRewrite: {
                        "^/api": ""
                    },
                    secure: false
                },
            },
            //404 页面返回 index.html 
            historyApiFallback: true,
        },
        // 开发环境 生成 map 文件  
        devtool: evn.Generative ? 'nosources-source-map' : 'source-map',
        resolve: {
            extensions: [".jsx",".ts", ".js", ".json"]
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    include: path.resolve(__dirname, "src"),
                    loader: 'awesome-typescript-loader',
                },
                {
                    test: /\.css$/,
                    include: path.resolve(__dirname, "src"),
                    use: styleCss.extract({
                        fallback: "style-loader",
                        // 生产环境 不生成map 且压缩css
                        use: `css-loader?sourceMap=${!evn.Generative}&minimize=${evn.Generative}`
                    })
                }, {
                    test: /\.css$/,
                    exclude: path.resolve(__dirname, "src"),
                    use: commonCss.extract({
                        fallback: "style-loader",
                        // 生产环境 不生成map 且压缩css
                        use: `css-loader?sourceMap=${!evn.Generative}&minimize=${evn.Generative}`
                    })
                },
                // {
                //     test: /\.svg$/,
                //     loader: 'svg-sprite-loader',
                //     options: {}
                // },
                {
                    // test: /\.(gif|jpg|png|woff|eot|ttf)\??.*$/,
                    test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                    loader: 'url-loader?limit=50000&name=[path][name].[ext]'
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader',
                    options: {
                        minimize: false
                    }
                },
            ]
        },
        plugins: plugins,

    }
}