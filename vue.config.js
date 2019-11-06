const path = require('path');

const templatePath = 'public/index.html';

module.exports = {
    productionSourceMap: false,
    lintOnSave: false,
    pages: {
        'h5/index': {
            entry: 'src/h5/index/index/index.js',
            template: templatePath,
            title: '例子'
        }
    },
    chainWebpack: (config) => {
        const imagesRule = config.module.rule('images');
        imagesRule
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, { limit: 8192 }));
    },
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue'],
            alias: {
                '@': path.join(__dirname, 'src'),
                vue$: 'vue/dist/vue.esm.js'
            }
        },
        performance: {
            hints: 'warning', // enum
            maxAssetSize: 10048576, // int (in bytes),
            maxEntrypointSize: 10048576 // int (in bytes)
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://tapi.damoshopn.com',
                changeOrigin: true
            },
            '/user': {
                target: 'http://tapi.damoshopn.com',
                changeOrigin: true
            },
            '/auth': {
                target: 'http://tauth.damoshopn.com',
                changeOrigin: true
            }
        }
    }
};
