const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");   //抽离css样式
const CopyWebpackPlugin = require('copy-webpack-plugin');       //复制模块
const HtmlWebpackPlugin = require('html-webpack-plugin');       //生成启动文件，并且引入响应的css js
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');      //压缩
const CleanWebpackPlugin = require('clean-webpack-plugin');     //clean
const path = require('path');
const commonCss = new ExtractTextPlugin({
    filename:'css/common.css',  //打包后的文件
    allChunks: true     //提取异步模块中的css
});
const styleCss = new ExtractTextPlugin({
    filename:'css/style.css',   //打包后的文件
    allChunks: true     //提取异步模块中的css
});
module.exports = (evn = {}) => {
    //package.json:
    // "scripts": {
    //     "dev": "webpack-dev-server --open",
    //     "build": "webpack --progress --env.Generative=true"
    //   },
    evn.Generative = evn.Generative == "true"   //判断是否是生产环境
    console.log(`------------------- ${evn.Generative?'生产':'开发'}环境 -------------------`);

     //生产，uat环境都需要的插件
    let plugins = [
        commonCss,
        styleCss,
        //提取node_modules里面的第三方依赖js，遇到css就跳过
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
        //复制一些资源文件，比如一些只需要全局实例化一次的Js类
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
            // 压缩js
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
            'app': './src/app.jsx' //应用程序入口
        },
        output: {
            path: path.resolve(__dirname, "dist"),      //打包后的文件，根目录以webpack.config.js为准-
            publicPath: evn.Generative ? './' : '/',    //入口index文件里面的路径，可能和dev的路径不一致
            filename: 'js/[name].js',                   //主文件
            chunkFilename: 'js/[name].chunk.js'         //分包后的文件,分包必须配置这个属性
        },
        // 启动 dev-server 的服务配置, 并且通过nodejs设置简单代理
        devServer: {
            inline: true, //检测文件变化，实时构建并刷新浏览器
            port: "8000",
            //反向代理
            proxy: {
                '/api': {
                    target: 'http://127.0.0.1:3008/',
                    pathRewrite: {
                        "^/api": ""         //是否重写api地址
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
                        use: `css-loader?sourceMap=${!evn.Generative}&minimize=${evn.Generative}`
                    })
                }, {
                    test: /\.css$/,
                    exclude: path.resolve(__dirname, "src"),
                    use: commonCss.extract({
                        fallback: "style-loader",
                        use: `css-loader?sourceMap=${!evn.Generative}&minimize=${evn.Generative}`
                    })
                },
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