const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CachePlugin = require("webpack/lib/CachePlugin");
const JsonServer = require("./server/JsonServer");

const webPackConfig = require("./webpack.config.common.js")("/src", "/build", "__test__");

webPackConfig.cache = true;
webPackConfig.debug = true;
webPackConfig.devtool = "eval-source-map";
webPackConfig.entry = {
    app: [webPackConfig.paths.app]
};

webPackConfig.devServer = {
    historyApiFallback: true,
    hot: true,
    progress: true,
    inline: true,

    // display only errors to reduce the amount of output
    // stats: "errors-only",

    // parse host and port from env so this is easy
    // to customize
    // host: process.env.HOST,
    host: "0.0.0.0",
    port: process.env.PORT || 8181
};


webPackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

/* Use production parameter for hiding warnings which are coming from React library. */
/* webPackConfig.plugins.push(new webpack.DefinePlugin({
    "process.env": {
        NODE_ENV: JSON.stringify("production")
    }
}));
*/

webPackConfig.plugins.push(new CopyWebpackPlugin([{
    from: "../static"
}]));

webPackConfig.plugins.push(new CachePlugin({}));


const server = new JsonServer(3000, "/application");
server.route("config/data/db.json").upload("/files", "config/data/upload", "files").start();

module.exports = webPackConfig;