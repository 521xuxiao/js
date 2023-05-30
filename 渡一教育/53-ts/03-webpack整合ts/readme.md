1、 初始化一个项目，生成一个package.json文件 
     npm init -y
     
2、下载依赖  webpack   webpack-cli  typescript  ts-loader

3、创建tsconfig.json

4、创建webpack.config.js  在package.json中配置 "build": "webpack"


到此，基本的项目就实现了

5、安装 html-webpack-plugin，配置好

6、安装 webpack-dev-server, 在 package.json 中  配置  "start": "webpack serve --open"

7、安装 clean-webpack-plugin，清除打包之后的包里面的旧的内容

8、模块化引入配置
     在webpack.config.js中  加入
        resolve: {
            extensions: ['.js', '.ts']
        }

9、考虑到兼容性问题，需要使用babel  
    下载  @babel/core  @babel/preset-env   babel-loader  core-js  四个包
    配置webpack.config.js，详细见此文件
    
    
10、安装less
       下载 less  less-loader  css-loader  style-loader
       webpack.config.js配置文件中增加配置
       
11、css兼容性问题
       下载postcss   postcss-loader   postcss-preset-env
       然后配置在webpack.config.js文件中
