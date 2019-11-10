const path = require("path")
module.exports = {
    configureWebpack: {
        devtool: "source-map",
    },
    chainWebpack: config => {
        config
            .entry("app")
            .clear()
            .add("./src/App.vue")
            .end()
        config.resolve.alias.set("@", path.join(__dirname, "./client"))
    },
}
