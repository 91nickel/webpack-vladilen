const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const filename = ext => isProd ? `[name].[hash].${ext}` : `[name].${ext}`;
const cssLoaders = function (extra) {
    const loaders = [{
        loader: MiniCSSExtractPlugin.loader,
        options: {
            hmr: isDev,
            reloadAll: true,
        }
    }, 'css-loader'] // Webpack пойдет справа налево;
    if (extra) {
        loaders.push(extra);
    }
    return loaders;
};

const babelOptions = function (preset) {
    const options = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties',
        ],
    };
    if (preset) {
        options.presets.push(preset);
    }
    return options;
};

const optimization = function () {
    const config = { // чтобы не грузить по 10 раз одну и ту же библиотеку
        splitChunks: {
            chunks: "all"
        }
    };
    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin(),
        ];
    }
    return config;
};

console.log('IS DEV:', isDev);

module.exports = {
    context: path.resolve(__dirname, 'assets/src'),
    mode: "development",
    entry: {
        main: ['@babel/polyfill', './index.jsx'], // адрес указан от того, что прописано в поле context
        analytics_js: './analytics.js',
        analytics_ts: './analytics_ts.ts',
    },
    output: {
        filename: filename('js'), // шаблон имени рабочего файла на выходе
        path: path.resolve(__dirname, 'dist') // путь к папке, в которой рабочие файлы будут лежать
    },
    resolve: {
        extensions: ['.js', '.json'], // какие расширения нам нужно понимать по умолчанию
        alias: {
            '@models': path.resolve(__dirname, 'assets/src/models'), // шаблон для пути в адресе
            '@': path.resolve(__dirname, 'src'),
        },
    },
    optimization: optimization(),
    devServer:
        {
            port: '4200',
            hot:
            isDev,
        }
    ,
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: isProd,
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {from: path.resolve(__dirname, 'assets/src/images/favicon.ico'), to: './'},
            ],
        }),
        new MiniCSSExtractPlugin({
            filename: filename('css'),
        }),
    ],
    module:
        {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: {
                        loader: 'babel-loader',
                        options: babelOptions(),
                    },
                },
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    loader: {
                        loader: 'babel-loader',
                        options: babelOptions('@babel/preset-typescript'),
                    },
                },
                {
                    test: /\.jsx$/,
                    exclude: /node_modules/,
                    loader: {
                        loader: 'babel-loader',
                        options: babelOptions('@babel/preset-react'),
                    },
                },
                {
                    test: /\.css$/,
                    use: cssLoaders(),
                },
                {
                    test: /\.less$/,
                    use: cssLoaders('less-loader'),
                },
                {
                    test: /\.s[ac]ss$/,
                    use: cssLoaders('sass-loader'),
                },
                {
                    test: /\.(png|jpg|svg|gif|bmp)$/,
                    use: ['file-loader'],
                },
                {
                    test: /\.(ttf|otf)$/,
                    use: ['file-loader'],
                },
                {
                    test: /\.csv$/,
                    use: ['csv-loader'],
                },
                {
                    test: /\.xml$/,
                    use: ['xml-loader'],
                },
            ]
        }
    ,
}
;