const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: "./src/index.ts",

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'bundle.js',

        environment: {
            // 设置webpack打包不用箭头函数包裹
            arrowFunction: false,
            // 设置不生成const定义变量
            const: false
        }
    },

    mode: 'production',

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    // 配置babel
                    {
                        // 指定加载器，用 babel-loader 解析
                        loader: 'babel-loader',
                        // 设置babel
                        options: {
                            // 设置预定义环境
                            presets: [
                                [
                                    // 指定环境插件
                                    "@babel/preset-env",
                                    {
                                        // 兼容的目标浏览器
                                        targets: {
                                            "chrome": "18",
                                            "ie": "6"
                                        },
                                        // 指定core-js版本
                                        "corejs": "3",
                                        // 使用corejs的方式，usage表示按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    "ts-loader"
                ],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: "last 2 versions"
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],

    //用来设置引入模块
    resolve: {
        extensions: ['.js', '.ts']
    }

}
