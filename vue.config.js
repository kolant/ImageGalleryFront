/* Insure you have .env.development.local file with DEVSERVER_PORT variable */
module.exports = {
    lintOnSave: false,
    productionSourceMap: true,
    parallel: true,
    // devServer: {
    //     proxy: {
    //         '/api': {
    //             target: "http://localhost:" + process.env.DEVSERVER_PORT
    //         }
    //     }
    // },
    pluginOptions: {
        webpackBundleAnalyzer: {
            openAnalyzer: false
        }
    }
};
